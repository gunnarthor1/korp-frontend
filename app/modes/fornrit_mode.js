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
        "forn_bandamanna_saga_konungsbok",
        "forn_bardar_saga_snaefellsass",
        "forn_bjarnar_saga_hitdaelakappa",
        "forn_brennu_njals_saga",
        "forn_droplaugarsona_saga",
        "forn_egils_saga_skalla_grimssonar",
        "forn_eiriks_saga_rauda",
        "forn_eyrbyggja_saga",
        "forn_finnboga_saga_ramma",
        "forn_fljotsdaela_saga",
        "forn_floamanna_saga",
        "forn_fostbraedra_saga",
        "forn_gisla_saga_surssonar_lengri_gerd",
        "forn_gisla_saga_surssonar_styttri_gerd",
        "forn_grettis_saga_asmundarsonar",
        "forn_graenlendinga_saga",
        "forn_graenlendinga_thattur",
        "forn_gull_thoris_saga",
        "forn_gunnars_saga_keldugnupsfifls",
        "forn_gunnlaugs_saga_ormstungu",
    ]
};
settings.corporafolders.islendingasogur.h_oe = {
    title: "H-Ö",
    contents: [
        "forn_hallfredar_saga_eftir_modruvallabok",
        "forn_hallfredar_saga_ur_olafs_sogu_tryggvasonar_hinni_mestu",
        "forn_hardar_saga_og_holmverja",
        "forn_havardar_saga_isfirdings",
        "forn_heidarviga_saga",
        "forn_hrafnkels_saga_freysgoda",
        "forn_haensna_thoris_saga",
        "forn_islendinga_thaettir",
        "forn_jokuls_thattur_buasonar",
        "forn_kjalnesinga_saga",
        "forn_kormaks_saga",
        "forn_kroka_refs_saga",
        "forn_laxdaela_saga",
        "forn_ljosvetninga_saga_a_gerd",
        "forn_ljosvetninga_saga_c_gerd",
        "forn_reykdaela_saga",
        "forn_svarfdaela_saga",
        "forn_valla_ljots_saga",
        "forn_vatnsdaela_saga",
        "forn_viga_glums_saga",
        "forn_viglundar_saga",
        "forn_vopnfirdinga_saga",
        "forn_thorsteins_saga_hvita",
        "forn_thorsteins_saga_sidu_hallssonar",
        "forn_thordar_saga_hredu",
        "forn_olkofra_saga"
    ]
};

