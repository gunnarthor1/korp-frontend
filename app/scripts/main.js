/** @format */

const korpFailImg = require("../img/error_message.png")
const risamh_logo = require("../img/risamh_logo.svg")
const mim_logo = require("../img/mim_logo.svg")
const fornrit_logo = require("../img/fornrit_logo.svg")
const otb_logo = require("../img/ohlogo_hvitt_m.png")


window.authenticationProxy = new model.AuthenticationProxy()
window.timeProxy = new model.TimeProxy()

const creds = $.jStorage.get("creds")
if (creds) {
    authenticationProxy.loginObj = creds
}

// rewriting old url format to the angular one
if (location.hash.length && location.hash[1] !== "?") {
    location.hash = `#?${_.trimStart(location.hash, "#")}`
}

const t = $.now()

$.ajaxSetup({
    dataType: "json",
    traditional: true
})

$.ajaxPrefilter("json", function(options, orig, jqXHR) {
    if (options.crossDomain && !$.support.cors) {
        return "jsonp"
    }
})

const deferred_domReady = $.Deferred(function(dfd) {
    $(function() {
        let { mode } = $.deparam.querystring()
        // fix til að mode birtist í url        
        if (!mode) {
            mode = "rmh2018"
            const newURL = $.param.querystring($.param.querystring(), { mode })
            window.location.href = newURL
        }
        return $.getScript(`modes/${mode}_mode.js`)
            .done(() => dfd.resolve())
            .fail((jqxhr, settings, exception) => c.error("Mode file parsing error: ", exception))
    })
    return dfd
}).promise()

const loc_dfd = window.initLocales()
$(document).keyup(function(event) {
    if (event.keyCode === 27) {
        if (kwicResults) {
            kwicResults.abort()
        }
        if (lemgramResults) {
            lemgramResults.abort()
        }
        if (statsResults) {
            statsResults.abort()
        }
    }
})

// const toggleLogos = function() {
//     if ($(window).width() > 1050) {
//         return $(".logos").show()
//     } else {
//         return $(".logos").hide()
//     }
// }
// toggleLogos()

// $(window).resize(event => toggleLogos())

$.when(loc_dfd, deferred_domReady).then(
    function(loc_data) {
        let e
        c.log("preloading done, t = ", $.now() - t)

        try {
            angular.bootstrap(document, ["korpApp"])
        } catch (error) {
            e = error
            c.error(e)
        }

        try {
            const corpus = locationSearch()["corpus"]
            if (corpus) {
                settings.corpusListing.select(corpus.split(","))
            }
            view.updateSearchHistory()
        } catch (error1) {
            e = error1
            c.error("ERROR setting corpora from location", e)
        }

        if (isLab) {
            $("body").addClass("lab")
        }

    $("body").addClass(`mode-${currentMode}`)
    const mainLogoFig = document.getElementById("main_logo").firstChild
    switch (currentMode) {
        case "mim":
            mainLogoFig.firstChild.src = mim_logo
            break
            // mainLogoFig.childNodes[1].setAttribute("rel", "localize[mim_logo]")
        case "fornrit":
            mainLogoFig.firstChild.src = fornrit_logo
            break
            // mainLogoFig.childNodes[1].setAttribute("rel", "localize[fornrit_logo]")
        case "otb":
            mainLogoFig.firstChild.src = otb_logo
            break
            // mainLogoFig.childNodes[1].setAttribute("rel", "localize[otb_logo]")
        case "parallel":
            mainLogoFig.firstChild.src = risamh_logo
            break
            // mainLogoFig.childNodes[1].setAttribute("rel", "localize[samhlida_logo]")
        default:
            mainLogoFig.firstChild.src = risamh_logo
    }
            // mainLogoFig.childNodes[1].setAttribute("rel", "localize[rmh_logo]")
    util.browserWarn()

        $("#search_history").change(function(event) {
            c.log("select", $(this).find(":selected"))
            const target = $(this).find(":selected")
            if (_.includes(target.val(), "http://")) {
                location.href = target.val()
            } else if (target.is(".clear")) {
                c.log("empty searches")
                $.jStorage.set("searches", [])
                view.updateSearchHistory()
            }
        })

        let prevFragment = {}
        window.onHashChange = function(event, isInit) {
            c.log("onHashChange")
            const hasChanged = key => prevFragment[key] !== locationSearch()[key]
            if (hasChanged("lang")) {
                const newLang = locationSearch().lang || settings.defaultLanguage
                $("body").scope().lang = newLang
                window.lang = newLang
                util.localize()

                $("#languages").radioList("select", newLang)
            }

            const { display } = locationSearch()

            if (isInit) {
                util.localize()
            }

            prevFragment = _.extend({}, locationSearch())
        }

        $(window).scroll(() => $("#sidebar").sidebar("updatePlacement"))

        $("#languages").radioList({
            change() {
                c.log(
                    "lang change",
                    $(this)
                        .radioList("getSelected")
                        .data("mode")
                )
                locationSearch({
                    lang: $(this)
                        .radioList("getSelected")
                        .data("mode")
                })
            },
            // TODO: this does nothing?
            selected: settings.defaultLanguage
	    })
	    $("#sidebar").sidebar()
	
        setTimeout(() => window.onHashChange(null, true), 0)
        $("body").animate({ opacity: 1 }, function() {
            $(this).css("opacity", "")
        })
    },
    function() {
    c.log("failed to load some resource at startup.", arguments)
    return $("body")
        .css({
        	opacity: 1,
        	padding: 20
    	})
		.html('<object class="error_message" type="image/svg+xml" data="img/error_message.png">')
    	.append("<p>The server failed to respond, please try again later.</p>")
	}
)

        $(window).scroll(() => $("#sidebar").sidebar("updatePlacement"))

