settings.corpora = {};
settings.corporafolders = {};

settings.globalFilterCorpora = ["ivip"];

settings.primaryColor = "#FFF3D8";
settings.primaryLight = "#FFF9EE";

settings.hitsPerPageDefault = 25;
settings.hitsPerPageValues = [10,25,50,75,100,500,1000];
settings.contextValues = {
    5:"5 words",
    7:"7 words",
    10:"10 words",
    15:"15 words",
    20:"20 words"
};
settings.contextDefault = settings.contextValues[7];

settings.inputCaseInsensitiveDefault = true;

settings.corpora.otb_aevis = {
    id: "otb_aevis",
    title: "Ævisögur og endurminningar",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};
settings.corpora.otb_barnis = {
    id: "otb_barnis",
    title: "Íslenskar barna- og unglingabækur",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};
settings.corpora.otb_nythug = {
    id: "otb_nythug",
    title: "Fræðslutextar á sviði hug- og félagsvísinda",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};
settings.corpora.otb_nytraun = {
    id: "otb_nytraun",
    title: "Fræðslutextar á sviði raunvísinda",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};
settings.corpora.otb_skaldis = {
    id: "otb_skaldis",
    title: "Íslensk skáldverk",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};
settings.corpora.otb_barnth = {
    id: "otb_barnth",
    title: "Þýddar barna- og unglingabækur",
    context: defaultContext,
    description: "Fréttablaðið",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};
settings.corpora.otb_skaldth = {
    id: "otb_skaldth",
    title: "Þýdd skáldverk",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: otbSattrs
};

/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = [];


settings.corpusListing = new CorpusListing(settings.corpora);
