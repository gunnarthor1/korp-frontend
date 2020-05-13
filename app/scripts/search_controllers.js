/** @format */
const korpApp = angular.module("korpApp")

window.SearchCtrl = [
    "$scope",
    "$location",
    "$filter",
    "utils",
    "searches",
    function($scope, $location, $filter, utils, searches) {
        $scope.visibleTabs = [true, true, true, true]
        $scope.extendedTmpl = require("../views/extended_tmpl.pug")
        // for parallel mode
        searches.langDef.resolve()
        $scope.isCompareSelected = false

        $scope.$watch(
            () => $location.search().search_tab,
            val => ($scope.isCompareSelected = val === 3)
        )

        const setupWatchWordPic = function() {
            $scope.$watch(
                () => $location.search().word_pic,
                val => ($scope.word_pic = Boolean(val))
            )

            $scope.$watch("word_pic", val => $location.search("word_pic", Boolean(val) || null))
        }

        const setupWatchMap = function() {
            $scope.$watch(
                () => $location.search().show_map,
                val => ($scope.show_map = Boolean(val))
            )

            $scope.$watch("show_map", val => $location.search("show_map", Boolean(val) || null))
        }

        const setupWatchStats = function() {
            $scope.showStatistics = true

            $scope.$watch(
                () => $location.search().hide_stats,
                val => ($scope.showStatistics = val == null)
            )

            $scope.$watch("showStatistics", function(val) {
                if ($scope.showStatistics) {
                    $location.search("hide_stats", null)
                } else {
                    $location.search("hide_stats", true)
                }
            })
        }

        setupWatchWordPic()
        setupWatchMap()
        setupWatchStats()

        $scope.settings = settings
        $scope.showStats = () => settings.statistics !== false

        if (!$location.search().stats_reduce) {
            $location.search("stats_reduce", "word")
        }

        if (settings.statisticsCaseInsensitiveDefault) {
            $location.search("stats_reduce_insensitive", "word")
        }

        $scope.corpusChangeListener = $scope.$on("corpuschooserchange", function(event, selected) {
            c.log("SearchCtrl corpuschooserchange")
            $scope.noCorporaSelected = !selected.length
            const allAttrs = settings.corpusListing.getStatsAttributeGroups()
            $scope.statCurrentAttrs = _.filter(allAttrs, item => !item.hideStatistics)
            $scope.statSelectedAttrs = $location.search().stats_reduce.split(",")
            const insensitiveAttrs = $location.search().stats_reduce_insensitive
            if (insensitiveAttrs) {
                $scope.statInsensitiveAttrs = insensitiveAttrs.split(",")
            }
        })

        $scope.$watch(
            "statSelectedAttrs",
            function(selected) {
                if (selected && selected.length > 0) {
                    return $location.search("stats_reduce", $scope.statSelectedAttrs.join(","))
                }
            },
            true
        )

        $scope.$watch(
            "statInsensitiveAttrs",
            function(insensitive) {
                if (insensitive && insensitive.length > 0) {
                    return $location.search(
                        "stats_reduce_insensitive",
                        $scope.statInsensitiveAttrs.join(",")
                    )
                } else if (insensitive) {
                    return $location.search("stats_reduce_insensitive", null)
                }
            },
            true
        )

        const setupHitsPerPage = function() {
            $scope.getHppFormat = function(val) {
                if (val === $scope.hitsPerPage) {
                    return $filter("loc")("hits_per_page", $scope.lang) + ": " + val
                } else {
                    return val
                }
            }

            $scope.hitsPerPageValues = settings.hitsPerPageValues
            $scope.hitsPerPage = $location.search().hpp || settings.hitsPerPageDefault

            $scope.$watch(
                () => $location.search().hpp,
                val => ($scope.hitsPerPage = val || settings.hitsPerPageDefault)
            )

            return $scope.$watch("hitsPerPage", function(val) {
                if (val === settings.hitsPerPageDefault) {
                    return $location.search("hpp", null)
                } else {
                    return $location.search("hpp", val)
                }
            })
        }

        const setupKwicSort = function() {
            const kwicSortValueMap = {
                "": "appearance_context",
                keyword: "word_context",
                left: "left_context",
                right: "right_context",
                random: "random_context"
            }
            $scope.kwicSortValues = _.keys(kwicSortValueMap)

            $scope.getSortFormat = function(val) {
                const mappedVal = kwicSortValueMap[val]
                if (val === $scope.kwicSort) {
                    return (
                        $filter("loc")("sort_default", $scope.lang) +
                        ": " +
                        $filter("loc")(mappedVal, $scope.lang)
                    )
                } else {
                    return $filter("loc")(mappedVal, $scope.lang)
                }
            }

            $scope.kwicSort = $location.search().sort || ""

            $scope.$watch(() => $location.search().sort, val => ($scope.kwicSort = val || ""))

            return $scope.$watch("kwicSort", function(val) {
                if (val === "") {
                    return $location.search("sort", null)
                } else {
                    return $location.search("sort", val)
                }
            })
        }

        setupHitsPerPage()
        setupKwicSort()
    }
]

