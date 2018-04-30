(function() {
  var getMapElem, getMapsHits, getMarkers, waitFor;

  xdescribe("map", function() {
    it("should show the correct markers", function() {
      return browser.get(browser.params.url + "#?lang=sv&cqp=%5B%5D&corpus=suc2&page=0&show_map&search=lemgram%7Cskog..nn.1&result_tab=1").then(function() {
        expect(getMarkers().count()).toBe(7);
        return expect(getMapsHits()).toBe('7');
      });
    });
    it("should not display map when there are 0 hits", function() {
      return browser.get(browser.params.url + "#?lang=sv&cqp=%5B%5D&corpus=suc2&show_map&search=word%7Ctall&result_tab=1").then(function() {
        return browser.get(browser.params.url + "#?lang=sv&cqp=%5B%5D&corpus=suc2&show_map&search=word%7Ctall&result_tab=1").then(function() {
          browser.sleep(1000);
          expect(getMapsHits()).toBe('0');
          return element.all(By.css(".angular-leaflet-map")).then(function(items) {
            return expect(items.length).toBe(0);
          });
        });
      });
    });
    return it("should be possible to click the markers and get a link to the kwic search", function() {
      return browser.get(browser.params.url + "#?lang=sv&cqp=%5B%5D&corpus=suc2&page=0&show_map&search=lemgram%7Cskog..nn.1&result_tab=1").then(function() {
        var marker, popup;
        marker = getMarkers().last();
        marker.click();
        popup = element(By.css(".hover-info"));
        waitFor(popup);
        return popup.click();
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

  getMapElem = function() {
    return element(By.css(".map"));
  };

  getMarkers = function() {
    waitFor(getMapElem());
    return element.all(By.css(".map .leaflet-marker-icon"));
  };

  getMapsHits = function() {
    var hitSpan, mapDiv;
    mapDiv = element(By.css("#mapTab"));
    waitFor(mapDiv);
    hitSpan = (element.all(By.css("#mapHits span"))).last();
    return hitSpan.getText();
  };

}).call(this);

//# sourceMappingURL=map.js.map
