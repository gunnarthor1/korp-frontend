/** @format */
const korpApp = angular.module("korpApp")
korpApp.factory("utils", $location => ({
    valfilter(attrobj) {
        if (attrobj.isStructAttr) {
            return `_.${attrobj.value}`
        } else {
            return attrobj.value
        }
    },

    setupHash(scope, config) {
        const onWatch = () => {
            for (let obj of config) {
                let val = $location.search()[obj.key]
                if (!val) {
                    if (obj.default != null) {
                        val = obj.default
                    } else {
                        continue
                    }
                }

                val = (obj.val_in || _.identity)(val)

                if ("scope_name" in obj) {
                    scope[obj.scope_name] = val
                } else if ("scope_func" in obj) {
                    scope[obj.scope_func](val)
                } else {
                    scope[obj.key] = val
                }
            }
        }
        onWatch()
        scope.$watch(() => $location.search(), () => onWatch())

        for (let obj of config) {
            const watch = obj.expr || obj.scope_name || obj.key
            scope.$watch(
                watch,
                ((obj, watch) =>
                    function(val) {
                        val = (obj.val_out || _.identity)(val)
                        if (val === obj.default) {
                            val = null
                        }
                        $location.search(obj.key, val || null)
                        if (obj.key === "page") {
                            c.log("post change", watch, val)
                        }
                        if (typeof obj.post_change === "function") {
                            obj.post_change(val)
                        }
                    })(obj, watch)
            )
        }
    }
}))

korpApp.factory("backend", ($http, $q, utils, lexicons) => ({
    requestCompare(cmpObj1, cmpObj2, reduce) {
        reduce = _.map(reduce, item => item.replace(/^_\./, ""))
        let cl = settings.corpusListing
        // remove all corpora which do not include all the "reduce"-attributes
        const filterFun = item => cl.corpusHasAttrs(item, reduce)
        const corpora1 = _.filter(cmpObj1.corpora, filterFun)
        const corpora2 = _.filter(cmpObj2.corpora, filterFun)

        const corpusListing = cl.subsetFactory(cmpObj1.corpora)

        let attrs = cl.getCurrentAttributes()
        const split = _.filter(reduce, r => (attrs[r] && attrs[r].type) === "set").join(",")

        const rankedReduce = _.filter(reduce, item => {
            let attr = cl.getCurrentAttributes(cl.getReduceLang())[item]
            return attr && attr.ranked
        })
        const top = _.map(rankedReduce, item => item + ":1").join(",")

        const def = $q.defer()
        const params = {
            group_by: reduce.join(","),
            set1_corpus: corpora1.join(",").toUpperCase(),
            set1_cqp: cmpObj1.cqp,
            set2_corpus: corpora2.join(",").toUpperCase(),
            set2_cqp: cmpObj2.cqp,
            max: 50,
            split,
            top
        }

        const conf = {
            url: settings.korpBackendURL + "/loglike",
            params,
            method: "GET",
            headers: {}
        }

        _.extend(conf.headers, model.getAuthorizationHeader())

        const xhr = $http(conf)

        xhr.then(function(response) {
            let max
            const { data } = response

            if (data.ERROR) {
                def.reject()
                return
            }

            const loglikeValues = data.loglike

            const objs = _.map(loglikeValues, (value, key) => ({
                value: key,
                loglike: value
            }))

            const tables = _.groupBy(objs, function(obj) {
                if (obj.loglike > 0) {
                    obj.abs = data.set2[obj.value]
                    return "positive"
                } else {
                    obj.abs = data.set1[obj.value]
                    return "negative"
                }
            })

            const groupAndSum = function(table, currentMax) {
                const groups = _.groupBy(table, obj => obj.value.replace(/(:.+?)(\/|$| )/g, "$2"))

                const res = _.map(_.toPairs(groups), function([key, value]) {
                    const tokenLists = _.map(key.split("/"), tokens => tokens.split(" "))

                    let loglike = 0
                    let abs = 0
                    const cqp = []
                    const elems = []

                    for (let val of value) {
                        abs += val.abs
                        loglike += val.loglike
                        elems.push(val.value)
                    }
                    if (Math.abs(loglike) > currentMax) {
                        currentMax = Math.abs(loglike)
                    }
                    return { key, loglike, abs, elems, tokenLists }
                })

                return [res, currentMax]
            }
            ;[tables.positive, max] = groupAndSum(tables.positive, 0)
            ;[tables.negative, max] = groupAndSum(tables.negative, max)

            return def.resolve([tables, max, cmpObj1, cmpObj2, reduce], xhr)
        })

        return def.promise
    },

    relatedWordSearch(lemgram) {
        return lexicons.relatedWordSearch(lemgram)
    },

    requestMapData(cqp, cqpExprs, within, attribute) {
        const cqpSubExprs = {}
        _.map(_.keys(cqpExprs), (subCqp, idx) => (cqpSubExprs[`subcqp${idx}`] = subCqp))

        const def = $q.defer()
        const params = {
            group_by_struct: attribute.label,
            cqp,
            corpus: attribute.corpora.join(","),
            incremental: true,
            split: attribute.label
        }
        _.extend(params, settings.corpusListing.getWithinParameters())

        _.extend(params, cqpSubExprs)

        const conf = {
            url: settings.korpBackendURL + "/count",
            params,
            method: "GET",
            headers: {}
        }

        _.extend(conf.headers, model.getAuthorizationHeader())

        const xhr = $http(conf)

        xhr.then(function(response) {
            let result
            const { data } = response
            const createResult = function(subResult, cqp, label) {
                const mergeSubResults = function(absolute, relative) {
                    const res_list = []
                    for (let { value: value1, freq: abs_freq } of absolute) {
                        const remove_idxs = []
                        for (let idx = 0; idx < relative.length; idx++) {
                            const { value: value2, freq: rel_freq } = relative[idx]
                            const val1 = _.values(value1)[0][0]
                            const val2 = _.values(value2)[0][0]
                            if (val1 === val2) {
                                res_list.push({ value: val1, abs_freq, rel_freq })
                                remove_idxs.push(idx)
                            }
                        }
                        const removed_elems = _.pullAt(relative, remove_idxs)
                    }
                    return res_list
                }

                const points = []
                _.map(mergeSubResults(subResult.absolute, subResult.relative), function(
                    actual_hit
                ) {
                    const hit = actual_hit.value
                    if (hit === "" || hit.startsWith(" ")) {
                        return
                    }
                    const [name, countryCode, lat, lng] = hit.split(";")

                    return points.push({
                        abs: actual_hit.abs_freq,
                        rel: actual_hit.rel_freq,
                        name,
                        countryCode,
                        lat: parseFloat(lat),
                        lng: parseFloat(lng)
                    })
                })

                return {
                    label,
                    cqp,
                    points
                }
            }

            if (_.isEmpty(cqpExprs)) {
                result = [createResult(data.total, cqp, "Σ")]
            } else {
                result = []
                for (let subResult of data.total.slice(1, data.total.length)) {
                    result.push(createResult(subResult, subResult.cqp, cqpExprs[subResult.cqp]))
                }
            }

            if (data.ERROR) {
                def.reject()
                return
            }

            return def.resolve(
                [{ corpora: attribute.corpora, cqp, within, data: result, attribute }],
                xhr
            )
        })

        return def.promise
    }
}))

