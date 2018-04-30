
var isLab = window.isLab || false;

settings.autocomplete = false;
settings.enableMap = !isLab;
settings.mapPosTag = ["PM", "NNP", "NNPS"]
settings.newMapEnabled = isLab;
settings.hitsPerPageDefault = 25
settings.hitsPerPageValues = [25,50,75,100,500,1000]
settings.enableBackendKwicDownload = false
settings.enableFrontendKwicDownload = true

settings.languages = ["sv", "en", "is-is"];
settings.defaultLanguage = "is-is";

settings.downloadFormats = [
    "csv",
    "tsv",
    "annot",
    "ref",
];

settings.downloadFormatParams = {
    "*": {
        structs: "+"
    },
    "ref": {
        format: "bibref,xls"
    },
    "csvp": {
        format: "tokens,csv",
        attrs: "+,-lex",
        match_marker: "***"
    },
    "csv": {
        format: "sentences,csv"
    },
    "annot": {
        format: "tokens,xls",
        attrs: "+,-lex",
        match_marker: "***"
    },
    "nooj": {
        attrs: "+"
    },
    "tsv": {
        format: "sentences,tsv"
    },
    "vrt": {
        attrs: "+"
    },
};

// for extended search dropdown, can be 'union' or 'intersection'
settings.wordAttributeSelector = "union";
settings.structAttributeSelector = "union";

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduceWordAttributeSelector = "intersection";
settings.reduceStructAttributeSelector = "intersection";

settings.filterSelection = "intersection"

settings.newsDeskUrl = "https://svn.spraakdata.gu.se/sb-arkiv/pub/component_news/json/korpnews.json";

settings.wordpictureTagset = {
    // supported pos-tags
    verb: "vb",

    noun: "nn",
    adjective: "jj",
    adverb: "ab",
    preposition: "pp",

    // dependency releations
    subject: "ss",
    object: "obj",
    adverbial: "adv",
    preposition_rel: "pa",
    pre_modifier: "at",
    post_modifier: "et",
    adverbial2: "aa"
}


settings.wordPictureConf = {
    verb: [[
        {rel: "subject", css_class: "color-blue"},
        "_",
        {rel: "object", css_class: "color-purple"},
        {rel: "adverbial", css_class: "color-green"}
    ]],
    noun: [
        [{rel: "preposition_rel", css_class: "color-yellow", field_reverse: true},
         {rel: "pre_modifier", css_class: "color-azure"},
         "_",
         {rel: "post_modifier", css_class: "color-red"}],

        ["_", {rel: "subject", css_class: "color-blue", field_reverse: true, alt_label: "vb"}],
        [{rel: "object", css_class: "color-purple", field_reverse: true, alt_label: "vb"}, "_"]
    ],
    adjective: [
        ["_", {rel: "pre_modifier", css_class: "color-yellow", field_reverse: true}],
        [{rel: "adverbial2", css_class: "color-purple"}, "_"]
    ],
    adverb: [
        ["_", {rel: "adverbial", css_class: "color-yellow", field_reverse: true}],
        ["_", {rel: "adverbial2", css_class: "color-purple", field_reverse: true}]
    ],
    preposition: [["_", {rel: "preposition_rel", css_class: "color-green"}]]

}

settings.visibleModes = 6
settings.modeConfig = [
    {
        localekey: "risamalheild2017",
        mode: "default"
    },
    {
        localekey: "fornrit",
        mode: "fornrit"
    },
    {
        localekey: "mim",
        mode: "mim"
    },
    {
        localekey: "otb",
        mode: "otb"
    }//,
    // {
    //     localekey: "parallel_texts",
    //     mode: "parallel"
    // }
];

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";

settings.defaultOverviewContext = "7 words"
settings.defaultReadingContext = "1 paragraph"

settings.defaultWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph",
    "text": "text"
};

// for optimization purposes
settings.cqpPrio = [
    'pos',
    "fall",
    "kyn",
    "tala",
    "pers",
    "lostig",
    "mynd",
    "hattur",
    "tid",
    "fsfall",
    "greinir",
    "sernafn",
    "tob",
    "fnf",
    "lob",
    "ft",
    "stf",
    "lemma",
    'word',
    "tt",
];

settings.defaultOptions = {
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "contains": "_=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}

settings.korpBackendURL = "http://130.208.178.108/cgi-bin/korp.cgi";
settings.downloadCgiScript = "https://ws.spraakbanken.gu.se/ws/korp/download";

settings.mapCenter = {
  lat: 62.99515845212052,
  lng: 16.69921875,
  zoom: 4
};
