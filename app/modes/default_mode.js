 settings.corpora = {};
settings.corporafolders = {};

settings.globalFilterCorpora = ["ivip"]

settings.hitsPerPageDefault = 25
settings.hitsPerPageValues = [10,25,50,75,100,500,1000]

settings.corporafolders.frettir = {
    title: "Fréttamiðlar",
    contents: ["kjarninn", "visir", "bbl", "ruv", "stundin"],
    description: "Textar frá ýmsum fréttamiðlum á landsvísu"
};

////////////////////////////////////////

settings.corpora["kjarninn"] = {
    id: "kjarninn",
    title: "Kjarninn.is",
    description: "Greinar frá fréttamiðlinum Kjarninn.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["visir"] = {
    id: "visir",
    title: "Vísir.is",
    description: "Greinar frá fréttamiðlinum Vísir.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["ruv"] = {
    id: "ruv",
    title: "Rúv.is",
    description: "Fréttir af vefútgáfu fréttastofu Ríkisútvarpsins.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}

settings.corpora["bbl"] = {
    id: "bbl",
    title: "Bændablaðið",
    description: "Fréttir af vefsíðu Bændablaðsins.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["stundin"] = {
    id: "stundin",
    title: "Stundin",
    description: "Fréttir af vefútgáfu Stundarinnar.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}

////////////////////////////////////////

settings.corporafolders.frettir.svaedarit = {
    title: "Blöð bæjarfélaga",
    contents: ["vf", "bb", "fjardarpostur", "sunnlenska"],
    description: "Blöð og tímarit bæjarfélaga"
}
settings.corpora["vf"] = {
    id: "vf",
    title: "Víkurfréttir",
    description: "Fréttir af vefsíðu Víkurfrétta.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["bb"] = {
    id: "bb",
    title: "Bæjarins besta",
    description: "Textar fengnir af vefsíðu vikublaðsins Bæjarins besta.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["fjardarpostur"] = {
    id: "fjardarpostur",
    title: "Fjarðarpósturinn",
    description: "Textar fengnir af vefsíðu Fjarðarpóstsins, bæjarblaðs Hafnfirðinga.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}

////////////////////////////////////////

settings.corporafolders.ithrottir = {
    title: "Íþróttafréttamiðlar",
    contents: ["fjorirthrirthrir", "eidfaxi"],
    description: "Textar frá ýmsum íþróttafréttamiðlum"
};
settings.corpora["fjorirthrirthrir"] = {
    id: "fjorirthrirthrir",
    title: "433.pressan.is",
    description: "Textar af fótboltafréttasíðunni 433.pressan.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["eidfaxi"] = {
    id: "eidfaxi",
    title: "Eiðfaxi",
    description: "Greinar af vefsíðunni eidfaxi.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}

////////////////////////////////////////

settings.corporafolders.stjornmal = {
    title: "Stjórnmálarit",
    contents: ["jonas", "andriki","deiglan"],
    description: "Textar frá tímaritum og bloggum sem fjalla um stjórnmál"
}

settings.corpora["jonas"] = {
    id: "jonas",
    title: "Jónas.is",
    description: "Pistlar af vefsíðu bloggarans Jónasar Kristjánssonar.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["andriki"] = {
    id: "andriki",
    title: "Andriki.is",
    description: "Greinar af vefsíðunni Andriki.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["deiglan"] = {
    id: "deiglan",
    title: "Deiglan.is",
    description: "Greinar af vefsíðunni Deiglan.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}

////////////////////////////////////////

settings.corporafolders.stjornskipan = {
    title: "Stjórnskipan",
    contents: ["domstolar", "haestirettur","althingislog", "althingi"],
    description: "Textar gefnir út af stjórnvöldum Íslands"
}
settings.corpora["bleikt"] = {
    id: "bleikt",
    title: "Bleikt.is",
    description: "Greinar af vefsíðunni Bleikt.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["bondi"] = {
    id: "bondi",
    title: "Bóndi.is",
    description: "Greinar af vefsíðunni Bondi.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["domstolar"] = {
    id: "domstolar",
    title: "Dómstólar",
    description: "Dómar úr gagnagrunni dómstóla Íslands.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["haestirettur"] = {
    id: "haestirettur",
    title: "Hæstiréttur",
    description: "Textar af vefsíðu Hæstaréttar.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["althingislog"] = {
    id: "althingislog",
    title: "Alþingislög",
    description: "Lög frá löggjafarþingi Íslendinga.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["althingi"] = {
    id: "althingi",
    title: "Alþingisræður",
    description: "Textar frá ræðum sem fluttar hafa verið á Alþingi.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["eyjan"] = {
    id: "eyjan",
    title: "Eyjan",
    description: "Textar fengnir af vefmiðlinum eyjan.is.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["wikipedia"] = {
    id: "wikipedia",
    title: "Wikipedia",
    description: "Greinar frá íslenskri útgáfu vefalfræðiorðabókarinnar Wikipedia.org.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["visindavefur"] = {
    id: "visindavefur",
    title: "Vísindavefurinn",
    description: "Greinar af vísindavefnum.",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["heimur"] = {
    id: "heimur",
    title: "Heimur",
    description: "TODO",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["vikudagur"] = {
    id: "vikudagur",
    title: "Vikudagur",
    description: "TODO",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["vb"] = {
    id: "vb",
    title: "Viðskiptablaðið",
    description: "TODO",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["sunnlenska"] = {
    id: "sunnlenska",
    title: "Sunnlenska",
    description: "TODO",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
settings.corpora["silfuregils"] = {
    id: "silfuregils",
    title: "Silfur Egils",
    description: "TODO",
    context: defaultContext,
    within: {
        "paragraph": "paragraph",
        "text": "text"
    },
    attributes: icelandicAttrs,
    structAttributes: icelandicSattrs
}
/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = ["kjarninn","jonas","visir"];

//
// settings.corpora["magmakolumner"] = {
//     id: "magmakolumner",
//     title: "Magma kolumner 2009–2012",
//     description: "Material ur kolumner publicerade av <a target=\"_blank\" href=\"http://www.magma.fi\">Tankesmedjan Magma</a>",
//     within: spWithin,
//     context: spContext,
//     attributes: modernAttrs,
//     structAttributes: {
//         text_author: {label: "author"},
//         text_title: {label: "title"},
//         text_date: {label: "date"}
//     }
// };

settings.corpusListing = new CorpusListing(settings.corpora);
