(function() {
  describe("stats table", function() {
    var waitFor;
    waitFor = function(elm) {
      browser.wait(function() {
        return elm.isPresent();
      });
      return browser.wait(function() {
        return elm.isDisplayed();
      });
    };
    it("should show the correct rows and columns", function() {
      return browser.get(browser.params.url + "#?corpus=suc2,suc3&search=lemgram|gå..vb.1&result_tab=2").then(function() {
        var columns, rows;
        rows = element.all(By.css('.slick-row'));
        browser.sleep(1000);
        expect(rows.count()).toBe(10);
        columns = element.all(By.css('.slick-column-name'));
        expect(columns.get(1).getText()).toBe("ord");
        expect(columns.get(3).getText()).toBe("Totalt");
        expect(columns.get(4).getText()).toBe("SUC 2.0");
        return expect(columns.get(5).getText()).toBe("SUC 3.0");
      });
    });
    it("should return expected  results for reduce on word", function() {
      return browser.get(browser.params.url + "#?corpus=suc2,suc3&search=lemgram|gå..vb.1&result_tab=2").then(function() {
        var rows;
        rows = element.all(By.css('.slick-row'));
        browser.sleep(1000);
        rows.get(0).getText().then(function(text) {
          return expect(text.replace(/\n/g, " ")).toBe("Σ 2 145,1 (5 005) 2 144,7 (2 502) 2 145,6 (2 503)");
        });
        return rows.get(4).getText().then(function(text) {
          return expect(text.replace(/\n/g, " ")).toBe("gått 206,6 (482) 206,6 (241) 206,6 (241)");
        });
      });
    });
    it("should work to open arc diagram with the correct result", function() {
      return browser.get(browser.params.url + "#?corpus=suc2,suc3&search=lemgram|gå..vb.1&result_tab=2&stats_reduce=lemma").then(function() {
        var arcDiagramButtons, pieDiv;
        browser.sleep(1000);
        arcDiagramButtons = element.all(By.css('.slick-row .arcDiagramPicture'));
        expect(arcDiagramButtons.count()).toBe(3);
        arcDiagramButtons.get(0).click();
        pieDiv = element(By.css('#pieDiv'));
        expect(pieDiv.isDisplayed()).toBe(true);
        expect((element(By.css('#pieDiv .radioList_selected'))).getText()).toBe("Relativa frekvenser");
        element(By.css('#pieDiv [data-mode=absolute]')).click();
        return expect((element(By.css('#pieDiv .radioList_selected'))).getText()).toBe("Absoluta frekvenser");
      });
    });
    it("should be possible to do a KWIC search on the rows, multi-word", function() {
      return browser.get(browser.params.url + "#?result_tab=2&stats_reduce=saldo&corpus=suc2,suc3&search=word|gå ut").then(function() {
        var rows;
        browser.sleep(500);
        return rows = element.all(By.css('.slick-row .link'));
      });
    });
    return it("should be possible to reduce on more than one attribute", function() {
      return browser.get(browser.params.url + "#?result_tab=2&stats_reduce=word,msd,lex&corpus=suc2,suc3&search=word|gå ut").then(function() {
        var columns, rows, table;
        table = element(By.css("#myGrid"));
        waitFor(table);
        browser.sleep(1000);
        columns = element.all(By.css('.slick-column-name'));
        expect(columns.get(1).getText()).toBe("ord");
        expect(columns.get(2).getText()).toBe("msd");
        expect(columns.get(3).getText()).toBe("lemgram");
        expect(columns.get(5).getText()).toBe("Totalt");
        expect(columns.get(6).getText()).toBe("SUC 2.0");
        expect(columns.get(7).getText()).toBe("SUC 3.0");
        rows = element.all(By.css('.slick-row'));
        return rows.get(0).getText().then(function(text) {
          return expect(text.replace(/\n/g, " ")).toBe("Σ Σ Σ 140,6 (328) 140,6 (164) 140,6 (164)");
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=statistics.js.map
