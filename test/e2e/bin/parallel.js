(function() {
  var waitFor;

  describe("parallel mode", function() {
    it("should perform a kwic search", function() {
      return browser.get(browser.params.url + "?mode=parallel#?stats_reduce=word&corpus=saltnld-sv&parallel_corpora=swe&cqp_swe=%5Bword%20%3D%20%22katt%22%5D&search=cqp%7C%5Bword%20%3D%20%22katt%22%5D&page=0").then(function() {
        var hits;
        waitFor(element(By.css("table.kwic")));
        hits = element(By.css(".results-kwic .num-result"));
        return expect(hits.getText()).toBe("54");
      });
    });
    it("should show a linked sentence", function() {
      return browser.get(browser.params.url + "?mode=parallel#?stats_reduce=word&corpus=saltnld-sv&parallel_corpora=swe&cqp_swe=%5Bword%20%3D%20%22katt%22%5D&search=cqp%7C%5Bword%20%3D%20%22katt%22%5D&page=0").then(function() {
        var linked;
        waitFor(element(By.css("table.kwic")));
        linked = element(By.css("table.kwic tr:nth-child(3) > td.lnk"));
        return expect(linked.getText()).toBe("Honden en katten en ongewassen mensen .");
      });
    });
    return it("should perform a statistics search", function() {
      return browser.get(browser.params.url + "?mode=parallel#?stats_reduce=word&corpus=saltnld-sv&parallel_corpora=swe&cqp_swe=%5Bword%20%3D%20%22katt%22%5D&search=cqp%7C%5Bword%20%3D%20%22katt%22%5D&result_tab=2").then(function() {
        var hits;
        browser.sleep(1000);
        hits = element(By.css("#myGrid > div.slick-viewport > div > div.ui-widget-content.slick-row.odd > div.slick-cell.l3.r3 > span > span.relStat"));
        return expect(hits.getText()).toBe("39,6");
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

//# sourceMappingURL=parallel.js.map
