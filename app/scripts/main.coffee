
window.authenticationProxy = new model.AuthenticationProxy()
window.timeProxy = new model.TimeProxy()

creds = $.jStorage.get("creds")
if creds
    authenticationProxy.loginObj = creds

# rewriting old url format to the angular one
if(location.hash.length && location.hash[1] != "?")
    location.hash = "#?" + _.str.lstrip(location.hash, "#")

t = $.now()

$.ajaxSetup
    dataType: "json"
    traditional: true

$.ajaxPrefilter "json", (options, orig, jqXHR) ->
    "jsonp" if options.crossDomain and not $.support.cors

deferred_domReady = $.Deferred((dfd) ->
    $ ->
        mode = $.deparam.querystring().mode
        unless mode
            mode = "default"
        $.getScript("modes/common.js").done () ->
            $.getScript("modes/#{mode}_mode.js").done () ->
                dfd.resolve()
            .fail (jqxhr, settings, exception) ->
                c.error "Mode file parsing error: ", exception
        .fail (jqxhr, settings, exception) ->
            c.error "common.js parsing error: ", exception
    return dfd
).promise()

loc_dfd = initLocales()
$(document).keyup (event) ->
    if event.keyCode == 27
        kwicResults?.abort()
        lemgramResults?.abort()
        statsResults?.abort()

$.when(loc_dfd, deferred_domReady).then ((loc_data) ->
    c.log "preloading done, t = ", $.now() - t

    angular.bootstrap(document, ['korpApp'])

    try
        corpus = locationSearch()["corpus"]
        if corpus
            settings.corpusListing.select corpus.split(",")
        view.updateSearchHistory()
    catch e
        c.error "ERROR setting corpora from location", e


    $("body").addClass "lab" if isLab

    $("body").addClass "mode-" + currentMode
    util.browserWarn()

    $("#search_history").change (event) ->
        c.log "select", $(this).find(":selected")
        target = $(this).find(":selected")
        if _.str.contains target.val(), "http://"
            location.href = target.val()
        else if target.is(".clear")
            c.log "empty searches"
            $.jStorage.set("searches", [])
            view.updateSearchHistory()

    prevFragment = {}
    window.onHashChange = (event, isInit) ->
        c.log "onHashChange"
        hasChanged = (key) ->
            prevFragment[key] isnt locationSearch()[key]
        if hasChanged("lang")
            newLang = locationSearch().lang || settings.defaultLanguage
            $("body").scope().lang = newLang
            window.lang = newLang
            util.localize()

            $("#languages").radioList "select", newLang

        display = locationSearch().display

        if isInit
            util.localize()

        prevFragment = _.extend {}, locationSearch()


    $(window).scroll ->
        $("#sidebar").sidebar "updatePlacement"

    $("#languages").radioList(
        change: ->
            c.log "lang change", $(this).radioList("getSelected").data("mode")
            locationSearch lang: $(this).radioList("getSelected").data("mode")
        # TODO: this does nothing?
        selected: settings.defaultLanguage


    )
    $("#sidebar").sidebar()

    setTimeout(() ->
        onHashChange null, true
    , 0)
    $("body").animate
        opacity: 1
    , ->
        $(this).css "opacity", ""
), ->
    c.log "failed to load some resource at startup.", arguments
    $("body").css(
        opacity: 1
        padding: 20
    ).html('<object class="error_message" type="image/svg+xml" data="img/error_message.png">')
    .append "<p>The server failed to respond, please try again later.</p>"




window.getAllCorporaInFolders = (lastLevel, folderOrCorpus) ->
    outCorpora = []

    # Go down the alley to the last subfolder
    while "." in folderOrCorpus
        posOfPeriod = _.indexOf folderOrCorpus, "."
        leftPart = folderOrCorpus.substr(0, posOfPeriod)
        rightPart = folderOrCorpus.substr(posOfPeriod + 1)
        if lastLevel[leftPart]
            lastLevel = lastLevel[leftPart]
            folderOrCorpus = rightPart
        else
            break
    if lastLevel[folderOrCorpus]

        # Folder
        # Continue to go through any subfolders
        $.each lastLevel[folderOrCorpus], (key, val) ->
            outCorpora = outCorpora.concat getAllCorporaInFolders(lastLevel[folderOrCorpus], key) if key not in ["title", "contents", "description"]


        # And add the corpora in this folder level
        outCorpora = outCorpora.concat lastLevel[folderOrCorpus]["contents"]
    else

        # Corpus
        outCorpora.push folderOrCorpus
    outCorpora




