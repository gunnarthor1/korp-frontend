describe "lemgram autocomplete", () ->

    it "should show for default mode", () ->
        browser.get(browser.params.url).then () ->
            input = element.all(By.css "#simple_text input").first()
            input.sendKeys "gå"
            
            autocompleteMenu = element(By.css 'ul.dropdown-menu')
            expect(autocompleteMenu.isDisplayed()).toBe true

describe "lemgram suggestions", () ->
    
    it "should be clickable and show correct output", () ->
        browser.get(browser.params.url + "#?corpus=suc2").then () ->
            input = element.all(By.css "#simple_text input").first()
            input.sendKeys "gå"
            
            lemgramSuggestion = (element.all By.css 'ul.dropdown-menu > li').first()
            waitFor lemgramSuggestion
            lemgramSuggestion.click()
            
            expect(input.getText()).toBe ""
            expect(input.getAttribute "placeholder").toBe "gå (verb)"
            
            submitBtn = element(By.id "sendBtn")
            submitBtn.click()
            
            waitFor element By.css "table.kwic"
            
            hits = element By.css ".results-kwic .num-result"
            expect(hits.getText()).toBe "2 502"

waitFor = (elm) ->
    browser.wait () ->
        return elm.isPresent()
    browser.wait () ->
        return elm.isDisplayed()
