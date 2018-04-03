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

settings.corporafolders.islendingasogur = {
    title: "Íslendingasögur",
    contents: []
};
settings.corporafolders.islendingasogur.a_g = {
    title: "A-G",
    contents: [
        "bandamanna_saga_konungsbok",
        "bardar_saga_snaefellsass",
        "bjarnar_saga_hitdaelakappa",
        "brennu_njals_saga",
        "droplaugarsona_saga",
        "egils_saga_skalla_grimssonar",
        "eiriks_saga_rauda",
        "eyrbyggja_saga",
        "finnboga_saga_ramma",
        "fljotsdaela_saga",
        "floamanna_saga",
        "fostbraedra_saga",
        "gisla_saga_surssonar_lengri_gerd",
        "gisla_saga_surssonar_styttri_gerd",
        "grettis_saga_asmundarsonar",
        "graenlendinga_saga",
        "graenlendinga_thattur",
        "gull_thoris_saga",
        "gunnars_saga_keldugnupsfifls",
        "gunnlaugs_saga_ormstungu",
    ]
};
settings.corporafolders.islendingasogur.h_oe = {
    title: "H-Ö",
    contents: [
        "hallfredar_saga_eftir_modruvallabok",
        "hallfredar_saga_ur_olafs_sogu_tryggvasonar_hinni_mestu",
        "hardar_saga_og_holmverja",
        "havardar_saga_isfirdings",
        "heidarviga_saga",
        "hrafnkels_saga_freysgoda",
        "haensna_thoris_saga",
        "islendinga_thaettir",
        "jokuls_thattur_buasonar",
        "kjalnesinga_saga",
        "kormaks_saga",
        "kroka_refs_saga",
        "laxdaela_saga",
        "ljosvetninga_saga_a_gerd",
        "ljosvetninga_saga_c_gerd",
        "reykdaela_saga",
        "svarfdaela_saga",
        "valla_ljots_saga",
        "vatnsdaela_saga",
        "viga_glums_saga",
        "viglundar_saga",
        "vopnfirdinga_saga",
        "thorsteins_saga_hvita",
        "thorsteins_saga_sidu_hallssonar",
        "thordar_saga_hredu",
        "olkofra_saga"
    ]
};