window.initTimeGraph = (def) ->
    timestruct = null
    all_timestruct = null
    restdata = null
    restyear = null
    hasRest = false

    onTimeGraphChange = () ->

    getValByDate = (date, struct) ->
        output = null
        $.each struct, (i, item) ->
            if date is item[0]
                output = item[1]
                false

        return output

    window.timeDeferred = timeProxy.makeRequest()
        .fail (error) ->
            $("#time_graph").html("<i>Could not draw graph due to a backend error.</i>")
        .done ([dataByCorpus, all_timestruct, rest]) ->
            console.log all_timestruct
            for corpus, struct of dataByCorpus
                if corpus isnt "time"
                    cor = settings.corpora[corpus.toLowerCase()]
                    timeProxy.expandTimeStruct struct
                    cor.non_time = struct[""]
                    struct = _.omit struct, ""
                    cor.time = struct
                    if _.keys(struct).length > 1
                        cor.common_attributes ?= {}
                        cor.common_attributes.date_interval = true

            safeApply $("body").scope(), (scope) ->
                scope.$broadcast("corpuschooserchange", corpusChooserInstance.corpusChooser("selectedItems"));
                def.resolve()


            onTimeGraphChange = (evt, data) ->
                # the 46 here is the presumed value of
                # the height of the graph
                one_px = max / 46

                normalize = (array) ->
                    _.map array, (item) ->
                        out = [].concat(item)
                        out[1] = one_px if out[1] < one_px and out[1] > 0
                        out

                output = _(settings.corpusListing.selected)
                    .pluck("time")
                    .filter(Boolean)
                    .map(_.pairs)
                    .flatten(true)
                    .reduce((memo, [a, b]) ->
                        if typeof memo[a] is "undefined"
                            memo[a] = b
                        else
                            memo[a] += b
                        memo
                    , {})

                max = _.reduce(all_timestruct, (accu, item) ->
                    return item[1] if item[1] > accu
                    return accu
                , 0)



                timestruct = timeProxy.compilePlotArray(output)
                endyear = all_timestruct.slice(-1)[0][0]
                yeardiff = endyear - all_timestruct[0][0]
                restyear = endyear + (yeardiff / 25)
                restdata = _(settings.corpusListing.selected)
                    .filter((item) ->
                        item.time
                    ).reduce((accu, corp) ->
                        accu + parseInt(corp.non_time or "0")
                    , 0)

                hasRest = yeardiff > 0

                plots = [
                    data: normalize([].concat(all_timestruct, [[restyear, rest]]))
                    bars:
                        fillColor: "lightgrey"
                ,
                    data: normalize(timestruct)
                    bars:
                        fillColor: "navy"
                ]
                if restdata
                    plots.push
                        data: normalize([[restyear, restdata]])
                        bars:
                            fillColor: "indianred"

                plot = $.plot($("#time_graph"), plots,
                    bars:
                        show: true
                        fill: 1
                        align: "center"

                    grid:
                        hoverable: true
                        borderColor: "white"

                    yaxis:
                        show: false

                    xaxis:
                        show: true
                        # This limits the x axis to the 20th and 21st century
                        min: 1900
                        max: endyear + 1
                        tickDecimals: 0

                    hoverable: true
                    colors: ["lightgrey", "navy"]
                )
                $.each $("#time_graph .tickLabel"), ->
                    $(this).hide() if parseInt($(this).text()) > new Date().getFullYear()



            $("#time_graph,#rest_time_graph").bind "plothover", _.throttle((event, pos, item) ->
                if item
                    date = item.datapoint[0]
                    header = $("<h4>")
                    if date is restyear && hasRest
                        header.text util.getLocaleString("corpselector_rest_time")
                        val = restdata
                        total = rest
                    else
                        header.text util.getLocaleString("corpselector_time") + " " + item.datapoint[0]
                        val = getValByDate(date, timestruct)
                        total = getValByDate(date, all_timestruct)

                    pTmpl = _.template("<p><span rel='localize[<%= loc %>]'></span>: <%= num %> <span rel='localize[corpselector_tokens_nominative]' </p>")
                    firstrow = pTmpl(
                        loc: "corpselector_time_chosen"
                        num: util.prettyNumbers(val or 0)
                    )
                    secondrow = pTmpl(
                        loc: "corpselector_of_total"
                        num: util.prettyNumbers(total)
                    )
                    time = item.datapoint[0]
                    $(".corpusInfoSpace").css top: $(this).parent().offset().top
                    $(".corpusInfoSpace").find("p").empty()
                    .append(header, "<span> </span>", firstrow, secondrow)
                    .localize().end()
                    .fadeIn "fast"
                else
                    $(".corpusInfoSpace").fadeOut "fast"
            , 100)

    opendfd = $.Deferred()
    $("#corpusbox").one "corpuschooseropen", ->
        opendfd.resolve()

    $.when(timeDeferred, opendfd).then ->
        $("#corpusbox").bind "corpuschooserchange", onTimeGraphChange
        onTimeGraphChange()
