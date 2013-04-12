class window.CorpusListing
    constructor: (corpora) ->
        @struct = corpora
        @corpora = _.values(corpora)
        @selected = []

    get: (key) ->
        @struct[key]

    list: ->
        @corpora

    map: (func) ->
        _.map @corpora, func

    subsetFactory : (idArray) ->
        #returns a new CorpusListing instance from an id subset.
        idArray = _.invoke(idArray, "toLowerCase")
        cl = new CorpusListing _.pick @struct, idArray...
        cl.selected = cl.corpora
        return cl


    # Returns an array of all the selected corpora's IDs in uppercase
    getSelectedCorpora: ->
        corpusChooserInstance.corpusChooser "selectedItems"

    select: (idArray) ->
        @selected = _.values(_.pick.apply(this, [@struct].concat(idArray)))

    mapSelectedCorpora: (f) ->
        _.map @selected, f


    # takes an array of mapping objs and returns their intersection
    _mapping_intersection: (mappingArray) ->
        _.reduce mappingArray, ((a, b) ->
            output = {}
            $.each b, (key, value) ->
                output[key] = value  if b[key]?

            output
        ), {}

    _mapping_union: (mappingArray) ->
        _.reduce mappingArray, ((a, b) ->
            _.merge a, b
        ), {}

    getCurrentAttributes: ->
        attrs = @mapSelectedCorpora((corpus) ->
            corpus.attributes
        )
        @_invalidateAttrs attrs

    getStructAttrs: ->
        attrs = @mapSelectedCorpora((corpus) ->
            $.each corpus.struct_attributes, (key, value) ->
                value["isStructAttr"] = true

            corpus.struct_attributes
        )
        rest = @_invalidateAttrs(attrs)

        # fix for combining dataset values
        withDataset = _.filter(_.pairs(rest), (item) ->
            item[1].dataset
        )
        $.each withDataset, (i, item) ->
            key = item[0]
            val = item[1]
            $.each attrs, (j, origStruct) ->
                if origStruct[key]?.dataset
                    ds = origStruct[key].dataset
                    ds = _.object(ds, ds) if $.isArray(ds)
                    $.extend val.dataset, ds


        $.extend rest, _.object(withDataset)

    _invalidateAttrs: (attrs) ->
        union = @_mapping_union(attrs)
        intersection = @_mapping_intersection(attrs)
        $.each union, (key, value) ->
            unless intersection[key]?
                value["disabled"] = true
            else
                delete value["disabled"]

        union

    corpusHasAttr: (corpus, attr) ->
        attr of $.extend({}, @struct[corpus].attributes, @struct[corpus].struct_attributes)

    stringifySelected: ->
        _(@selected).pluck("id").invoke("toUpperCase").join ","

    getAttrIntersection: (attr) ->
        struct = _.map(@selected, (corpus) ->
            _.keys corpus[attr]
        )
        _.intersection.apply null, struct

    getAttrUnion: (attr) ->
        struct = _.map(@selected, (corpus) ->
            _.keys corpus[attr]
        )
        _.union struct...

    getContextQueryString: ->

        # if("1 paragraph" in settings.corpora[id].context)
        $.grep($.map(_.pluck(settings.corpusListing.selected, "id"), (id) ->
            id.toUpperCase() + ":" + _.keys(settings.corpora[id].context).slice(-1)  if _.keys(settings.corpora[id].context)
        ), Boolean).join()

    getWithinQueryString: ->
        $.grep($.map(_.pluck(settings.corpusListing.selected, "id"), (id) ->
            id.toUpperCase() + ":" + _.keys(settings.corpora[id].within).slice(-1)  if _.keys(settings.corpora[id].within)
        ), Boolean).join()

    getMorphology: ->
        _(@selected).map((corpus) ->
            morf = corpus.morf or "saldom"
            morf.split "|"
        ).flatten().unique().join "|"

    getTimeInterval : ->
        all = _(settings.corpusListing.selected)
            .pluck("time")
            .filter((item) -> item?)
            .map(_.keys)
            .flatten()
            .map(Number)
            .sort((a, b) ->
                a - b
            ).value()


        return [_.first(all), _.last(all)]

    getNonProtected : () ->
        _.filter @corpora, (item) ->
            not item.limited_access
            
    
class window.ParallelCorpusListing extends CorpusListing
    constructor: (corpora) ->
        super(corpora)
        # @parallel_corpora = corpora
        # @corpora = _.values struct
        # @struct = corpora
        # $.each corpora, (__, struct) =>
        #     $.each struct, (key, corp) =>
        #         return if key is "default"
        #         @corpora.push corp
        #         @struct[corp.id] = corp



    select: (idArray) ->
        c.log "idArray", idArray
        @selected = []
        $.each idArray, (i, id) =>
            corp = @struct[id]
            @selected = @selected.concat(@getLinked(corp, true, false))

        @selected = _.unique @selected


    getCurrentAttributes: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        struct = _.reduce(corpora, (a, b) ->
            $.extend {}, a.attributes, b.attributes
        , {})
        struct

    getStructAttrs: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        struct = _.reduce(corpora, (a, b) ->
            $.extend {}, a.struct_attributes, b.struct_attributes
        , {})
        $.each struct, (key, val) ->
            val["isStructAttr"] = true

        struct

    getLinked : (corp, andSelf=false, only_selected=true) ->
        target = if only_selected then @selected else @struct
        output = _.filter target, (item) ->
            item.id in (corp.linked_to or [])
        output = [corp].concat output if andSelf
        output

    getEnabledByLang : (lang, andSelf=false) ->
        corps = _.filter @selected, (item) ->
            item["lang"] == lang
        # c.log "corps", corps
        # window.crp = corps
        _(corps).map((item) =>
            @getLinked item, andSelf
        ).flatten().value()


    # getParentCorpora : () ->
    #     output = []
    #     $.each @selected, (i, corp) =>
    #         childCorpora = $.grepObj(@parallel_corpora[corp.parent], (val, key) ->
    #             key isnt "default"
    #         )
    #         output = output.concat(childCorpora)

    #     output

    getCorporaByLangs : (currentLangList) ->
        # parents = @getParentCorpora()
        
        # remove corpora for lang not used
        enabledForLangs = _.filter @selected, (corp) ->
            corp.lang in currentLangList

        if currentLangList.length is 1
            output = for child in enabledForLangs
                @getLinked child, true

            return not_linked: output
        else

            linkedSets = _.map enabledForLangs, (lang) =>
                @getLinked lang
            output = _.filter _.flatten(linkedSets), (item) =>
                item.lang in currentLangList


            return linked: output

settings.corpusListing = new CorpusListing(settings.corpora)


window.getScope = (ctrl) ->
    return angular.element("[ng-controller=#{ctrl}]").scope()

window.applyTo = (ctrl, f) ->
    s = getScope(ctrl)
    s.$apply f(s)
