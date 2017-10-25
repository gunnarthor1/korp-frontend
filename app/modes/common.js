settings.senseAutoComplete = "<autoc model='model' placeholder='placeholder' type='sense'/>";

var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

var selectType = {
    extendedTemplate: "<select ng-model='input' escaper "
     + "ng-options='tuple[0] as localize(tuple[1]) for tuple in dataset' ></select>",
    extendedController: function($scope) {
        $scope.localize = function(str) {
            if($scope.localize === false) {
                return str;
            } else {
                return util.getLocaleString( ($scope.translationKey || "") + str);
            }
        }

        $scope.translationKey = $scope.translationKey || "";
        var dataset;
        if(_.isArray($scope.dataset)) {
            // convert array datasets into objects
            dataset = _.object(_.map($scope.dataset, function(item) {
                return [item, item];
            }));
        }
        $scope.dataset = dataset || $scope.dataset;

        $scope.dataset = _.sortBy(_.pairs($scope.dataset), function(tuple) {
            return $scope.localize(tuple[1]);
        });
        $scope.model = $scope.model || $scope.dataset[0][0]
    }
};

var liteOptions = {
    "is": "=",
    "is_not": "!="
}
var setOptions = {
    "is": "contains",
    "is_not": "not contains"
};
var probabilitySetOptions = {
    "is": "highest_rank",
    "is_not": "not_highest_rank",
    "contains": "rank_contains",
    "contains_not": "not_rank_contains",
};

var defaultContext = {
    "7 words": "7 words"
};

var spContext = {
    "1 sentence": "1 sentence",
    "1 paragraph": "1 paragraph"
};
var spWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph"
};

var attrs = {};  // positional attributes
var sattrs = {}; // structural attributes

attrs.pos = {
    label: "pos",
    translationKey: "pos_",
    dataset: {
        "AB": "AB",
        "MID|MAD|PAD": "DL",
        "DT": "DT",
        "HA": "HA",
        "HD": "HD",
        "HP": "HP",
        "HS": "HS",
        "IE": "IE",
        "IN": "IN",
        "JJ": "JJ",
        "KN": "KN",
        "NN": "NN",
        "PC": "PC",
        "PL": "PL",
        "PM": "PM",
        "PN": "PN",
        "PP": "PP",
        "PS": "PS",
        "RG": "RG",
        "RO": "RO",
        "SN": "SN",
        "UO": "UO",
        "VB": "VB"
    },
    opts: liteOptions,
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    order: 0
};

