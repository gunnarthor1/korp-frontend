window.korpApp = angular.module 'korpApp', [
                                            "ui.bootstrap.typeahead"
                                            "uib/template/typeahead/typeahead-popup.html"
                                            "ui.bootstrap.tooltip"
                                            "uib/template/tooltip/tooltip-popup.html"
                                            "uib/template/tooltip/tooltip-html-popup.html"
                                            "ui.bootstrap.modal"
                                            "uib/template/modal/window.html"
                                            "ui.bootstrap.tabs"
                                            "uib/template/tabs/tabset.html"
                                            "uib/template/tabs/tab.html"
                                            "ui.bootstrap.dropdown"
                                            "ui.bootstrap.pagination"
                                            "uib/template/pagination/pagination.html"
                                            "ui.bootstrap.datepicker"
                                            "uib/template/datepicker/datepicker.html"
                                            "uib/template/datepicker/day.html"
                                            "uib/template/datepicker/month.html"
                                            "uib/template/datepicker/year.html"
                                            "ui.bootstrap.timepicker"
                                            "uib/template/timepicker/timepicker.html"
                                            "ui.bootstrap.buttons"
                                            "angularSpinner"
                                            "ui.sortable"
                                            "newsdesk"
                                            "sbMap"
                                            "tmh.dynamicLocale"
                                            "angular.filter"
                                        ]

korpApp.config (tmhDynamicLocaleProvider) ->
    tmhDynamicLocaleProvider.localeLocationPattern("translations/angular-locale_{{locale}}.js")

korpApp.config ($uibTooltipProvider) ->
    $uibTooltipProvider.options
        appendToBody: true

korpApp.config ['$locationProvider', ($locationProvider) ->
  $locationProvider.hashPrefix ''
]

korpApp.config ['$compileProvider', ($compileProvider) ->
    $compileProvider.aHrefSanitizationWhitelist /^\s*(https?|ftp|mailto|tel|file|blob):/
]

korpApp.run ($rootScope, $location, utils, searches, tmhDynamicLocale, $timeout, $q) ->
    s = $rootScope
    s._settings = settings
    window.lang = s.lang = $location.search().lang or settings.defaultLanguage
    s.word_selected = null
    s.isLab = window.isLab;

    s.sidebar_visible = false

    s.extendedCQP = null

    s.globalFilterDef = $q.defer()

    s.locationSearch = () ->
        $location.search arguments...

    s.searchtabs = () ->
        $(".search_tabs > ul").scope().tabset.tabs

    tmhDynamicLocale.set("en")

    s._loc = $location

    s.$watch "_loc.search()", () ->
        c.log "loc.search() change", $location.search()
        _.defer () -> window.onHashChange?()

        tmhDynamicLocale.set($location.search().lang or "sv")



    $rootScope.kwicTabs = []
    $rootScope.compareTabs = []
    $rootScope.graphTabs = []
    $rootScope.mapTabs = []
    isInit = true

    if $location.search().corpus
        loginNeededFor = []
        for corpus in $location.search().corpus.split(",")
            corpusObj = settings.corpusListing.struct[corpus]
            if corpusObj.limitedAccess
                if (_.isEmpty authenticationProxy.loginObj) or (corpus.toUpperCase() not in authenticationProxy.loginObj.credentials)
                    loginNeededFor.push corpusObj
        s.loginNeededFor = loginNeededFor

        if not _.isEmpty s.loginNeededFor
            s.savedState = $location.search()
            $location.url $location.path()
            if s.savedState.reading_mode
                $location.search "reading_mode"
            $location.search "display", "login"

    s.restorePreLoginState = () ->
        if s.savedState
            for key, val of s.savedState
                $location.search key, val

            corpora = s.savedState.corpus.split(",")
            settings.corpusListing.select corpora
            corpusChooserInstance.corpusChooser "selectItems", corpora

            s.savedState = null
            s.loginNeededFor = null


    s.searchDisabled = false
    s.$on "corpuschooserchange", (event, corpora) ->
        c.log "corpuschooserchange", corpora
        settings.corpusListing.select corpora
        nonprotected = _.map(settings.corpusListing.getNonProtected(), "id")
        if corpora.length and _.intersection(corpora, nonprotected).length isnt nonprotected.length
            $location.search "corpus", corpora.join(",")
        else
            $location.search "corpus", null

        isInit = false

        s.searchDisabled = settings.corpusListing.selected.length == 0

    searches.infoDef.then () ->
        corpus = $location.search().corpus
        currentCorpora = []
        if corpus
            _.map corpus.split(","), (val) ->
                currentCorpora = [].concat(currentCorpora, getAllCorporaInFolders(settings.corporafolders, val))
        else
            if not settings.preselectedCorpora?.length
                currentCorpora = _.map settings.corpusListing.corpora, "id"
            else
                for pre_item in settings.preselectedCorpora
                    pre_item = pre_item.replace /^__/g, ''
                    currentCorpora = [].concat(currentCorpora, getAllCorporaInFolders(settings.corporafolders, pre_item))

            settings.preselectedCorpora = currentCorpora

        settings.corpusListing.select currentCorpora
        corpusChooserInstance.corpusChooser "selectItems", currentCorpora


