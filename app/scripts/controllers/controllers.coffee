window.korpApp = angular.module('korpApp', [])


korpApp.controller "kwicCtrl", ($scope) ->
    s = $scope

    punctArray = [",", ".", ";", ":", "!", "?", "..."]

    massageData = (sentenceArray) ->
        currentStruct = []
        prevCorpus = ""
        return _.flatten _.map sentenceArray, (sentence) ->
            [matchSentenceStart, matchSentenceEnd] = findMatchSentence sentence
            {start, end} = sentence.match

            for i in [0...sentence.tokens.length]
                wd = sentence.tokens[i]
                if start <= i < end
                    _.extend wd, {_match : true}
                if matchSentenceStart < i < matchSentenceEnd
                    _.extend wd, {_matchSentence : true}
                if wd.word in punctArray
                    _.extend wd, {_punct : true}
                if wd.structs?.open
                    wd._open = wd.structs.open
                    currentStruct = [].concat(currentStruct, wd.structs.open)
                else if wd.structs?.close
                    wd._close = wd.structs.close
                    currentStruct = _.without currentStruct, wd.structs.close...


                _.extend wd, {_struct : currentStruct} if currentStruct.length
            if prevCorpus != sentence.corpus
                corpus = settings.corpora[sentence.corpus.toLowerCase()]
                corpus = settings.corpora[sentence.corpus.split("|")[0].toLowerCase()]  if currentMode is "parallel"
                    # td.addClass "no_context"
                    # title.append $("<span class='corpus_title_warn' rel='localize[no_context_support]'></span>")
                newSent = {newCorpus : corpus.title, noContext : _.keys(corpus.context).length == 1}
                prevCorpus = sentence.corpus
                return [newSent, sentence]

                # _.extend sentence, {_newCorpus : sentence.corpus}
            prevCorpus = sentence.corpus
            return sentence

    findMatchSentence = (sentence) ->
        span = []
        {start, end} = sentence.match
        decr = start
        incr = end
        while decr >= 0
            if "sentence" in (sentence.tokens[decr--].structs?.open or [])
                span[0] = decr
                break
        while incr < sentence.tokens.length
            if "sentence" in (sentence.tokens[incr++].structs?.close or [])
                span[1] = incr
                break

        return span





    s.kwic = []
    s.contextKwic = []
    s.setContextData = (data) ->
        s.contextKwic = massageData data.kwic

    s.setKwicData = (data) ->
        s.kwic = massageData(data.kwic)

    s.selectionManager = new util.SelectionManager()

    s.selectLeft = (sentence) ->
        if not sentence.match then return
        # c.log "left", sentence.tokens.slice 0, sentence.match.start
        sentence.tokens.slice 0, sentence.match.start

    s.selectMatch = (sentence) ->
        if not sentence.match then return
        from = sentence.match.start
        sentence.tokens.slice from, sentence.match.end

    s.selectRight = (sentence) ->
        if not sentence.match then return
        from = sentence.match.end
        len = sentence.tokens.length
        sentence.tokens.slice from, len

    s.wordClick = (event, obj, sent) ->
        c.log "click", obj, event
        event.stopPropagation()
        word = $(event.target)
        $.sm.send("word.select")
        $("#sidebar").sidebar "updateContent", sent.structs, obj, sent.corpus.toLowerCase(), sent.tokens

        if not obj.dephead?
            s.selectionManager.select word, null
            return

        i = Number(obj.dephead)
        paragraph = word.closest(".sentence").find(".word")
        sent_start = 0
        if word.is(".open_sentence")
            sent_start = paragraph.index(word)
        else

            l = paragraph.filter((__, item) ->
                $(item).is(word) or $(item).is(".open_sentence")
            )
            sent_start = paragraph.index(l.eq(l.index(word) - 1))
        aux = $(paragraph.get(sent_start + i - 1))
        s.selectionManager.select word, aux



korpApp.directive 'kwicWord', ->
    replace: true
    template : """<span class="word" ng-class="getClassObj(wd)"
                    ng-click="wordClick($event, wd, sentence)" >{{wd.word}} </span>
                """
    link : (scope, element) ->
        scope.getClassObj = (wd) ->
            output =
                reading_match : wd._match
                punct : wd._punct
                match_sentence : wd._matchSentence

            for struct in (wd._struct or [])
                output["struct_" + struct] = true

            for struct in (wd._open or [])
                output["open_" + struct] = true
            for struct in (wd._close or [])
                output["close_" + struct] = true


            return output