attrs.msd = {
    label: "msd",
    opts: settings.defaultOptions,
    extendedTemplate: '<input ng-model="input" class="arg_value" escaper ng-model-options=\'{debounce : {default : 300, blur : 0}, updateOn: "default blur"}\'>' +
    '<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
    extendedController: function($scope, $uibModal) {
        var modal = null;

        $scope.onIconClick = function() {
            modal = $uibModal.open({
                template: '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body msd-modal" ng-click="msdClick($event)" ng-include="\'markup/msd.html\'"></div>' +
                            '</div>',
                scope: $scope
            })
        }
        $scope.clickX = function(event) {
            modal.close()
        }
        $scope.msdClick = function(event) {
            val = $(event.target).parent().data("value")
            if(!val) return;
            $scope.input = val;
            modal.close();
        }
    }
};
attrs.baseform = {
    label: "baseform",
    type: "set",
    opts: setOptions,
    extendedTemplate: "<input ng-model='model' >",
    order: 1
};
attrs.lemgram = {
    label: "lemgram",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.str.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' typeahead-close-callback='checkForError(valueSelected)'/>"
                        + "<span ng-if='valueError' style='color: red; position: relative; top: 3px; margin-left: 6px'>{{'choose_lemgram' | loc:lang}}</span>",
    extendedController: function($scope) {
        $scope.valueError = false;

        $scope.checkForError = function(valueSelected) {
            $scope.valueError = !valueSelected;
        }
    },
    order: 2
};
attrs.dalinlemgram = {
    label: "dalin-lemgram",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.str.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='dalin'/>",
    order: 2
};
attrs.saldo = {
    label: "saldo",
    type: "set",
    opts: setOptions,
    stringify: function(saldo) {
        return util.saldoToString(saldo, true);
    },
    externalSearch: "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|sense|equals|<%= val %>",
    internalSearch: true,
    extendedTemplate: settings.senseAutoComplete,
    order: 3
};
attrs.dephead = {
    label: "dephead",
    displayType: "hidden"
};
attrs.deprel = {
    label: "deprel",
    translationKey: "deprel_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    dataset: {
        "++": "++",
        "+A": "+A",
        "+F": "+F",
        "AA": "AA",
        "AG": "AG",
        "AN": "AN",
        "AT": "AT",
        "CA": "CA",
        "DB": "DB",
        "DT": "DT",
        "EF": "EF",
        "EO": "EO",
        "ES": "ES",
        "ET": "ET",
        "FO": "FO",
        "FP": "FP",
        "FS": "FS",
        "FV": "FV",
        "I?": "I?",
        "IC": "IC",
        "IG": "IG",
        "IK": "IK",
        "IM": "IM",
        "IO": "IO",
        "IP": "IP",
        "IQ": "IQ",
        "IR": "IR",
        "IS": "IS",
        "IT": "IT",
        "IU": "IU",
        "IV": "IV",
        "JC": "JC",
        "JG": "JG",
        "JR": "JR",
        "JT": "JT",
        "KA": "KA",
        "MA": "MA",
        "MS": "MS",
        "NA": "NA",
        "OA": "OA",
        "OO": "OO",
        "OP": "OP",
        "PL": "PL",
        "PR": "PR",
        "PT": "PT",
        "RA": "RA",
        "SP": "SP",
        "SS": "SS",
        "TA": "TA",
        "TT": "TT",
        "UK": "UK",
        "VA": "VA",
        "VO": "VO",
        "VS": "VS",
        "XA": "XA",
        "XF": "XF",
        "XT": "XT",
        "XX": "XX",
        "YY": "YY",
        "CJ": "CJ",
        "HD": "HD",
        "IF": "IF",
        "PA": "PA",
        "UA": "UA",
        "VG": "VG",
        "ROOT": "ROOT"
    },
    opts: liteOptions
};
attrs.prefix = {
    label: "prefix",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
};
attrs.suffix = {
    label: "suffix",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
};
attrs.ref = {
    label: "ref",
    displayType: "hidden"
};
attrs.link = {
    label: "sentence_link"
};
attrs.ne_ex = {
    label: "ne_expr",
    translationKey: "ne_expr_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    isStructAttr: true,
    dataset: [
       "ENAMEX",
       "TIMEX",
       "NUMEX",
   ]
};
attrs.ne_type = {
    label: "ne_type",
    translationKey: "ne_type_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    isStructAttr: true,
    dataset: [
       "LOC",
       "PRS",
       "ORG",
       "EVN",
       "WRK",
       "OBJ",
       "MSR",
       "TME"
   ]
};
attrs.ne_subtype = {
    label: "ne_subtype",
    translationKey: "ne_subtype_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    isStructAttr: true,
    dataset: [
        "AST",
        "GPL",
        "PPL",
        "FNC",
        "STR",
        "HUM",
        "MTH",
        "ANM",
        "CLC",
        "FIN",
        "ATH",
        "CLT",
        "PLT",
        "TVR",
        "EDU",
        "TRN",
        "CRP",
        "HPL",
        "WTH",
        "CLU",
        "ATL",
        "RLG",
        "WRT",
        "RTV",
        "WAO",
        "PRJ",
        "WMD",
        "WAE",
        "MDC",
        "FWP",
        "CMP",
        "VHA",
        "VHG",
        "VHW",
        "PRZ",
        "PRD",
        "VLM",
        "TMP",
        "INX",
        "DST",
        "PRC",
        "CUR",
        "DEN",
        "DSG",
        "SPD",
        "FRQ",
        "AGE",
        "MSU",
        "WMU",
        "CMU",
        "WEB",
        "PSS",
        "CVU",
        "IDX",
        "LST",
        "DAT",
        "PER"
   ],
   stringify: function(val) {
       lString = util.getLocaleStringUndefined("ne_subtype_" + val)
       return lString || val;
   }
};
attrs.ne_name = {
    label: "ne_name",
    isStructAttr: true
};
sattrs.date = {
    label: "date"
};

var modernAttrsOld = {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    lex: attrs.lemgram,
    saldo: attrs.saldo,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
    prefix: attrs.prefix,
    suffix: attrs.suffix
};