korpApp.factory("nameEntitySearch", function($rootScope, $q) {
    class NameEntities {
        request(cqp) {
            this.def = $q.defer()
            this.promise = this.def.promise
            this.proxy = new model.NameProxy()
            $rootScope.$broadcast(
                "map_data_available",
                cqp,
                settings.corpusListing.stringifySelected(true)
            )
            return this.proxy.makeRequest(cqp, this.progressCallback).then(data => {
                return this.def.resolve(data)
            })
        }

        progressCallback(progress) {
            return $rootScope.$broadcast("map_progress", progress)
        }
    }

    return new NameEntities()
})

korpApp.factory("searches", [
    "utils",
    "$location",
    "$rootScope",
    "$http",
    "$q",
    "nameEntitySearch",
    function(utils, $location, $rootScope, $http, $q, nameEntitySearch) {
        class Searches {
            constructor() {
                this.activeSearch = null
                const def = $q.defer()
                const timedef = $q.defer()
                this.infoDef = def.promise
                this.timeDef = timedef.promise

                // is resolved when parallel search controller is loaded
                this.langDef = $q.defer()
                this.getInfoData().then(function() {
                    def.resolve()
                    return initTimeGraph(timedef)
                })
            }

            kwicSearch(cqp, isPaging) {
                kwicResults.makeRequest(cqp, isPaging)
                if (!isPaging) {
                    statsResults.makeRequest(cqp)
                    return this.nameEntitySearch(cqp)
                }
            }

            lemgramSearch(word, type) {
                if (settings.wordpicture === false) {
                    return
                }
                return lemgramResults.makeRequest(word, type)
            }

            nameEntitySearch(cqp) {
                if ($location.search().show_map != null) {
                    return nameEntitySearch.request(cqp)
                }
            }

            getInfoData() {
                const def = $q.defer()
                $http({
                    method: "GET",
                    url: settings.korpBackendURL + "/corpus_info",
                    params: {
                        corpus: _.map(settings.corpusListing.corpora, "id")
                            .map(a => a.toUpperCase())
                            .join(",")
                    }
                }).then(function(response) {
                    const { data } = response
                    for (let corpus of settings.corpusListing.corpora) {
                        corpus["info"] = data["corpora"][corpus.id.toUpperCase()]["info"]
                        const privateStructAttrs = []
                        for (let attr of data["corpora"][corpus.id.toUpperCase()].attrs.s) {
                            if (attr.indexOf("__") !== -1) {
                                privateStructAttrs.push(attr)
                            }
                        }
                        corpus["private_struct_attributes"] = privateStructAttrs
                    }
                    util.loadCorpora()
                    return def.resolve()
                })

                return def.promise
            }
        }

        const searches = new Searches()

        searches.getCqpExpr = function() {
            const search = searches.activeSearch
            let cqpExpr = null
            if (search) {
                if (search.type === "word" || search.type === "lemgram") {
                    cqpExpr = $rootScope.simpleCQP
                } else {
                    cqpExpr = search.val
                }
            }
            return cqpExpr
        }

        let oldValues = []
        $rootScope.$watchGroup(
            [() => $location.search().search, "_loc.search().page"],
            newValues => {
                let pageChanged, searchChanged
                c.log("searches service watch", $location.search().search)

                const searchExpr = $location.search().search
                if (!searchExpr) {
                    return
                }
                let [type, ...value] = (searchExpr && searchExpr.split("|")) || []
                value = value.join("|")

                newValues[1] = Number(newValues[1]) || 0
                oldValues[1] = Number(oldValues[1]) || 0

                if (_.isEqual(newValues, oldValues)) {
                    pageChanged = false
                    searchChanged = true
                } else {
                    pageChanged = newValues[1] !== oldValues[1]
                    searchChanged = newValues[0] !== oldValues[0]
                }

                const pageOnly = pageChanged && !searchChanged

                if (value) {
                    let historyValue
                    if (type === "lemgram") {
                        historyValue = unregescape(value)
                    } else {
                        historyValue = value
                    }
                    view.updateSearchHistory(historyValue, $location.absUrl())
                }
                $q.all([
                    searches.infoDef,
                    searches.langDef.promise,
                    $rootScope.globalFilterDef.promise
                ]).then(function() {
                    let extendedSearch = false
                    if (type === "cqp") {
                        extendedSearch = true
                        if (!value) {
                            value = $location.search().cqp
                        }
                    }
                    if (["cqp", "word", "lemgram"].includes(type)) {
                        searches.activeSearch = {
                            type,
                            val: value,
                            page: newValues[1],
                            pageOnly
                        }
                    } else if (type === "saldo") {
                        extendedSearch.setOneToken("saldo", value)
                    }

                    if (type === "cqp") {
                        if (extendedSearch && $rootScope.globalFilter) {
                            value = CQP.stringify(
                                CQP.mergeCqpExprs(CQP.parse(value || "[]"), $rootScope.globalFilter)
                            )
                        }
                        searches.kwicSearch(value, pageOnly)
                    }

                    oldValues = [].concat(newValues)
                })
            }
        )

        return searches
    }
])