korpApp.controller("SearchCtrl", window.SearchCtrl)

korpApp.controller("SimpleCtrl", function(
    $scope,
    utils,
    $location,
    backend,
    $rootScope,
    searches,
    compareSearches,
    $uibModal,
    $timeout,
    lexicons
) {
    const s = $scope

    $scope.inOrder = $location.search().in_order == null
    $scope.$watch(() => $location.search().in_order, val => ($scope.inOrder = val == null))
    $scope.$watch("inOrder", val => $location.search("in_order", !s.inOrder ? false : null))

    s.prefix = false
    s.suffix = false
    s.isCaseInsensitive = false
    if (settings.inputCaseInsensitiveDefault) {
        s.isCaseInsensitive = true
    }

    s.$on("btn_submit", function() {
        c.log("simple search submit")
        lexicons.lemgramCancel()
        s.updateSearch()
        $location.search("within", null)
    })

    // triggers watch on searches.activeSearch
    s.updateSearch = function() {
        locationSearch("search", null)
        $timeout(function() {
            if (s.textInField) {
                util.searchHash("word", s.textInField)
                s.model = null
                s.placeholder = null
            } else if (s.model) {
                util.searchHash("lemgram", s.model)
            }
        }, 0)
    }

    s.$watch("getCQP()", function(val) {
        if (!val) {
            return
        }
        $rootScope.simpleCQP = CQP.expandOperators(val)
    })

    s.getCQP = function() {
        let suffix, val
        const currentText = (s.textInField || "").trim()

        if (currentText) {
            suffix = s.isCaseInsensitive ? " %c" : ""
            const wordArray = currentText.split(" ")
            const tokenArray = _.map(wordArray, token => {
                const orParts = []
                if (s.prefix) {
                    orParts.push(token + ".*")
                }
                if (s.suffix) {
                    orParts.push(`.*${token}`)
                }
                if (!(s.prefix || s.suffix)) {
                    orParts.push(regescape(token))
                }
                const res = _.map(orParts, orPart => `word = "${orPart}"${suffix}`)
                return `[${res.join(" | ")}]`
            })
            val = tokenArray.join(" ")
        } else if (s.placeholder || util.isLemgramId(currentText)) {
            const lemgram = s.model ? s.model : currentText
            val = `[lex contains \"${lemgram}\"`
            if (s.prefix) {
                val += ` | prefix contains \"${lemgram}\"`
            }
            if (s.suffix) {
                val += ` | suffix contains \"${lemgram}\"`
            }
            val += "]"
        }

        if ($rootScope.globalFilter) {
            val = CQP.stringify(CQP.mergeCqpExprs(CQP.parse(val || "[]"), $rootScope.globalFilter))
        }

        return val
    }

    s.$on("popover_submit", (event, name) => compareSearches.saveSearch(name, s.getCQP()))

    s.stringifyRelatedHeader = wd => wd.replace(/_/g, " ")

    s.stringifyRelated = wd => util.saldoToString(wd)

    let modalInstance = null
    s.clickRelated = function(wd, attribute) {
        let cqp
        if (modalInstance != null) {
            modalInstance.close()
        }
        c.log("modalInstance", modalInstance)
        $scope.$root.searchtabs()[1].tab.select()
        if (attribute === "saldo") {
            cqp = `[saldo contains \"${regescape(wd)}\"]`
        } else {
            cqp = `[sense rank_contains \"${regescape(wd)}\"]`
        }
        s.$root.$broadcast("extended_set", cqp)
        $location.search("search", "cqp")
        return $location.search("cqp", cqp)
    }

    s.relatedDefault = 3
    s.clickX = () => modalInstance.dismiss()

    s.showAllRelated = () =>
        (modalInstance = $uibModal.open({
            template: `\
                <div class="modal-header">
                    <h3 class="modal-title">{{'similar_header' | loc:lang}} (SWE-FN)</h3>
                    <span ng-click="clickX()" class="close-x">×</span>
                </div>
                <div class="modal-body">
                    <div ng-repeat="obj in relatedObj" class="col"><a target="_blank" ng-href="https://spraakbanken.gu.se/karp/#?mode=swefn&lexicon=swefn&amp;search=extended||and|sense|equals|swefn--{{obj.label}}" class="header">{{stringifyRelatedHeader(obj.label)}}</a>
                      <div class="list_wrapper">
                          <ul>
                            <li ng-repeat="wd in obj.words"> <a ng-click="clickRelated(wd, relatedObj.attribute)" class="link">{{stringifyRelated(wd) + " "}}</a></li>
                          </ul>
                      </div>
                    </div>
                </div>\
                `,
            scope: s,
            size: "lg",
            windowClass: "related"
        }))

    s.searches = searches
    s.$watch("searches.activeSearch", function(search) {
        if (!search) {
            return
        }
        if (search.type === "word" || search.type === "lemgram") {
            if (search.type === "word") {
                s.textInField = search.val
            } else {
                s.placeholder = unregescape(search.val)
                s.model = search.val
            }
            s.doSearch()
        } else {
            s.placeholder = null
            if (lemgramResults) {
                lemgramResults.resetView()
            }
        }
    })

    s.doSearch = function() {
        const search = searches.activeSearch
        s.relatedObj = null
        const cqp = s.getCQP()
        searches.kwicSearch(cqp, search && search.pageOnly)

        if (!(search && search.pageOnly)) {
            if (search.type === "lemgram") {
                let sense = true
                let saldo = true
                for (let corpus of settings.corpusListing.selected) {
                    if ("sense" in corpus.attributes) {
                        saldo = false
                    }
                    if ("saldo" in corpus.attributes) {
                        sense = false
                    }
                }

                if (sense || saldo) {
                    backend.relatedWordSearch(unregescape(search.val)).then(function(data) {
                        s.relatedObj = data
                        s.relatedObj.attribute = sense ? "sense" : "saldo"
                    })
                }
            }

            if (s.word_pic && (search.type === "lemgram" || !search.val.includes(" "))) {
                const value = search.type === "lemgram" ? unregescape(search.val) : search.val
                return searches.lemgramSearch(value, search.type)
            } else {
                if (lemgramResults) {
                    lemgramResults.resetView()
                }
            }
        }
    }

    utils.setupHash(s, [{ key: "prefix" }, { key: "suffix" }, { key: "isCaseInsensitive" }])
})