var modernAttrs = {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    lex: attrs.lemgram,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
    prefix: attrs.prefix,
    suffix: attrs.suffix,
    ne_ex: attrs.ne_ex,
    ne_type: attrs.ne_type,
    ne_subtype: attrs.ne_subtype,
    ne_name: attrs.ne_name,
    complemgram: {
        label: "complemgram",
        internalSearch: true,
        ranked: true,
        display: {
            expandList: {
                splitValue: function(value) { return value.split("+"); },
                searchKey: "lex",
                joinValues: " + ",
                stringify: function(lemgram) { return util.lemgramToString(lemgram, true); },
                linkAllValues: true
            }
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    compwf: {
        label: "compwf",
        display: {
            "expandList": {}
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    sense: {
        label: "sense",
        type: "set",
        ranked: true,
        display: {
            expandList: {
                internalSearch: function(key, value) { return "[" + key + " highest_rank '" + regescape(value) + "']"}
            }
        },
        stringify: function(sense) { return util.saldoToString(sense, true); },
        opts: probabilitySetOptions,
        externalSearch: "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|sense|equals|<%= val %>",
        internalSearch: true,
        extendedTemplate: settings.senseAutoComplete
    }
};

settings.commonStructTypes = {
    date_interval: {
        label: "date_interval",
        hideSidebar: "true",
        hideCompare: "true",
        hideStatistics: "true",
        opts: false,
        extendedTemplate: '<div class="date_interval_arg_type"> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Frá </button> {{combined.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="from_date" time-model="from_time" model="combined" min-date="minDate" max-date="maxDate"> </time-interval> </div> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Til </button> {{combined2.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top" min-date="minDate" max-date="maxDate"> </time-interval> </div> </div>',
        extendedController: [
            "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
                var cl, getTime, getYear, ref, ref1, ref2, s, updateIntervals;
                s = $scope;
                cl = settings.corpusListing;

                updateIntervals = function() {
                    var from, moments, ref, ref1, to;
                    moments = cl.getMomentInterval();
                    if (moments.length) {
                        return ref = _.invoke(moments, "toDate"), s.minDate = ref[0], s.maxDate = ref[1], ref;
                    } else {
                        ref1 = cl.getTimeInterval(), from = ref1[0], to = ref1[1];
                        s.minDate = moment(from.toString(), "YYYY").toDate();
                        return s.maxDate = moment(to.toString(), "YYYY").toDate();
                    }
                };

                s.$on("corpuschooserchange", function() {
                  return updateIntervals();
                });

                updateIntervals();

                s.from_click = function(event) {
                  event.originalEvent.preventDefault();
                  return event.originalEvent.stopPropagation();
                };

                getYear = function(val) {
                  return moment(val.toString(), "YYYYMMDD").toDate();
                };

                getTime = function(val) {
                  return moment(val.toString(), "HHmmss").toDate();
                };

                if (!s.model) {
                    s.from_date = s.minDate;
                    s.to_date = s.maxDate;
                    ref = _.invoke(cl.getMomentInterval(), "toDate"), s.from_time = ref[0], s.to_time = ref[1];
                } else if (s.model.length === 4) {
                    ref1 = _.map(s.model.slice(0, 3), getYear), s.from_date = ref1[0], s.to_date = ref1[1];
                    ref2 = _.map(s.model.slice(2), getTime), s.from_time = ref2[0], s.to_time = ref2[1];
                }
                return s.$watchGroup(["combined", "combined2"], function(arg) {
                    var combined, combined2;
                    combined = arg[0], combined2 = arg[1];
                    return s.model = [moment(s.from_date).format("YYYYMMDD"), moment(s.to_date).format("YYYYMMDD"), moment(s.from_time).format("HHmmss"), moment(s.to_time).format("HHmmss")];
                });
            }
        ]
    }
};
var icelandicSattrs = {
    text_author: {
        label: "text_author"
    },
    // text_datefrom: {
    //     label: "text_date_from",
    //     hideSidebar: "true"
    // },
    // text_dateto: {
    //     label: "text_date_to",
    //     hideSidebar: "true"
    // },
    // text_timefrom: {
    //     label: "text_time_from",
    //     hideSidebar: "true"
    // },
    // text_timeto: {
    //     label: "text_time_to",
    //     hideSidebar: "true"
    // },
    text_date: {
        label: "text_date"
    },
    text_midill: {
        label: "text_midill"
    },
    text_wordcount: {
        label: "text_wordcount"
    },
    text_id_midill: {
        label: "text_id_midill",
        displayType: "hidden"
    },
    text_title: {
        label: "text_title",
        displayType: "hidden"
    },
    text_url: {
        label: "text_url",
        type: "url",
        displayType: "hidden"
    }
}

var icelandicCustomAttrs = {
    thingmadur: {
        label: 'thingmadur',
        customType: 'struct',
        pattern: "<p><span rel='localize[text_speaker]'></span>: <a href='<%=struct_attrs.text_speakerurl%>'><%=struct_attrs.text_speaker%></a></p>"
        // pattern: "<p>works!</p>"
    },
    article: {
        label: 'article',
        customType: 'struct',
        // pattern: "<p>HELLO WORLD</p>"
        pattern: "<p><span rel='localize[text_title]'></span>: <a href='<%=struct_attrs.text_url%>'><%=struct_attrs.text_title%></a></p>"
    }
}

var icelandicAlthingiSAttrs = {
    text_author: icelandicSattrs.text_author,
    text_date: icelandicSattrs.text_date,
    text_midill: icelandicSattrs.text_midill,
    text_wordcount: icelandicSattrs.text_wordcount,
    text_id_midill: icelandicSattrs.text_id_midill,
    text_title: icelandicSattrs.text_title,
    text_url: icelandicSattrs.text_url,
    text_speakerurl: icelandicSattrs.text_speakerurl,
    text_speaker: icelandicSattrs.text_speaker,
    text_speakerurl: {
        label: "text_speakerurl",
        displayType: "hidden"
    },
    text_speaker: {
        label: "text_speaker",
        hideSidebar: "true"
    }
}

var icelandicAttrs = {
    pos: {
        label: "pos",
        translationKey: "pos_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 1,
        dataset: {
            "lýsingarorð": "lo",
            "nafnorð": "no",
            "samtenging": "st",
            "sagnorð": "so",
            "forsetning": "fs",
            "skammstöfun": "ss",
            "töluorð": "to",
            "erlentorð": "eo",
            "atviksorð": "ao",
            "fornafn": "fn",
            "greinir": "gr",
            "greinamerki": "grm",
            "upphrópun": "uh",
            "ógreint": "xx"
        }
    },
    lemma: {
        label: "lemma",
        order: 2
    },
    pers: {
        label:"pers",
        translationKey: "pers_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 3,
        dataset: {
            "1.persóna": "1pers",
            "2.persóna": "2pers",
            "3.persóna": "3pers"
        }
    },
    kyn: {
        label:"kyn",
        translationKey: "kyn_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 4,
        dataset: {
            "karlkyn": "kk",
            "kvenkyn": "kvk",
            "hvorugkyn": "hvk"
        }
    },
    tala: {
        label:"tala",
        translationKey: "tala_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 5,
        dataset: {
            "eintala": "et",
            "fleirtala": "ft"
        }
    },
    fall: {
        label:"fall",
        translationKey: "fall_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 6,
        dataset: {
            "nefnifall": "nf",
            "þolfall": "þf",
            "þágufall": "þgf",
            "eignarfall": "ef"
        }
    },
    lostig: {
        label:"lostig",
        translationKey: "lostig_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 7,
        dataset: {
            "frumstig": "fs",
            "miðstig": "ms",
            "efsta-stig": "es"
        }
    },
    mynd: {
        label:"mynd",
        translationKey: "mynd_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 8,
        dataset: {
            "germynd": "gm",
            "þolmynd": "þm",
            "miðmynd": "mm"
        }
    },
    hattur: {
        label:"hattur",
        translationKey: "hattur_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 9,
        dataset: {
            "nafnháttur": "nh",
            "viðtengingarháttur": "vh",
            "sagnbót": "sb",
            "framsöguháttur": "fh",
            "lýsingarháttur-þátíðar": "lhþ",
            "lýsingarháttur-nútíðar": "lhn",
            "boðháttur": "bh"
        }
    },
    tid: {
        label:"tid",
        translationKey: "tid_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 10,
        dataset: {
            "nútíð": "nt",
            "þátíð": "þt"
        }
    },
    lob: {
        label:"lob",
        translationKey: "lob_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 11,
        dataset: {
            "sterk-beyging": "sb",
            "veik-beyging": "vb",
            "óbeygt": "ob"
        }
    },
    fsfall: {
        label:"fsfall",
        translationKey: "fsfall_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 12,
        dataset: {
            "stýrir-þolfalli": "þf",
            "stýrir-þágufalli": "þgf",
            "stýrir-eignarfalli": "ef"
        }
    },
    tob: {
        label:"tob",
        translationKey: "tob_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 13,
        dataset: {
            "beygjanlegt-töluorð": "bt",
            "óbeygjanlegt-töluorð": "ót"
        }
    },
    fnf: {
        label:"fnf",
        translationKey: "fnf_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 15,
        dataset: {
            "eignarfornafn": "efn",
            "ábendingarfornafn": "áfn",
            "óákveðið-ábendingarfornafn": "óáfn",
            "óákveðið-fornafn": "ófn",
            "persónufornafn": "pfn",
            "spurnarfornafn": "sfn",
            "tilvísunarfornafn": "tfn"
        }
    },
    tof: {
        label:"ft",
        translationKey: "ft_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 16,
        dataset: {
            "frumtala": "ft"
        }
    },
    stf: {
        label:"stf",
        translationKey: "stf_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 17,
        dataset: {
            "tilvísunartenging": "tt",
            "nafnháttarmerki": "nhm"
        }
    },
    sernafn: {
        label:"sernafn",
        translationKey: "sernafn_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 18,
        dataset: {
            "sérnafn": "sn"
        }
    },
    greinir: {
        label:"greinir",
        translationKey: "greinir_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 19,
        dataset: {
            "með-greini": "mg"
        }
    },
    date_interval: settings.commonStructTypes.date_interval
};