korpApp.service(
    "compareSearches",
    class CompareSearches {
        constructor() {
            if (currentMode !== "default") {
                this.key = `saved_searches_${currentMode}`
            } else {
                this.key = "saved_searches"
            }
            c.log("key", this.key)
            this.savedSearches = $.jStorage.get(this.key) || []
        }

        saveSearch(name, cqp) {
            const searchObj = {
                label: name || cqp,
                cqp,
                corpora: settings.corpusListing.getSelectedCorpora()
            }
            this.savedSearches.push(searchObj)
            return $.jStorage.set(this.key, this.savedSearches)
        }

        flush() {
            this.savedSearches.splice(0, 9e9, ...[].concat([]))
            return $.jStorage.set(this.key, this.savedSearches)
        }
    }
)

korpApp.factory("lexicons", function($q, $http) {
    const karpURL = "https://ws.spraakbanken.gu.se/ws/karp/v4"
    let canceller = null
    let cancelNext = false
    return {
        lemgramCancel() {
            cancelNext = true
        },
        getLemgrams(wf, resources, corporaIDs) {
            const deferred = $q.defer()
            canceller = $q.defer()
            if (cancelNext) {
                canceller.resolve()
                cancelNext = false
            }

            const args = {
                q: wf,
                resource: $.isArray(resources) ? resources.join(",") : resources,
                mode: "external"
            }

            $http({
                method: "GET",
                url: `${karpURL}/autocomplete`,
                params: args,
                timeout: canceller.promise
            })
                .then(function(response) {
                    let { data } = response
                    if (data === null) {
                        return deferred.resolve([])
                    } else {
                        // Pick the lemgrams. Would be nice if this was done by the backend instead.
                        const karpLemgrams = _.map(
                            data.hits.hits,
                            entry => entry._source.FormRepresentations[0].lemgram
                        )

                        if (karpLemgrams.length === 0) {
                            deferred.resolve([])
                            return
                        }

                        let lemgram = karpLemgrams.join(",")
                        const corpora = corporaIDs.join(",")
                        const headers = model.getAuthorizationHeader()
                        headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"
                        return $http({
                            method: "POST",
                            url: settings.korpBackendURL + "/lemgram_count",
                            data: `lemgram=${lemgram}&count=lemgram&corpus=${corpora}`,
                            headers,
                            timeout: canceller.promise
                        }).then(({ data }) => {
                            delete data.time
                            const allLemgrams = []
                            for (lemgram in data) {
                                const count = data[lemgram]
                                allLemgrams.push({ lemgram: lemgram, count: count })
                            }
                            for (let klemgram of karpLemgrams) {
                                if (!data[klemgram]) {
                                    allLemgrams.push({ lemgram: klemgram, count: 0 })
                                }
                            }
                            return deferred.resolve(allLemgrams)
                        })
                    }
                })
                .catch(response => deferred.resolve([]))
            return deferred.promise
        },

        getSenses(wf) {
            const deferred = $q.defer()

            const args = {
                q: wf,
                resource: "saldom",
                mode: "external"
            }

            $http({
                method: "GET",
                url: `${karpURL}/autocomplete`,
                params: args
            })
                .then(response => {
                    let { data } = response
                    if (data === null) {
                        return deferred.resolve([])
                    } else {
                        let karpLemgrams = _.map(
                            data.hits.hits,
                            entry => entry._source.FormRepresentations[0].lemgram
                        )
                        if (karpLemgrams.length === 0) {
                            deferred.resolve([])
                            return
                        }

                        karpLemgrams = karpLemgrams.slice(0, 100)

                        const senseargs = {
                            q: `extended||and|lemgram|equals|${karpLemgrams.join("|")}`,
                            resource: "saldo",
                            show: "sense,primary",
                            size: 500
                        }

                        return $http({
                            method: "GET",
                            url: `${karpURL}/minientry`,
                            params: senseargs
                        })
                            .then(function({ data }) {
                                if (data.hits.total === 0) {
                                    deferred.resolve([])
                                    return
                                }
                                const senses = _.map(data.hits.hits, entry => ({
                                    sense: entry._source.Sense[0].senseid,
                                    desc:
                                        entry._source.Sense[0].SenseRelations &&
                                        entry._source.Sense[0].SenseRelations.primary
                                }))
                                deferred.resolve(senses)
                            })
                            .catch(response => deferred.resolve([]))
                    }
                })
                .catch(response => deferred.resolve([]))
            return deferred.promise
        },

        relatedWordSearch(lemgram) {
            const def = $q.defer()
            $http({
                url: `${karpURL}/minientry`,
                method: "GET",
                params: {
                    q: `extended||and|lemgram|equals|${lemgram}`,
                    show: "sense",
                    resource: "saldo"
                }
            }).then(function({ data }) {
                if (data.hits.total === 0) {
                    def.resolve([])
                } else {
                    const senses = _.map(data.hits.hits, entry => entry._source.Sense[0].senseid)

                    $http({
                        url: `${karpURL}/minientry`,
                        method: "GET",
                        params: {
                            q: `extended||and|LU|equals|${senses.join("|")}`,
                            show: "LU,sense",
                            resource: "swefn"
                        }
                    }).then(function({ data }) {
                        if (data.hits.total === 0) {
                            def.resolve([])
                        } else {
                            const eNodes = _.map(data.hits.hits, entry => ({
                                label: entry._source.Sense[0].senseid.replace("swefn--", ""),
                                words: entry._source.Sense[0].LU
                            }))

                            return def.resolve(eNodes)
                        }
                    })
                }
            })

            return def.promise
        }
    }
})