window.getAllCorporaInFolders = function(lastLevel, folderOrCorpus) {
    let outCorpora = []

    // Go down the alley to the last subfolder
    while (folderOrCorpus.includes(".")) {
        const posOfPeriod = _.indexOf(folderOrCorpus, ".")
        const leftPart = folderOrCorpus.substr(0, posOfPeriod)
        const rightPart = folderOrCorpus.substr(posOfPeriod + 1)
        if (lastLevel[leftPart]) {
            lastLevel = lastLevel[leftPart]
            folderOrCorpus = rightPart
        } else {
            break
        }
    }
    if (lastLevel[folderOrCorpus]) {
        // Folder
        // Continue to go through any subfolders
        $.each(lastLevel[folderOrCorpus], function(key, val) {
            if (!["title", "contents", "description"].includes(key)) {
                outCorpora = outCorpora.concat(
                    getAllCorporaInFolders(lastLevel[folderOrCorpus], key)
                )
            }
        })

        // And add the corpora in this folder level
        outCorpora = outCorpora.concat(lastLevel[folderOrCorpus]["contents"])
    } else {
        // Corpus
        outCorpora.push(folderOrCorpus)
    }
    return outCorpora
}

window.initTimeGraph = function(def) {
    let timestruct = null
    let restdata = null
    let restyear = null
    let hasRest = false

    let onTimeGraphChange = function() {}

    const getValByDate = function(date, struct) {
        let output = null
        $.each(struct, function(i, item) {
            if (date === item[0]) {
                output = item[1]
                return false
            }
        })

        return output
    }

    window.timeDeferred = timeProxy
		.makeRequest()
        .fail(error => {
				console.error(error)
				$("#time_graph").html("<i>Time graph is unavailable for this corpus</i>")
		})
		.done(function(...args) {
            let dataByCorpus, rest
            for (let corpus in dataByCorpus) {
                let struct = dataByCorpus[corpus]
                if (corpus !== "time") {
                    const cor = settings.corpora[corpus.toLowerCase()]
                    timeProxy.expandTimeStruct(struct)
                    cor.non_time = struct[""]
                    struct = _.omit(struct, "")
                    cor.time = struct
                    if (_.keys(struct).length > 1) {
                        if (cor.common_attributes == null) {
                            cor.common_attributes = {}
                        }
                        cor.common_attributes.date_interval = true
                    }
                }
            }

            safeApply($("body").scope(), function(scope) {
                scope.$broadcast(
                    "corpuschooserchange",
                    corpusChooserInstance.corpusChooser("selectedItems")
                )
                return def.resolve()
            })

            onTimeGraphChange = function(evt, data) {
                let max = _.reduce(
                    all_timestruct,
                    function(accu, item) {
                        if (item[1] > accu) {
                            return item[1]
                        }
                        return accu
                    },
                    0
                )

                // the 46 here is the presumed value of
                // the height of the graph
                const one_px = max / 46

                const normalize = array =>
                    _.map(array, function(item) {
                        const out = [].concat(item)
                        if (out[1] < one_px && out[1] > 0) {
                            out[1] = one_px
                        }
                        return out
                    })

                const output = _(settings.corpusListing.selected)
                    .map("time")
                    .filter(Boolean)
                    .map(_.toPairs)
                    .flatten(true)
                    .reduce(function(memo, ...rest1) {
                        const [a, b] = rest1[0]
                        if (typeof memo[a] === "undefined") {
                            memo[a] = b
                        } else {
                            memo[a] += b
                        }
                        return memo
                    }, {})

                timestruct = timeProxy.compilePlotArray(output)
                const endyear = all_timestruct.slice(-1)[0][0]
                const yeardiff = endyear - all_timestruct[0][0]
                restyear = endyear + yeardiff / 25
                restdata = _(settings.corpusListing.selected)
                    .filter(item => item.time)
                    .reduce((accu, corp) => accu + parseInt(corp.non_time || "0"), 0)

                hasRest = yeardiff > 0

                const plots = [
                    { data: normalize([].concat(all_timestruct, [[restyear, rest]])) },
                    { data: normalize(timestruct) }
                ]
                if (restdata) {
                    plots.push({
                        data: normalize([[restyear, restdata]])
                    })
                }

                $.plot($("#time_graph"), plots, {
                    bars: {
                        show: true,
                        fill: 1,
                        align: "center"
                    },

                    grid: {
                        hoverable: true,
                        borderColor: "white"
                    },

                    yaxis: {
                        show: false
                    },

                    xaxis: {
                        show: true,
                        // This limits the x axis to the 20th and 21st century
                        min: 1900,
                        max: endyear + 1,
                        tickDecimals: 0
                    },

                    hoverable: true,
                    colors: ["lightgrey", "navy", "#cd5c5c"]
                })
                return $.each($("#time_graph .tickLabel"), function() {
                    if (parseInt($(this).text()) > new Date().getFullYear()) {
                        return $(this).hide()
                    }
                })
            }

            return $("#time_graph,#rest_time_graph").bind(
                "plothover",
                _.throttle(function(event, pos, item) {
                    if (item) {
                        let total, val
                        const date = item.datapoint[0]
                        const header = $("<h4>")
                        if (date === restyear && hasRest) {
                            header.text(util.getLocaleString("corpselector_rest_time"))
                            val = restdata
                            total = rest
                        } else {
                            header.text(
                                util.getLocaleString("corpselector_time") + " " + item.datapoint[0]
                            )
                            val = getValByDate(date, timestruct)
                            total = getValByDate(date, all_timestruct)
                        }

                        const pTmpl = _.template(
                            "<p><span rel='localize[<%= loc %>]'></span>: <%= num %> <span rel='localize[corpselector_tokens]' </p>"
                        )
                        const firstrow = pTmpl({
                            loc: "corpselector_time_chosen",
                            num: util.prettyNumbers(val || 0)
                        })
                        const secondrow = pTmpl({
                            loc: "corpselector_of_total",
                            num: util.prettyNumbers(total)
                        })
                        $(".corpusInfoSpace").css({
                            top: $(this)
                                .parent()
                                .offset().top
                        })
                        return $(".corpusInfoSpace")
                            .find("p")
                            .empty()
                            .append(header, "<span> </span>", firstrow, secondrow)
                            .localize()
                            .end()
                            .fadeIn("fast")
                    } else {
                        return $(".corpusInfoSpace").fadeOut("fast")
                    }
                }, 100)
            )
        })

    const opendfd = $.Deferred()
    $("#corpusbox").one("corpuschooseropen", () => opendfd.resolve())

    return $.when(window.timeDeferred, opendfd).then(function() {
        $("#corpusbox").bind("corpuschooserchange", onTimeGraphChange)
        return onTimeGraphChange()
    })
}