korpApp.controller("ExtendedSearch", function(
    $scope,
    utils,
    $location,
    backend,
    $rootScope,
    searches,
    compareSearches,
    $timeout
) {
    const s = $scope
    s.$on("popover_submit", (event, name) =>
        compareSearches.saveSearch(name, $rootScope.extendedCQP)
    )

    s.searches = searches
    s.$on("btn_submit", function() {
        c.log("extended submit")
        $location.search("search", null)
        $location.search("page", null)
        $location.search("in_order", null)
        $timeout(function() {
            $location.search("search", "cqp")
            if (!_.keys(settings.defaultWithin).includes(s.within)) {
                var { within } = s
            }
            $location.search("within", within)
        }, 0)
    })

    s.$on("extended_set", ($event, val) => (s.cqp = val))

    if ($location.search().cqp) {
        s.cqp = $location.search().cqp
    }

    s.$watch("repeatError", repeatError => (s.searchDisabled = repeatError))

    const updateExtendedCQP = function() {
        let val2 = CQP.expandOperators(s.cqp)
        if ($rootScope.globalFilter) {
            val2 = CQP.stringify(
                CQP.mergeCqpExprs(CQP.parse(val2 || "[]"), $rootScope.globalFilter)
            )
        }
        $rootScope.extendedCQP = val2
    }

    $rootScope.$watch("globalFilter", function() {
        if ($rootScope.globalFilter) {
            updateExtendedCQP()
        }
    })

    s.$watch("cqp", function(val) {
        if (!val) {
            return
        }
        try {
            updateExtendedCQP()
        } catch (e) {
            c.log("cqp parse error:", e)
        }
        $location.search("cqp", val)
    })

    s.withins = []

    s.getWithins = function() {
        const union = settings.corpusListing.getWithinKeys()
        const output = _.map(union, item => ({ value: item }))
        return output
    }

    return s.$on("corpuschooserchange", function() {
        s.withins = s.getWithins()
        s.within = s.withins[0] && s.withins[0].value
    })
})

