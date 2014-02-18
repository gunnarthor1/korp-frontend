(function() {
  var korpApp;

  korpApp = angular.module('korpApp', ['ui.bootstrap', "template/tabs/tabset.html", "template/tabs/tab.html", "template/modal/backdrop.html", "template/modal/window.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html", "angularSpinner", "uiSlider", "ui.sortable", "pasvaz.bindonce"]);

  korpApp.run(function($rootScope, $location, utils, searches) {
    var isInit, s;
    s = $rootScope;
    s._settings = settings;
    s.lang = "sv";
    s.word_selected = null;
    s.isLab = window.isLab;
    s.sidebar_visible = false;
    s.activeCQP = "[]";
    s.search = function() {
      return $location.search.apply($location, arguments);
    };
    s._loc = $location;
    s.$watch("_loc.search()", function() {
      c.log("loc.search() change", $location.search());
      return _.defer(function() {
        return typeof window.onHashChange === "function" ? window.onHashChange() : void 0;
      });
    });
    $rootScope.kwicTabs = [];
    $rootScope.compareTabs = [];
    $rootScope.graphTabs = [];
    isInit = true;
    s.$on("corpuschooserchange", function(event, corpora) {
      var enableSearch, nonprotected;
      c.log("corpuschooserchange", corpora);
      settings.corpusListing.select(corpora);
      nonprotected = _.pluck(settings.corpusListing.getNonProtected(), "id");
      c.log("corpus change", corpora.length, _.intersection(corpora, nonprotected).length, nonprotected.length);
      if (corpora.length && _.intersection(corpora, nonprotected).length !== nonprotected.length) {
        $location.search("corpus", corpora.join(","));
      } else {
        $location.search("corpus", null);
      }
      if (corpora.length) {
        view.updateReduceSelect();
        view.updateContextSelect("within");
      }
      enableSearch = !!corpora.length;
      view.enableSearch(enableSearch);
      return isInit = false;
    });
    return searches.infoDef.then(function() {
      var corp_array, corpus, processed_corp_array;
      corpus = $location.search().corpus;
      if (corpus) {
        corp_array = corpus.split(",");
        processed_corp_array = [];
        settings.corpusListing.select(corp_array);
        $.each(corp_array, function(key, val) {
          return processed_corp_array = [].concat(processed_corp_array, getAllCorporaInFolders(settings.corporafolders, val));
        });
        corpusChooserInstance.corpusChooser("selectItems", processed_corp_array);
        return $("#select_corpus").val(corpus);
      }
    });
  });

  korpApp.controller("headerCtrl", function($scope, $location) {
    var N_VISIBLE, i, s;
    s = $scope;
    s.citeClick = function() {
      $location.search("display", "about");
      return onHashChange();
    };
    N_VISIBLE = settings.visibleModes;
    s.modes = _.filter(settings.modeConfig);
    if (!isLab) {
      s.modes = _.filter(settings.modeConfig, function(item) {
        return item.labOnly !== true;
      });
    }
    s.visible = s.modes.slice(0, N_VISIBLE);
    s.menu = s.modes.slice(N_VISIBLE);
    i = $.inArray(currentMode, _.pluck(s.menu, "mode"));
    if (i !== -1) {
      s.visible.push(s.menu[i]);
      s.menu.splice(i, 1);
    }
    s.select = function(modeId) {
      var mode, _i, _len, _ref, _results;
      _ref = s.modes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mode = _ref[_i];
        mode.selected = false;
        if (mode.mode === modeId) {
          _results.push(mode.selected = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    s.select(currentMode);
    return s.onSelect = function(modeId) {
      s.select(modeId);
      $location.search("corpus", null);
      if (modeId === "default") {
        return location.href = location.pathname;
      } else {
        return location.href = location.pathname + "?mode=" + modeId;
      }
    };
  });

}).call(this);
