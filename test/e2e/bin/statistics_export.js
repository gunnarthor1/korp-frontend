(function() {
  describe("stats table export", function() {
    var waitFor;
    waitFor = function(elm) {
      browser.wait(function() {
        return elm.isPresent();
      });
      return browser.wait(function() {
        return elm.isDisplayed();
      });
    };
    xit("should be possible to get relative frequencies as CSV", function() {
      return browser.get(browser.params.url + "#?corpus=suc2,suc3&search=lemgram|gå..vb.1&result_tab=2").then(function() {
        var kindOfData, kindOfFormat;
        kindOfData = element(By.css("#kindOfData option:checked"));
        kindOfFormat = element(By.css("#kindOfFormat option:checked"));
        expect(kindOfData.getText()).toMatch(/Relativa.*/);
        expect(kindOfFormat.getText()).toMatch(/CSV.*/);
        element(By.css("#generateExportButton")).click();
        return element(By.css("#exportButton")).click();
      });
    }).pend("disabled because tests will succeed even though export fails");
    return xit("should be possible to get absolute frequencies as TSV with multiple reduce parameters", function() {
      return browser.get(browser.params.url + "#?result_tab=2&stats_reduce=word,msd,saldo&corpus=suc2,suc3&search=word|gå ut").then(function() {
        var kindOfData, kindOfFormat;
        kindOfData = element(By.css("#kindOfData option:checked"));
        kindOfFormat = element(By.css("#kindOfFormat option:checked"));
        expect(kindOfData.getText()).toMatch(/Relativa.*/);
        expect(kindOfFormat.getText()).toMatch(/CSV.*/);
        element(By.css("#generateExportButton")).click();
        return element(By.css("#exportButton")).click();
      });
    }).pend("disabled because tests will succeed even though export fails");
  });

}).call(this);

//# sourceMappingURL=statistics_export.js.map
