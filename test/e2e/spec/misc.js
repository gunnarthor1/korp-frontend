waitFor = (elm) ->
    browser.wait () ->
        return elm.isPresent()
    browser.wait () ->
        return elm.isDisplayed()

i = 0
cycleSearch = () ->
    i++
    list = ["gå", "ha", "ta", "ska"]
    return list[i] or list[i=0]

EC = protractor.ExpectedConditions

describe "page", () ->
    elm = null
    
    beforeEach () ->
        browser.ignoreSynchronization = true
        browser.get(browser.params.url + "#?corpus=suc2&cqp=%5B%5D&search=word%7C#{cycleSearch()}&page=7").then () ->
            elm = element(By.css(".results-kwic .pager-wrapper:nth-child(2) .active a"))
            waitFor(elm)

    it "should should bring up the correct page", () ->
        expect(elm.getText()).toBe "8"
        expect(browser.executeScript("return locationSearch().page")).toBe 7

    it "should page to the correct page", () ->
        element(By.css(".results-kwic .pagination li:nth-last-child(2)")).click()
        expect(EC.textToBePresentInElement(elm, "9"))

    it "should go back to 0 when searching anew", () ->
        input = element.all(By.model('textInField')).first()
        input.clear()
        input.sendKeys("gå")
        input.sendKeys(protractor.Key.ENTER)  
        expect(browser.executeScript("return locationSearch().page")).toBe 0

    it "should should use the correct start/end values", () ->
        expect(browser.executeScript("return kwicResults.proxy.prevParams.start")).toBe 175
        expect(browser.executeScript("return kwicResults.proxy.prevParams.end")).toBe 199


describe "json button", () ->
    elm = null

    beforeEach () ->
        browser.ignoreSynchronization = true

    it "should display the correct url", () ->
        wd = cycleSearch()
        browser.get(browser.params.url + "#?corpus=suc2&cqp=%5B%5D&search=word%7C#{wd}&page=7").then () ->
            elm = element By.css("#json-link")
            waitFor elm
            expect(elm.getAttribute("href")).toContain "?command=query"
    
    it "should switch url when changing tab", () ->
        wd = cycleSearch()
        browser.get(browser.params.url + "#?corpus=suc2&cqp=%5B%5D&search=word%7C#{wd}&page=7").then () ->

            elem = element By.css(".result_tabs > ul > li:nth-child(2)")
            waitFor elem
            elem.click()
            
            elm = element By.css("#json-link")
            waitFor elm
            expect(elm.getAttribute("href")).toContain "?command=count"


describe "kwic download menu", () ->
    # would love to test that download is really performed but it's hard to test side effects...
    it "should show the csv download option", () ->
        browser.get(browser.params.url + "#?corpus=suc2,suc3&search=lemgram|gå..vb.1&result_tab=2").then () ->
            expect(element(By.cssContainingText('option', 'CSV')).isPresent()).toBe(true)
        
