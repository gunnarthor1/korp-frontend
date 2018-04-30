(function() {
  var waitFor;

  describe("lemgram autocomplete", function() {
    return it("should show for default mode", function() {
      return browser.get(browser.params.url).then(function() {
        var autocompleteMenu, input;
        input = element(By.css("#simple_text input"));
        input.sendKeys("gå");
        autocompleteMenu = element(By.css('ul.dropdown-menu'));
        return expect(autocompleteMenu.isDisplayed()).toBe(true);
      });
    });
  });

  describe("lemgram suggestions", function() {
    return it("should be clickable and show correct output", function() {
      return browser.get(browser.params.url + "#?corpus=suc2").then(function() {
        var hits, input, lemgramSuggestion, submitBtn;
        input = element(By.css("#simple_text input"));
        input.sendKeys("gå");
        lemgramSuggestion = (element.all(By.css('ul.dropdown-menu > li'))).first();
        waitFor(lemgramSuggestion);
        lemgramSuggestion.click();
        expect(input.getText()).toBe("");
        expect(input.getAttribute("placeholder")).toBe("gå (verb)");
        submitBtn = element(By.id("sendBtn"));
        submitBtn.click();
        waitFor(element(By.css("table.kwic")));
        hits = element(By.css(".results-kwic .num-result"));
        return expect(hits.getText()).toBe("2 502");
      });
    });
  });

  waitFor = function(elm) {
    browser.wait(function() {
      return elm.isPresent();
    });
    return browser.wait(function() {
      return elm.isDisplayed();
    });
  };

}).call(this);

//# sourceMappingURL=autocomplete.js.map