korpApp.controller "headerCtrl", ($scope, $location, $uibModal, utils) ->
    s = $scope

    s.logoClick = () ->
        window.location = $scope.getUrl currentMode
        window.location.reload()


    s.citeClick = () ->
        s.show_modal = 'about'

    s.contactClick = () ->
        console.log 'contact'
        s.show_modal = 'contact'

    s.showLogin = () ->
        s.show_modal = 'login'

    s.logout = () ->
        authenticationProxy.loginObj = {}
        $.jStorage.deleteKey "creds"

        # TODO figure out another way to do this
        for corpusObj in settings.corpusListing.corpora
            corpus = corpusObj.id
            if corpusObj.limitedAccess
                $("#hpcorpus_#{corpus}").closest(".boxdiv").addClass("disabled")
        $("#corpusbox").corpusChooser "updateAllStates"

        newCorpora = []
        for corpus in settings.corpusListing.getSelectedCorpora()
            if not settings.corpora[corpus].limitedAccess
                newCorpora.push corpus

        if _.isEmpty newCorpora
            newCorpora = settings.preselectedCorpora
        settings.corpusListing.select newCorpora
        s.loggedIn = false
        $("#corpusbox").corpusChooser "selectItems", newCorpora
        return

    N_VISIBLE = settings.visibleModes

    s.modes = _.filter settings.modeConfig
    if !isLab
        s.modes = _.filter settings.modeConfig, (item) ->
            item.labOnly != true


    s.visible = s.modes[...N_VISIBLE]
    s.menu = s.modes[N_VISIBLE..]

    i = $.inArray currentMode, (_.map s.menu, "mode")
    if i != -1
        s.visible.push s.menu[i]
        s.menu.splice(i, 1)

    for mode in s.modes
        mode.selected = false
        if mode.mode == currentMode
            mode.selected = true

    s.getUrl = (modeId) ->
        langParam = "#?lang=#{s.$root.lang}"
        if modeId is "default"
            return location.pathname + langParam
        return location.pathname + "?mode=#{modeId}" + langParam

    s.show_modal = false

    modal = null
    utils.setupHash s, [
        key: "display"
        scope_name: "show_modal"
        post_change : (val) ->
            c.log "post change", val
            if val
                showModal(val)
            else
                c.log "post change modal", modal
                modal?.close()
                modal = null
    ]

    closeModals = () ->
        s.login_err = false
        s.show_modal = false

    showModal = (key) ->
        tmpl = {
          about: 'app/markup/about.html',
          login: 'login_modal',
          contact: 'app/markup/contact.html'
        }[key]
        params =
            templateUrl : tmpl
            scope : s
            windowClass : key
        if key == 'login'
            params.size = 'sm'
        modal = $uibModal.open params

        modal.result.then (() ->
            closeModals()
        ), () ->
            closeModals()

    s.clickX = () ->
        closeModals()

    s.loggedIn = false
    creds = $.jStorage.get("creds")
    if creds
        util.setLogin()
        s.loggedIn = true
        s.username = authenticationProxy.loginObj.name
    s.loginSubmit = (usr, pass, saveLogin) ->
        s.login_err = false
        authenticationProxy.makeRequest(usr, pass, saveLogin).done((data) ->
            util.setLogin()
            safeApply s, () ->
                s.show_modal = null
                s.restorePreLoginState()
                s.loggedIn = true
                s.username = usr
        ).fail ->
            c.log "login fail"
            safeApply s, () ->
                s.login_err = true


korpApp.filter "trust", ($sce) ->
    return (input) ->
        $sce.trustAsHtml input
