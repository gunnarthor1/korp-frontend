(function() {
  var EC, cycleSearch, i, waitFor;

  waitFor = function(elm) {
    browser.wait(function() {
      return elm.isPresent();
    });
    return browser.wait(function() {
      return elm.isDisplayed();
    });
  };

  i = 0;

  cycleSearch = function() {
    var list;
    i++;
    list = ["gå", "ha", "ta", "ska"];
    return list[i] || list[i = 0];
  };

  EC = protractor.ExpectedConditions;

  describe("page", function() {
    var elm;
    elm = null;
    beforeEach(function() {
      browser.ignoreSynchronization = true;
      return browser.get(browser.params.url + ("#?corpus=suc2&cqp=%5B%5D&search=word%7C" + (cycleSearch()) + "&page=7")).then(function() {
        elm = element(By.css(".results-kwic .pager-wrapper:nth-child(2) .active a"));
        return waitFor(elm);
      });
    });
    it("should should bring up the correct page", function() {
      expect(elm.getText()).toBe("8");
      return expect(browser.executeScript("return locationSearch().page")).toBe(7);
    });
    it("should page to the correct page", function() {
      element(By.css(".results-kwic .pagination li:nth-last-child(2)")).click();
      return expect(EC.textToBePresentInElement(elm, "9"));
    });
    it("should go back to 0 when searching anew", function() {
      var input;
      input = element(By.model('textInField'));
      input.sendKeys("gå");
      input.sendKeys(protractor.Key.ENTER);
      return expect(browser.executeScript("return locationSearch().page")).toBe(0);
    });
    return it("should should use the correct start/end values", function() {
      expect(browser.executeScript("return kwicResults.proxy.prevParams.start")).toBe(175);
      return expect(browser.executeScript("return kwicResults.proxy.prevParams.end")).toBe(199);
    });
  });

  describe("json button", function() {
    var elm;
    elm = null;
    beforeEach(function() {
      return browser.ignoreSynchronization = true;
    });
    it("should display the correct url", function() {
      var wd;
      wd = cycleSearch();
      return browser.get(browser.params.url + ("#?corpus=suc2&cqp=%5B%5D&search=word%7C" + wd + "&page=7")).then(function() {
        elm = element(By.css("#json-link"));
        waitFor(elm);
        return expect(elm.getAttribute("href")).toContain("?command=query");
      });
    });
    return it("should switch url when changing tab", function() {
      var wd;
      wd = cycleSearch();
      return browser.get(browser.params.url + ("#?corpus=suc2&cqp=%5B%5D&search=word%7C" + wd + "&page=7")).then(function() {
        var elem;
        elem = element(By.css(".result_tabs > ul > li:nth-child(2)"));
        waitFor(elem);
        elem.click();
        elm = element(By.css("#json-link"));
        waitFor(elm);
        return expect(elm.getAttribute("href")).toContain("?command=count");
      });
    });
  });

  describe("kwic download menu", function() {
    return it("should show the csv download option", function() {
      return browser.get(browser.params.url + "#?corpus=suc2,suc3&search=lemgram|gå..vb.1&result_tab=2").then(function() {
        return expect(element(By.cssContainingText('option', 'CSV')).isPresent()).toBe(true);
      });
    });
  });

}).call(this);

//# sourceMappingURL=misc.js.map
