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

settings.corpora.althingi = {
    id: "mim_althingi",
    title: "TODO",
    context: defaultContext,
    description: "Ræður fluttar á Alþingi",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.baekur = {
    id: "mim_baekur",
    title: "TODO",
    context: defaultContext,
    description: "Textar úr prentuðum bókum",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.blogg = {
    id: "mim_blogg",
    title: "TODO",
    context: defaultContext,
    description: "Blogg",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.domar = {
    id: "mim_domar",
    title: "TODO",
    context: defaultContext,
    description: "Dómar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.frettablad = {
    id: "mim_frettablad",
    title: "TODO",
    context: defaultContext,
    description: "Fréttablaðið",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.log = {
    id: "mim_log",
    title: "TODO",
    context: defaultContext,
    description: "Frumvörp og lög af vef Alþingis",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.mbl_kvikmyndir = {
    id: "mim_mbl_kvikmyndir",
    title: "TODO",
    context: defaultContext,
    description: "Kvikmyndadómar úr Morgunblaðinu",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.moggi = {
    id: "mim_moggi",
    title: "TODO",
    context: defaultContext,
    description: "Morgunblaðið",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.raduneyti = {
    id: "mim_raduneyti",
    title: "TODO",
    context: defaultContext,
    description: "Skýrslur og greinagerðir af vefsetrum ráðuneyta",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.ritgerdir = {
    id: "mim_ritgerdir",
    title: "TODO",
    context: defaultContext,
    description: "Lokaritgerðir háskólastúdenta",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.ruv = {
    id: "mim_ruv",
    title: "TODO",
    context: defaultContext,
    description: "Fréttir útvarps og sjónvarps (RÚV)",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.sofnudir = {
    id: "mim_sofnudir",
    title: "TODO",
    context: defaultContext,
    description: "Safnaðarblöð",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.talmal = {
    id: "mim_talmal",
    title: "TODO",
    context: defaultContext,
    description: "Talmál",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.textavarp = {
    id: "mim_textavarp",
    title: "TODO",
    context: defaultContext,
    description: "Textavarp",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.timarit = {
    id: "mim_timarit",
    title: "TODO",
    context: defaultContext,
    description: "Prentuð tímarit af ýmsu tagi",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.tolvupostur = {
    id: "mim_tolvupostur",
    title: "TODO",
    context: defaultContext,
    description: "Tölvupóstlistar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.tonlist = {
    id: "mim_tonlist",
    title: "TODO",
    context: defaultContext,
    description: "Texti úr tónleikaskrám Sinfoníuhljómsveitar Íslands",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.upp = {
    id: "mim_upp",
    title: "TODO",
    context: defaultContext,
    description: "Efni til upplestrar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.vefmidlar = {
    id: "mim_vefmidlar",
    title: "TODO",
    context: defaultContext,
    description: "Vefmiðlar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.vefsetur = {
    id: "mim_vefsetur",
    title: "TODO",
    context: defaultContext,
    description: "Texti af vefsetrum fyrirtækja, samtaka og stofnana",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.veftimarit = {
    id: "mim_veftimarit",
    title: "TODO",
    context: defaultContext,
    description: "Veftímarit",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.verslo = {
    id: "mim_verslo",
    title: "TODO",
    context: defaultContext,
    description: "Stúdentsprófsritgerðir í íslensku",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};
settings.corpora.visindavefur = {
    id: "mim_visindavefur",
    title: "TODO",
    context: defaultContext,
    description: "Pistlar af Vísindavef",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: TODO
};

/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = [];


settings.corpusListing = new CorpusListing(settings.corpora);
