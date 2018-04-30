(function() {
  describe("compare", function() {
    var getCompareTabHeading, saveSearch, selectLemgram, waitFor;
    waitFor = function(elm) {
      browser.wait(function() {
        return elm.isPresent();
      });
      return browser.wait(function() {
        return elm.isDisplayed();
      });
    };
    selectLemgram = function(word) {
      var input, lemgramSuggestion;
      input = element(By.css("#simple_text input"));
      input.clear();
      input.sendKeys(word);
      lemgramSuggestion = (element.all(By.css('ul.dropdown-menu > li'))).first();
      waitFor(lemgramSuggestion);
      return lemgramSuggestion.click();
    };
    saveSearch = function(name) {
      var input;
      element(By.css(".search_submit .opener")).click();
      input = element(By.css("#cmp_input"));
      input.sendKeys(name);
      return element(By.css(".popover.compare.bottom .btn")).click();
    };
    getCompareTabHeading = function() {
      return (element.all(By.css(".search_tabs .nav-tabs li"))).last();
    };
    it("should be possible to save searches", function() {
      return browser.get(browser.params.url + "#?corpus=suc2").then(function() {
        var compareTabHeading;
        selectLemgram("gå");
        saveSearch("gå");
        compareTabHeading = getCompareTabHeading();
        expect(compareTabHeading.getText()).toBe("Jämförelse 1");
        selectLemgram("springa");
        saveSearch("springa");
        return expect(compareTabHeading.getText()).toBe("Jämförelse 2");
      });
    });
    return it("should work for simple word comparison", function() {
      return browser.get(browser.params.url + "#?corpus=suc2").then(function() {
        var negativeMeters, positiveMeters;
        selectLemgram("gå");
        saveSearch("gå");
        selectLemgram("springa");
        saveSearch("springa");
        getCompareTabHeading().click();
        (element.all(By.css(".search_compare button"))).last().click();
        negativeMeters = element.all(By.css(".compare_result .negative li"));
        positiveMeters = element.all(By.css(".compare_result .positive li"));
        negativeMeters.first().getText().then(function(text) {
          return expect(text.replace(/\n/g, " ")).toBe("går 879");
        });
        return positiveMeters.first().getText().then(function(text) {
          return expect(text.replace(/\n/g, " ")).toBe("sprang 45");
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=compare.js.map