korpApp.controller("ExtendedToken", function($scope, utils, $location) {
    const s = $scope
    const cqp = "[]"
    s.valfilter = utils.valfilter

    s.setDefault = function(or_obj) {
        // assign the first value from the opts
        const opts = s.getOpts(or_obj.type)

        if (!opts) {
            or_obj.op = "is"
        } else {
            or_obj.op = _.values(opts)[0][1]
        }

        or_obj.val = ""
    }

    // returning new array each time kills angular, hence the memoizing
    s.getOpts = _.memoize(function(type) {
        if (!(type in (s.typeMapping || {}))) {
            return
        }
        let confObj = s.typeMapping && s.typeMapping[type]
        if (!confObj) {
            c.log("confObj missing", type, s.typeMapping)
            return
        }

        confObj = _.extend({}, (confObj && confObj.opts) || settings.defaultOptions)

        if (confObj.type === "set") {
            confObj.is = "contains"
        }

        return _.toPairs(confObj)
    })

    const onCorpusChange = function(event, selected) {
        // TODO: respect the setting 'wordAttributeSelector' and similar
        if (!(selected && selected.length)) {
            return
        }
        const lang = s.$parent.$parent && s.$parent.$parent.l && s.$parent.$parent.l.lang
        const allAttrs = settings.corpusListing.getAttributeGroups(lang)
        s.types = _.filter(allAttrs, item => !item.hideExtended)
        s.typeMapping = _.fromPairs(
            _.map(s.types, function(item) {
                if (item.isStructAttr) {
                    return [`_.${item.value}`, item]
                } else {
                    return [item.value, item]
                }
            })
        )
    }

    s.$on("corpuschooserchange", onCorpusChange)

    onCorpusChange(null, settings.corpusListing.selected)

    s.removeOr = function(token, and_array, i) {
        if (and_array.length > 1) {
            and_array.splice(i, 1)
        } else if (token.and_block.length > 1) {
            token.and_block.splice(_.indexOf(token.and_block, and_array), 1)
        }
    }

    s.addAnd = token => token.and_block.push(s.addOr([]))

    const toggleBound = function(token, bnd) {
        if (!(token.bound && token.bound[bnd])) {
            const boundObj = {}
            boundObj[bnd] = true
            token.bound = _.extend(token.bound || {}, boundObj)
        } else if (token.bound) {
            delete token.bound[bnd]
        }
    }

    s.toggleStart = token => toggleBound(token, "lbound")
    s.toggleEnd = token => toggleBound(token, "rbound")
})

korpApp.directive("advancedSearch", () => ({
    controller($scope, compareSearches, $location, $timeout, $rootScope) {
        if ($location.search().search && $location.search().search.split("|")) {
            var [type, ...expr] = $location.search().search.split("|")
            expr = expr.join("|")
        }

        if (type === "cqp") {
            $scope.cqp = expr || "[]"
        } else {
            $scope.cqp = "[]"
        }

        $scope.$on("popover_submit", (event, name) => compareSearches.saveSearch(name, $scope.cqp))

        $scope.$on("btn_submit", function() {
            c.log("advanced submit", $scope.cqp)
            $location.search("search", null)
            $location.search("page", null)
            $location.search("within", null)
            $location.search("in_order", null)
            $timeout(() => $location.search("search", `cqp|${$scope.cqp}`), 0)
        })
    }
}))

korpApp.filter("mapper", () => (item, f) => f(item))

korpApp.directive("compareSearchCtrl", () => ({
    controller($scope, utils, $location, backend, $rootScope, compareSearches) {
        const s = $scope
        s.valfilter = utils.valfilter

        s.savedSearches = compareSearches.savedSearches
        s.$watch("savedSearches.length", function() {
            s.cmp1 = compareSearches.savedSearches[0]
            s.cmp2 = compareSearches.savedSearches[1]
            if (!s.cmp1 || !s.cmp2) {
                return
            }

            const listing = settings.corpusListing.subsetFactory(
                _.uniq([].concat(s.cmp1.corpora, s.cmp2.corpora))
            )
            const allAttrs = listing.getAttributeGroups()
            s.currentAttrs = _.filter(allAttrs, item => !item.hideCompare)
        })

        s.reduce = "word"

        s.sendCompare = () =>
            $rootScope.compareTabs.push(backend.requestCompare(s.cmp1, s.cmp2, [s.reduce]))

        s.deleteCompares = () => compareSearches.flush()
    }
}))

korpApp.filter("loc", $rootScope => (translationKey, lang) =>
    util.getLocaleString(translationKey, lang)
)
