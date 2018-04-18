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

settings.corpora.mim_althingi = {
    id: "mim_althingi",
    title: "Alþingi",
    context: defaultContext,
    description: "Ræður fluttar á Alþingi",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_baekur = {
    id: "mim_baekur",
    title: "Bækur",
    context: defaultContext,
    description: "Textar úr prentuðum bókum",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_blogg = {
    id: "mim_blogg",
    title: "Blogg",
    context: defaultContext,
    description: "Blogg",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_domar = {
    id: "mim_domar",
    title: "Dómar",
    context: defaultContext,
    description: "Dómar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_frettablad = {
    id: "mim_frettablad",
    title: "Fréttablaðið",
    context: defaultContext,
    description: "Fréttablaðið",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_log = {
    id: "mim_log",
    title: "Lög",
    context: defaultContext,
    description: "Frumvörp og lög af vef Alþingis",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_mbl_kvikmyndir = {
    id: "mim_mbl_kvikmyndir",
    title: "Kvikmyndadómar Mbl",
    context: defaultContext,
    description: "Kvikmyndadómar úr Morgunblaðinu",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_moggi = {
    id: "mim_moggi",
    title: "Morgumblaðið",
    context: defaultContext,
    description: "Morgunblaðið",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_raduneyti = {
    id: "mim_raduneyti",
    title: "Ráðuneyti",
    context: defaultContext,
    description: "Skýrslur og greinagerðir af vefsetrum ráðuneyta",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_ritgerdir = {
    id: "mim_ritgerdir",
    title: "Ritgerðiðr",
    context: defaultContext,
    description: "Lokaritgerðir háskólastúdenta",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_ruv = {
    id: "mim_ruv",
    title: "Rúv",
    context: defaultContext,
    description: "Fréttir útvarps og sjónvarps (RÚV)",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_sofnudir = {
    id: "mim_sofnudir",
    title: "Safnaðarblöð",
    context: defaultContext,
    description: "Safnaðarblöð",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_talmal = {
    id: "mim_talmal",
    title: "Talmál",
    context: defaultContext,
    description: "Talmál",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_textavarp = {
    id: "mim_textavarp",
    title: "Textavarp",
    context: defaultContext,
    description: "Textavarp",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_timarit = {
    id: "mim_timarit",
    title: "Tímarit",
    context: defaultContext,
    description: "Prentuð tímarit af ýmsu tagi",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_tolvupostur = {
    id: "mim_tolvupostur",
    title: "Tölvupóstur",
    context: defaultContext,
    description: "Tölvupóstlistar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
// settings.corpora.mim_tonlist = {
//     id: "mim_tonlist",
//     title: "Tónleikaskrár",
//     context: defaultContext,
//     description: "Texti úr tónleikaskrám Sinfoníuhljómsveitar Íslands",
//     within: {
//         "paragraph": "paragraph",
//         "sentence": "sentence",
//         "text": "text"
//     },
//     attributes: icelandicAttrs,
//     structAttributes: mimSattrs
// };
settings.corpora.mim_upp = {
    id: "mim_upp",
    title: "Upplestur",
    context: defaultContext,
    description: "Efni til upplestrar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_vefmidlar = {
    id: "mim_vefmidlar",
    title: "Vefmiðlar",
    context: defaultContext,
    description: "Vefmiðlar",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_vefsetur = {
    id: "mim_vefsetur",
    title: "Ýmis vefsetur",
    context: defaultContext,
    description: "Texti af vefsetrum fyrirtækja, samtaka og stofnana",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_veftimarit = {
    id: "mim_veftimarit",
    title: "Veftímarit",
    context: defaultContext,
    description: "Veftímarit",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_verslo = {
    id: "mim_verslo",
    title: "Menntaskólaritgerðir",
    context: defaultContext,
    description: "Stúdentsprófsritgerðir í íslensku",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};
settings.corpora.mim_visindavefur = {
    id: "mim_visindavefur",
    title: "Vísindavefurinn",
    context: defaultContext,
    description: "Pistlar af Vísindavefnum",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: mimSattrs
};

/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = [];


settings.corpusListing = new CorpusListing(settings.corpora);
