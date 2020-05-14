/** @format */
window.view = {}

//* *************
// Search view objects
//* *************

view.updateSearchHistory = function(value, href) {
    let needle
    const filterParam = url =>
        $.grep(
            $.param.fragment(url).split("&"),
            item => item.split("=")[0] === "search" || item.split("=")[0] === "corpus"
        ).join("&")

    $("#search_history").empty()
    const searches = $.jStorage.get("searches") || []
    const searchLocations = $.map(searches, item => filterParam(item.location))
    if (value != null && !searchLocations.includes(filterParam(href))) {
        searches.splice(0, 0, {
            label: value,
            location: href
        })

        $.jStorage.set("searches", searches)
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
        .localeKey("search_history")
        .get(0)
    const clear = $("<option class='clear'>").localeKey("search_history_clear")

    $("#search_history")
        .html(opts)
        .prepend(clear)
        .prepend(placeholder)
}