settings.corpora.forn_bandamanna_saga_konungsbok = {
    id: "forn_bandamanna_saga_konungsbok",
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
settings.corpora.forn_bardar_saga_snaefellsass = {
    id: "forn_bardar_saga_snaefellsass",
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
settings.corpora.forn_bjarnar_saga_hitdaelakappa = {
    id: "forn_bjarnar_saga_hitdaelakappa",
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
settings.corpora.forn_brennu_njals_saga = {
    id: "forn_brennu_njals_saga",
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
settings.corpora.forn_droplaugarsona_saga = {
    id: "forn_droplaugarsona_saga",
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
settings.corpora.forn_egils_saga_skalla_grimssonar = {
    id: "forn_egils_saga_skalla_grimssonar",
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
settings.corpora.forn_eiriks_saga_rauda = {
    id: "forn_eiriks_saga_rauda",
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
settings.corpora.forn_eyrbyggja_saga = {
    id: "forn_eyrbyggja_saga",
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
settings.corpora.forn_finnboga_saga_ramma = {
    id: "forn_finnboga_saga_ramma",
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
settings.corpora.forn_fljotsdaela_saga = {
    id: "forn_fljotsdaela_saga",
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
settings.corpora.forn_floamanna_saga = {
    id: "forn_floamanna_saga",
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
settings.corpora.forn_fostbraedra_saga = {
    id: "forn_fostbraedra_saga",
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
settings.corpora.forn_gisla_saga_surssonar_lengri_gerd = {
    id: "forn_gisla_saga_surssonar_lengri_gerd",
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
settings.corpora.forn_gisla_saga_surssonar_styttri_gerd = {
    id: "forn_gisla_saga_surssonar_styttri_gerd",
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
settings.corpora.forn_graenlendinga_saga = {
    id: "forn_graenlendinga_saga",
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
settings.corpora.forn_graenlendinga_thattur = {
    id: "forn_graenlendinga_thattur",
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
settings.corpora.forn_grettis_saga_asmundarsonar = {
    id: "forn_grettis_saga_asmundarsonar",
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
settings.corpora.forn_gull_thoris_saga = {
    id: "forn_gull_thoris_saga",
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
settings.corpora.forn_gunnars_saga_keldugnupsfifls = {
    id: "forn_gunnars_saga_keldugnupsfifls",
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
settings.corpora.forn_gunnlaugs_saga_ormstungu = {
    id: "forn_gunnlaugs_saga_ormstungu",
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
settings.corpora.forn_hallfredar_saga_eftir_modruvallabok = {
    id: "forn_hallfredar_saga_eftir_modruvallabok",
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
settings.corpora.forn_hallfredar_saga_ur_olafs_sogu_tryggvasonar_hinni_mestu = {
    id: "forn_hallfredar_saga_ur_olafs_sogu_tryggvasonar_hinni_mestu",
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
settings.corpora.forn_hardar_saga_og_holmverja = {
    id: "forn_hardar_saga_og_holmverja",
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
settings.corpora.forn_havardar_saga_isfirdings = {
    id: "forn_havardar_saga_isfirdings",
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
settings.corpora.forn_heidarviga_saga = {
    id: "forn_heidarviga_saga",
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
settings.corpora.forn_haensna_thoris_saga = {
    id: "forn_haensna_thoris_saga",
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
settings.corpora.forn_heimskringla = {
    id: "forn_heimskringla",
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
settings.corpora.forn_hrafnkels_saga_freysgoda = {
    id: "forn_hrafnkels_saga_freysgoda",
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
settings.corpora.forn_islendinga_thaettir = {
    id: "forn_islendinga_thaettir",
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
settings.corpora.forn_jokuls_thattur_buasonar = {
    id: "forn_jokuls_thattur_buasonar",
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
settings.corpora.forn_kjalnesinga_saga = {
    id: "forn_kjalnesinga_saga",
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
settings.corpora.forn_kormaks_saga = {
    id: "forn_kormaks_saga",
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
settings.corpora.forn_kroka_refs_saga = {
    id: "forn_kroka_refs_saga",
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
settings.corpora.forn_landnamabok_sturlubok = {
    id: "forn_landnamabok_sturlubok",
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
settings.corpora.forn_laxdaela_saga = {
    id: "forn_laxdaela_saga",
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
settings.corpora.forn_ljosvetninga_saga_a_gerd = {
    id: "forn_ljosvetninga_saga_a_gerd",
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
settings.corpora.forn_ljosvetninga_saga_c_gerd = {
    id: "forn_ljosvetninga_saga_c_gerd",
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
settings.corpora.forn_olkofra_saga = {
    id: "forn_olkofra_saga",
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
settings.corpora.forn_reykdaela_saga = {
    id: "forn_reykdaela_saga",
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
settings.corpora.forn_sturlunga = {
    id: "forn_sturlunga",
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
settings.corpora.forn_svarfdaela_saga = {
    id: "forn_svarfdaela_saga",
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
settings.corpora.forn_thordar_saga_hredu = {
    id: "forn_thordar_saga_hredu",
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
settings.corpora.forn_thorsteins_saga_hvita = {
    id: "forn_thorsteins_saga_hvita",
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
settings.corpora.forn_thorsteins_saga_sidu_hallssonar = {
    id: "forn_thorsteins_saga_sidu_hallssonar",
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
settings.corpora.forn_valla_ljots_saga = {
    id: "forn_valla_ljots_saga",
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
settings.corpora.forn_vatnsdaela_saga = {
    id: "forn_vatnsdaela_saga",
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
settings.corpora.forn_viga_glums_saga = {
    id: "forn_viga_glums_saga",
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
settings.corpora.forn_viglundar_saga = {
    id: "forn_viglundar_saga",
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
settings.corpora.forn_vopnfirdinga_saga = {
    id: "forn_vopnfirdinga_saga",
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
