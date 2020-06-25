/** @format */
window.view = {}
import jStorage from "../lib/jstorage"

//* *************
// Search view objects
//* *************

view.updateSearchHistory = function(value, href) {
    let needle
    const filterParam = url => {
        return $.grep(
            url.split("#")[1].split("&"),
            item => item.split("=")[0] === "search" || item.split("=")[0] === "corpus"
        ).join("&")
    }

    $("#search-history").empty()
    const searches = jStorage.get("searches") || []
    const searchLocations = $.map(searches, item => filterParam(item.location))
    if (value != null && !searchLocations.includes(filterParam(href))) {
        searches.splice(0, 0, {
            label: value,
            location: href
        })

        jStorage.set("searches", searches)
    }
    if (!searches.length) {
        return
    }
    const opts = $.map(searches, function(item) {
        const output = $("<option />", { value: item.location })
            .text(item.label)
            .get(0)
        return output
    })
    const placeholder = $("<option>")
        .localeKey("search-history")
        .get(0)
    const clear = $("<option class='clear'>").localeKey("search-history-clear")

    $("#search-history")
        .html(opts)
        .prepend(clear)
        .prepend(placeholder)
}
