/* eslint-disable
    no-return-assign,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.korpApp = angular.module('korpApp', [
                                            "ui.bootstrap.typeahead",
                                            "uib/template/typeahead/typeahead-popup.html",
                                            "uib/template/typeahead/typeahead-match.html",
                                            "ui.bootstrap.tooltip",
                                            "uib/template/tooltip/tooltip-popup.html",
                                            "uib/template/tooltip/tooltip-html-popup.html",
                                            "ui.bootstrap.modal",
                                            "uib/template/modal/window.html",
                                            "ui.bootstrap.tabs",
                                            "uib/template/tabs/tabset.html",
                                            "uib/template/tabs/tab.html",
                                            "ui.bootstrap.dropdown",
                                            "ui.bootstrap.pagination",
                                            "uib/template/pagination/pagination.html",
                                            "ui.bootstrap.datepicker",
                                            "uib/template/datepicker/datepicker.html",
                                            "uib/template/datepicker/day.html",
                                            "uib/template/datepicker/month.html",
                                            "uib/template/datepicker/year.html",
                                            "ui.bootstrap.timepicker",
                                            "uib/template/timepicker/timepicker.html",
                                            "ui.bootstrap.buttons",
                                            "angularSpinner",
                                            "ui.sortable",
                                            "newsdesk",
                                            "sbMap",
                                            "tmh.dynamicLocale",
                                            "angular.filter"
                                        ])

korpApp.config(tmhDynamicLocaleProvider => tmhDynamicLocaleProvider.localeLocationPattern("translations/angular-locale_{{locale}}.js"))

korpApp.config($uibTooltipProvider => $uibTooltipProvider.options({ appendToBody: true }))

korpApp.config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')
])

korpApp.config(['$compileProvider', $compileProvider => $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/)
])

korpApp.run(function($rootScope, $location, utils, searches, tmhDynamicLocale, $timeout, $q) {
    let corpus, loginNeededFor
    const s = $rootScope
    s._settings = settings
    window.lang = (s.lang = $location.search().lang || settings.defaultLanguage)
    s.word_selected = null
    s.isLab = window.isLab

    s.sidebar_visible = false

    s.extendedCQP = null

    s.globalFilterDef = $q.defer()

    s.locationSearch = function() {
        return $location.search(...arguments)
    }

    s.searchtabs = () => $(".search_tabs > ul").scope().tabset.tabs

    tmhDynamicLocale.set("en")

    s._loc = $location

    s.$watch("_loc.search()", function() {
        c.log("loc.search() change", $location.search())
        _.defer(() => typeof window.onHashChange === 'function' ? window.onHashChange() : undefined)

        return tmhDynamicLocale.set($location.search().lang || "sv")
    })



    $rootScope.kwicTabs = []
    $rootScope.compareTabs = []
    $rootScope.graphTabs = []
    $rootScope.mapTabs = []
    let isInit = true

    if ($location.search().corpus) {
        loginNeededFor = []
        for (corpus of Array.from($location.search().corpus.split(","))) {
            const corpusObj = settings.corpusListing.struct[corpus]
            if (corpusObj.limitedAccess) {
                var needle
                if ((_.isEmpty(authenticationProxy.loginObj)) || ((needle = corpus.toUpperCase(), !Array.from(authenticationProxy.loginObj.credentials).includes(needle)))) {
                    loginNeededFor.push(corpusObj)
                }
            }
        }
        s.loginNeededFor = loginNeededFor

        if (!_.isEmpty(s.loginNeededFor)) {
            s.savedState = $location.search()
            $location.url($location.path())
            if (s.savedState.reading_mode) {
                $location.search("reading_mode")
            }
            $location.search("display", "login")
        }
    }

    s.restorePreLoginState = function() {
        if (s.savedState) {
            for (const key in s.savedState) {
                const val = s.savedState[key]
                $location.search(key, val)
            }

            const corpora = s.savedState.corpus.split(",")
            settings.corpusListing.select(corpora)
            corpusChooserInstance.corpusChooser("selectItems", corpora)

            s.savedState = null
            return s.loginNeededFor = null
        }
    }


    s.searchDisabled = false
    s.$on("corpuschooserchange", function(event, corpora) {
        c.log("corpuschooserchange", corpora)
        settings.corpusListing.select(corpora)
        const nonprotected = _.map(settings.corpusListing.getNonProtected(), "id")
        if (corpora.length && (_.intersection(corpora, nonprotected).length !== nonprotected.length)) {
            $location.search("corpus", corpora.join(","))
        } else {
            $location.search("corpus", null)
        }

        isInit = false

        return s.searchDisabled = settings.corpusListing.selected.length === 0
    })

    return searches.infoDef.then(function() {
        ({
            corpus
        } = $location.search())
        let currentCorpora = []
        if (corpus) {
            _.map(corpus.split(","), val => currentCorpora = [].concat(currentCorpora, getAllCorporaInFolders(settings.corporafolders, val)))
        } else {
            if (!(settings.preselectedCorpora != null ? settings.preselectedCorpora.length : undefined)) {
                currentCorpora = _.map(settings.corpusListing.corpora, "id")
            } else {
                for (let pre_item of Array.from(settings.preselectedCorpora)) {
                    pre_item = pre_item.replace(/^__/g, '')
                    currentCorpora = [].concat(currentCorpora, getAllCorporaInFolders(settings.corporafolders, pre_item))
                }
            }

            settings.preselectedCorpora = currentCorpora
        }

        settings.corpusListing.select(currentCorpora)
        return corpusChooserInstance.corpusChooser("selectItems", currentCorpora)
    })
})


korpApp.controller("headerCtrl", function($scope, $location, $uibModal, utils) {
    const s = $scope
    // SB: saves the current mode to use inf header.pug to write currently selected mode
    s.currMode = currentMode

    s.logoClick = function() {
        window.location = $scope.getUrl(currentMode)
        return window.location.reload()
    }


    s.citeClick = () => s.show_modal = 'about'

    s.contactClick = () => s.show_modal = 'contact'

    s.showLogin = () => s.show_modal = 'login'

    s.logout = function() {
        let corpus
        authenticationProxy.loginObj = {}
        $.jStorage.deleteKey("creds")

        // TODO figure out another way to do this
        for (const corpusObj of Array.from(settings.corpusListing.corpora)) {
            corpus = corpusObj.id
            if (corpusObj.limitedAccess) {
                $(`#hpcorpus_${corpus}`).closest(".boxdiv").addClass("disabled")
            }
        }
        $("#corpusbox").corpusChooser("updateAllStates")

        let newCorpora = []
        for (corpus of Array.from(settings.corpusListing.getSelectedCorpora())) {
            if (!settings.corpora[corpus].limitedAccess) {
                newCorpora.push(corpus)
            }
        }

        if (_.isEmpty(newCorpora)) {
            newCorpora = settings.preselectedCorpora
        }
        settings.corpusListing.select(newCorpora)
        s.loggedIn = false
        $("#corpusbox").corpusChooser("selectItems", newCorpora)
    }

    const N_VISIBLE = settings.visibleModes
    // SB: the number of versions of RMH
    const N_VISIBLE_RMH = settings.visibleModesRMH

    s.modes = _.filter(settings.modeConfig)
    if (!isLab) {
        s.modes = _.filter(settings.modeConfig, item => item.labOnly !== true)
    }

    s.visible_rmh = s.modes.slice(0, N_VISIBLE_RMH)
    s.visible = s.modes.slice(N_VISIBLE_RMH, N_VISIBLE)
    s.menu = s.modes.slice(N_VISIBLE)

    const i = $.inArray(currentMode, (_.map(s.menu, "mode")))
    if (i !== -1) {
        s.visible.push(s.menu[i])
        s.menu.splice(i, 1)
    }

    for (const mode of Array.from(s.modes)) {
        mode.selected = false
        if (mode.mode === currentMode) {
            mode.selected = true
        }
    }

    s.getUrl = function(modeId) {
        const langParam = `#?lang=${s.$root.lang}`
        if (modeId === "default") {
            return location.pathname + langParam
        }
        return location.pathname + `${modeId}` + langParam
    }

    s.show_modal = false

    let modal = null
    utils.setupHash(s, [{
        key: "display",
        scope_name: "show_modal",
        post_change(val) {
            c.log("post change", val)
            if (val) {
                return showModal(val)
            } else {
                c.log("post change modal", modal)
                if (modal != null) {
                    modal.close()
                }
                return modal = null
            }
        }
    }
    ])

    const closeModals = function() {
        s.login_err = false
        return s.show_modal = false
    }

    var showModal = function(key) {
        const tmpl = {
          about: require('../markup/about.html'),
          login: 'login_modal',
          contact: require('../markup/contact.html')
        }[key]
        const params = {
            templateUrl : tmpl,
            scope : s,
            windowClass : key
        }
        if (key === 'login') {
            params.size = 'sm'
        }
        modal = $uibModal.open(params)

        return modal.result.then(() => closeModals(), () => closeModals())
    }

    s.clickX = () => closeModals()

    s.loggedIn = false
    const creds = $.jStorage.get("creds")
    if (creds) {
        util.setLogin()
        s.loggedIn = true
        s.username = authenticationProxy.loginObj.name
    }
    return s.loginSubmit = function(usr, pass, saveLogin) {
        s.login_err = false
        return authenticationProxy.makeRequest(usr, pass, saveLogin).done(function(data) {
            util.setLogin()
            return safeApply(s, function() {
                s.show_modal = null
                s.restorePreLoginState()
                s.loggedIn = true
                return s.username = usr
        })
        }).fail(function() {
            c.log("login fail")
            return safeApply(s, () => s.login_err = true)
        })
    }
})


korpApp.filter("trust", $sce => input => $sce.trustAsHtml(input))