settings.corpora.bandamanna_saga_konungsbok = {
    id: "bandamanna_saga_konungsbok",
    title: "Bandamanna saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.bardar_saga_snaefellsass = {
    id: "bardar_saga_snaefellsass",
    title: "Bárðar saga Snæfelsáss",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.bjarnar_saga_hitdaelakappa = {
    id: "bjarnar_saga_hitdaelakappa",
    title: "Bjarnar saga Hítdælakappa",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.brennu_njals_saga = {
    id: "brennu_njals_saga",
    title: "Brennu-Njáls saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.droplaugarsona_saga = {
    id: "droplaugarsona_saga",
    title: "Droplaugarsona saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.egils_saga_skalla_grimssonar = {
    id: "egils_saga_skalla_grimssonar",
    title: "Egils saga Skalla-Grímssonar",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.eiriks_saga_rauda = {
    id: "eiriks_saga_rauda",
    title: "Eiríks saga rauða",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.eyrbyggja_saga = {
    id: "eyrbyggja_saga",
    title: "Eyrbyggja saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.finnboga_saga_ramma = {
    id: "finnboga_saga_ramma",
    title: "Finnboga saga ramma",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.fljotsdaela_saga = {
    id: "fljotsdaela_saga",
    title: "Fljótsdæla saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.floamanna_saga = {
    id: "floamanna_saga",
    title: "Flóamanna saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.fostbraedra_saga = {
    id: "fostbraedra_saga",
    title: "Fóstbræðra saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.gisla_saga_surssonar_lengri_gerd = {
    id: "gisla_saga_surssonar_lengri_gerd",
    title: "Gísla saga Súrssonar (lengri gerð)",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.gisla_saga_surssonar_styttri_gerd = {
    id: "gisla_saga_surssonar_styttri_gerd",
    title: "Gísla saga Súrssonar (styttri gerð)",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.graenlendinga_saga = {
    id: "graenlendinga_saga",
    title: "Grænlendinga saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.graenlendinga_thattur = {
    id: "graenlendinga_thattur",
    title: "Grænlendinga þáttur",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.grettis_saga_asmundarsonar = {
    id: "grettis_saga_asmundarsonar",
    title: "Grettis saga Ásmundarsonar",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.gull_thoris_saga = {
    id: "gull_thoris_saga",
    title: "Gull-Þóris saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.gunnars_saga_keldugnupsfifls = {
    id: "gunnars_saga_keldugnupsfifls",
    title: "Gunnars saga Keldugnúpsfífls",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.gunnlaugs_saga_ormstungu = {
    id: "gunnlaugs_saga_ormstungu",
    title: "Gunnlaugs saga ormstungu",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.hallfredar_saga_eftir_modruvallabok = {
    id: "hallfredar_saga_eftir_modruvallabok",
    title: "Hallfreðar saga (eftir Möðruvallabók)",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.hallfredar_saga_ur_olafs_sogu_tryggvasonar_hinni_mestu = {
    id: "hallfredar_saga_ur_olafs_sogu_tryggvasonar_hinni_mestu",
    title: "Hallfreðar saga (úr Ólafs sögu Tryggvasonar hinni mestu)",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.hardar_saga_og_holmverja = {
    id: "hardar_saga_og_holmverja",
    title: "Harðar saga og Hólmverja",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.havardar_saga_isfirdings = {
    id: "havardar_saga_isfirdings",
    title: "Hávarðar saga Ísfirðings",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.heidarviga_saga = {
    id: "heidarviga_saga",
    title: "Heiðarvíga saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.haensna_thoris_saga = {
    id: "haensna_thoris_saga",
    title: "Hænsna-Þóris saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.heimskringla = {
    id: "heimskringla",
    title: "Heimskringla",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.hrafnkels_saga_freysgoda = {
    id: "hrafnkels_saga_freysgoda",
    title: "Hrafnkels saga Freysgoða",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.islendinga_thaettir = {
    id: "islendinga_thaettir",
    title: "Íslendinga þættir",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.jokuls_thattur_buasonar = {
    id: "jokuls_thattur_buasonar",
    title: "Jökuls þáttur Búasonar",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.kjalnesinga_saga = {
    id: "kjalnesinga_saga",
    title: "Kjalnesinga saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.kormaks_saga = {
    id: "kormaks_saga",
    title: "Kormáks saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.kroka_refs_saga = {
    id: "kroka_refs_saga",
    title: "Króka-Refs saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.landnamabok_sturlubok = {
    id: "landnamabok_sturlubok",
    title: "Landnámabók - Sturlubók",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.laxdaela_saga = {
    id: "laxdaela_saga",
    title: "Laxdæla saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.ljosvetninga_saga_a_gerd = {
    id: "ljosvetninga_saga_a_gerd",
    title: "Ljósvetninga saga (A-gerð)",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.ljosvetninga_saga_c_gerd = {
    id: "ljosvetninga_saga_c_gerd",
    title: "Ljósvetninga saga (c-gerð)",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.olkofra_saga = {
    id: "olkofra_saga",
    title: "Ölkofra saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.reykdaela_saga = {
    id: "reykdaela_saga",
    title: "Reykdæla saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.sturlunga = {
    id: "sturlunga",
    title: "Sturlunga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.svarfdaela_saga = {
    id: "svarfdaela_saga",
    title: "Svarfdæla saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.thordar_saga_hredu = {
    id: "thordar_saga_hredu",
    title: "Þórðar saga hreðu",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.thorsteins_saga_hvita = {
    id: "thorsteins_saga_hvita",
    title: "Þorsteins saga hvíta",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.thorsteins_saga_sidu_hallssonar = {
    id: "thorsteins_saga_sidu_hallssonar",
    title: "Þorsteins saga Síðu-Hallssonar",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.valla_ljots_saga = {
    id: "valla_ljots_saga",
    title: "Valla-Ljóts saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.vatnsdaela_saga = {
    id: "vatnsdaela_saga",
    title: "Vatnsdæla saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.viga_glums_saga = {
    id: "viga_glums_saga",
    title: "Víga-Glúms saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.viglundar_saga = {
    id: "viglundar_saga",
    title: "Víglundar saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
settings.corpora.vopnfirdinga_saga = {
    id: "vopnfirdinga_saga",
    title: "Vopnfirðinga saga",
    context: defaultContext,
    description: "",
    within: {
        "paragraph": "paragraph",
        "sentence": "sentence",
        "text": "text"
    },
    attributes: fornritAttrs,
    structAttributes: fornritSattrs
};
/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = [];


settings.corpusListing = new CorpusListing(settings.corpora);
