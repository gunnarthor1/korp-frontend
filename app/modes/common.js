settings.senseAutoComplete = "<autoc model='model' placeholder='placeholder' type='sense' text-in-field='textInField'/>";


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

var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

var liteOptions = {
    "is": "=",
    "is_not": "!="
};


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
    "5 words": "5 words",
    "7 words": "7 words",
    "10 words": "10 words",
    "15 words": "15 words",
    "20 words": "20 words",
    "1 paragraph": "1 paragraph"
};

var fornritContext = {
    "5 words": "5 words",
    "7 words": "7 words",
    "10 words": "10 words",
    "15 words": "15 words",
    "20 words": "20 words",
    "1 sentence": "1 sentence",
    "1 paragraph": "1 paragraph"
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
    extendedComponent: "datasetSelect",
    escape: false,
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
            var msdHTML = settings.markup.msd;
            modal = $uibModal.open({
                template: '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body msd-modal" ng-click="msdClick($event)" ng-include="' + msdHTML + '"></div>' +
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
    opts: settings.defaultOptions,
    extendedTemplate: "<input ng-model='model' >",
    order: 1
};
attrs.lemgram = {
    label: "lemgram",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' typeahead-close-callback='checkForError(valueSelected)' text-in-field='textInField'/>"
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
        return util.lemgramToString(_.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='dalin' text-in-field='textInField'/>",
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
    extendedComponent: "datasetSelect",
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
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix' text-in-field='textInField'/>"
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
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix' text-in-field='textInField'/>"
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
    extendedComponent: "datasetSelect",
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
    extendedComponent: "datasetSelect",
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
    extendedComponent: "datasetSelect",
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

var modernAttrs2 = {
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
    complemgram: modernAttrs.complemgram,
    compwf: modernAttrs.compwf,
    sense: modernAttrs.sense,
    sentiment: {
        label: "sentiment"
    },
    blingbring: {
        label: "blingbring",
        type: "set",
        internalSearch: true
    },
    swefn: {
        label: "swefn",
        type: "set",
        externalSearch: "https://spraakbanken.gu.se/karp/#?mode=swefn&search=sense%7C%7Cswefn--<%= val %>",
        internalSearch: true
    }
};

var lexClassesText = {
    text_blingbring: {
        label: "blingbring",
        type: "set",
        isStructAttr: true,
        ranked: true,
        order: 500,
        display: {
            expandList: {
                internalSearch: function(key, value) { return "[_.text_blingbring highest_rank '" + regescape(value) + "']"},
                linkAllValues: true,
                showAll: true
            }
        },
        internalSearch: true
    },
    text_swefn: {
        label: "swefn",
        type: "set",
        isStructAttr: true,
        ranked: true,
        order: 501,
        display: {
            expandList: {
                internalSearch: function(key, value) { return "[_.text_swefn highest_rank '" + regescape(value) + "']"},
                linkAllValues: true,
                showAll: true
            }
        },
        externalSearch: "https://spraakbanken.gu.se/karp/#?mode=swefn&search=sense%7C%7Cswefn--<%= val %>",
        internalSearch: true
    }
};

var readability = {
    lix: {
        label: "lix",
        isStructAttr: true,
        order: 600
    },
    ovix: {
        label: "ovix",
        isStructAttr: true,
        order: 601
    },
    nk: {
        label: "nk",
        isStructAttr: true,
        order: 602
    }
};

settings.posset = {
   type: "set",
   label: "posset",
   opts: setOptions,
   translationKey: "pos_",
   extendedComponent: "datasetSelect",
   dataset:  {
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
    order: 0
};

settings.fsvlemma = {
    type: "set",
    label: "baseform",
    opts: setOptions,
    extendedTemplate: "<input ng-model='model' >"
};
settings.fsvlex = {
    type: "set",
    label: "lemgram",
    opts: setOptions,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' text-in-field='textInField'/>",
    stringify: function(str) {
        return util.lemgramToString(str, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true
};
settings.fsvvariants = {
    type: "set",
    label: "variants",
    stringify: function(str) {
        return util.lemgramToString(str, true);
    },
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' text-in-field='textInField'/>",
    opts: setOptions,
    externalSearch: karpLemgramLink,
    internalSearch: true,
    order: 4
};

settings.fsvdescription ='<a target="_blank" href="http://project2.sol.lu.se/fornsvenska/">Fornsvenska textbanken</a> är ett projekt som digitaliserar fornsvenska texter och gör dem tillgängliga över webben. Projektet leds av Lars-Olof Delsing vid Lunds universitet.';

var fsv_yngrelagar = {
    morphology: 'fsvm',
    id: "fsv-yngrelagar",
    title: "Yngre lagar – Fornsvenska textbankens material",
    description: settings.fsvdescription,
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        posset: settings.posset,
        lemma: settings.fsvlemma,
        lex: settings.fsvlex,
        variants: settings.fsvvariants
        },
    structAttributes: {
        text_title: {
            label: "title",
            extendedComponent: "datasetSelect",
            dataset: [
                "Kristoffers Landslag, nyskrivna flockar i förhållande till MEL",
                "Kristoffers Landslag, innehållsligt ändrade flockar i förhållande til MEL",
                "Kristoffers Landslag, flockar direkt hämtade från MEL",
                "Kristoffers Landslag"
                ],
        },
        text_date: {label: "date"}
    }
};

var fsv_aldrelagar = {
    morphology: 'fsvm',
    id: "fsv-aldrelagar",
    title: "Äldre lagar – Fornsvenska textbankens material",
    description: settings.fsvdescription,
    within: settings.defaultWithin,
    context: spContext,
    attributes: {
        posset: settings.posset,
        lemma: settings.fsvlemma,
        lex: settings.fsvlex,
        variants: settings.fsvvariants
                },
    structAttributes: {
        text_title: {
            label: "title",
            extendedComponent: "datasetSelect",
            dataset: [
                "Yngre Västgötalagens äldsta fragment, Lydekini excerpter och anteckningar",
                "Tillägg till Upplandslagen, hskr A (Ups B 12)",
                "Södermannalagen, enligt Codex iuris Sudermannici",
                "Östgötalagen, fragment H, ur Kyrkobalken ur Skokloster Avdl I 145",
                "Yngre Västmannalagen, enl Holm B 57",
                "Vidhemsprästens anteckningar",
                "Magnus Erikssons Stadslag, exklusiva stadslagsflockar",
                "Södermannalagens additamenta, efter NKS 2237",
                "Hälsingelagen",
                "Yngre Västgötalagen, tillägg, enligt Holm B 58",
                "Östgötalagen, fragment C, ur Holm B 1709",
                "Yngre Västgötalagen, enligt Holm B 58",
                "Upplandslagen enl Schlyters utgåva och Codex Ups C 12, hskr A",
                "Skånelagen, enligt Holm B 76",
                "Östgötalagen, fragment D, ur Holm B 24",
                "Östgötalagen A, ur Holm B 50",
                "Äldre Västgötalagen",
                "Östgötalagen, fragment M, ur Holm B 196",
                "Gutalagen enligt Holm B 64",
                "Upplandslagen enligt Codex Holm B 199, Schlyters hskr B",
                "Smålandslagens kyrkobalk",
                "Dalalagen (Äldre Västmannalagen)",
                "Gutalagens additamenta enligt AM 54",
                "Bjärköarätten",
                "Magnus Erikssons Landslag",
                "Östgötalagen, fragment N, ur Köpenhamn AM 1056",
                "Södermannalagen stadsfästelse - Confirmatio, enligt NKS 2237",
                "Östgötalagen, fragment E, ur Ups B 22"
                            ],
        },
        text_date: {label: "date"}
    }
};

settings.commonStructTypes = {
    date_interval: {
        label: "date_interval",
        hideSidebar: "true",
        hideCompare: "true",
        hideStatistics: "true",
        opts: false,
        extendedTemplate: '<div class="date-interval-arg-type"> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Frá </button> {{combined.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper-menu dropdown-menu" date-model="from_date" time-model="from_time" model="combined" min-date="minDate" max-date="maxDate"> </time-interval> </div> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Til </button> {{combined2.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper-menu dropdown-menu" date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top" min-date="minDate" max-date="maxDate"> </time-interval> </div> </div>',
        extendedController: [
            "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
                var cl, getTime, getYear, ref, ref1, ref2, s, updateIntervals;
                s = $scope;
                cl = settings.corpusListing;

                updateIntervals = function() {
                    var from, moments, ref, ref1, to;
                    moments = cl.getMomentInterval();
                    if (moments.length) {
                        return ref = _.invokeMap(moments, "toDate"), s.minDate = ref[0], s.maxDate = ref[1], ref;
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
                    ref = _.invokeMap(cl.getMomentInterval(), "toDate"), s.from_time = ref[0], s.to_time = ref[1];
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
        label: "text_author",
        order: 10
    },
    text_datefrom: {
        label: "text_date_from",
        displayType: "hidden"
    },
    text_dateto: {
        label: "text_date_to",
        displayType: "hidden"
    },
    text_timefrom: {
        label: "text_time_from",
        displayType: "hidden"
    },
    text_timeto: {
        label: "text_time_to",
        displayType: "hidden"
    },
    text_date: {
        label: "text_date",
        hideExtended: "true",
        pattern: '<%=val.substring(6,8)+"-"+val.substring(4,6)+"-"+val.substring(0,4)%>',
        order: 20
    },
    text_midill: {
        label: "text_midill",
        hideExtended: "true",
        order: 30
    },
    text_wordcount: {
        label: "text_wordcount",
        order: 40
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
};


var icelandicSattrsNoUrl = {
    text_author: {
        label: "text_author",
        order: 10
    },
    text_datefrom: {
        label: "text_date_from",
        displayType: "hidden"
    },
    text_dateto: {
        label: "text_date_to",
        displayType: "hidden"
    },
    text_timefrom: {
        label: "text_time_from",
        displayType: "hidden"
    },
    text_timeto: {
        label: "text_time_to",
        displayType: "hidden"
    },
    text_date: {
        label: "text_date",
        hideExtended: "true",
        pattern: '<%=val.substring(6,8)+"-"+val.substring(4,6)+"-"+val.substring(0,4)%>',
        order: 20
    },
    text_midill: {
        label: "text_midill",
        hideExtended: "true",
        order: 30
    },
    text_wordcount: {
        label: "text_wordcount",
        order: 40
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
};


var icelandicCustomAttrs = {
    thingmadur: {
        label: 'thingmadur',
        customType: 'struct',
        // pattern: "<p>works!</p>"
        pattern: "<p><span rel='localize[text_speaker]'></span>: <%=struct_attrs.text_speakerurl ? \"<a target='_blank' href='http://althingi.is\"+struct_attrs.text_speakerurl+\"'>\"+struct_attrs.text_speaker+\"</a>\" : \"<span>\"+struct_attrs.text_speaker+\"</span>\"%></p>"
    },
    article: {
        label: 'article',
        customType: 'struct',
        pattern: "<p><span rel='localize[text_title]'></span>: <a target='_blank' href='<%=struct_attrs.text_url%>'><%=struct_attrs.text_title%></a></p>",
        order: 0
    },
    article_nourl: {
        label: 'article',
        customType: 'struct',
        pattern: "<p><span rel='localize[text_title]'></span>: <%=struct_attrs.text_title%></p>",
        order: 0
    },
    article_althingi: {
        label: 'article',
        customType: 'struct',
        pattern: "<p><span rel='localize[text_title_althingi]'></span>: <a target='_blank' href='<%=struct_attrs.text_url%>'><%=struct_attrs.text_title%></a></p>"
    }
};

var icelandicAlthingiSAttrs = {
    text_author: {
        label: "text_author",
        hideSidebar: "true"
    },
    text_date: icelandicSattrs.text_date,
    text_midill: icelandicSattrs.text_midill,
    text_wordcount: icelandicSattrs.text_wordcount,
    text_id_midill: icelandicSattrs.text_id_midill,
    text_title: {
        label: "text_title_althingi",
        displayType: "hidden"
    },
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
};

var icelandicSAttrsNoDate = {
    text_author: icelandicSattrs.text_author,
    text_midill: icelandicSattrs.text_midill,
    text_wordcount: icelandicSattrs.text_wordcount,
    text_id_midill: icelandicSattrs.text_id_midill,
    text_title: icelandicSattrs.text_title,
    text_url: icelandicSattrs.text_url,
};
var mimSattrs = {
    text_author: icelandicSattrs.text_author,
    text_date: {
        label: "text_date"
    },
    text_wordcount: icelandicSattrs.text_wordcount,
    text_sentencecount: {
        label: "text_sentencecount"
    },
    text_title: icelandicSattrs.text_title,
    text_subtitle: {
        label: "text_subtitle"
    },
    text_publishing_place: {
        label: "text_publishing_place"
    }
};

var icelandicAttrs = {
    word: {
        label: "word",
        order: 0
    },
    pos: {
        label: "pos",
        translationKey: "pos_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 1,
        dataset: {
            "l": "lo",
            "n": "no",
            "c": "st",
            "s": "so",
            "r": "fs",
            "t": "to",
            "e": "eo",
            "a": "ao",
            "f": "fn",
            "g": "gr",
            "p": "grm",
            "u": "uh",
            "v": "vf",
            "h": "nhm",
            "x": "xx"
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
            "1": "1pers",
            "2": "2pers",
            "3": "3pers"
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
            "k": "kk",
            "v": "kvk",
            "h": "hvk"
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
            "e": "et",
            "f": "ft"
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
            "n": "nf",
            "o": "þf",
            "þ": "þgf",
            "e": "ef"
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
            "f": "fs",
            "m": "ms",
            "e": "es"
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
            "g": "gm",
            "m": "mm"
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
            "n": "nh",
            "v": "vh",
            "s": "sb",
            "f": "fh",
            "þ": "lhþ",
            "l": "lhn",
            "b": "bh"
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
            "n": "nt",
            "þ": "þt"
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
            "s": "sb",
            "v": "vb",
            "o": "ob"
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
            "o": "þf",
            "þ": "þgf",
            "e": "ef"
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
            "b": "bt",
            "ó": "ót"
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
            "e": "efn",
            "a": "áfn",
            "b": "óáfn",
            "o": "ófn",
            "p": "pfn",
            "s": "sfn",
            "t": "tfn"
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
            "f": "ft"
        }
    },
    tt: {
        label:"tt",
        translationKey: "tt_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 17,
        dataset: {
            "t": "tt"
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
            "s": "sn"
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
            "g": "mg"
        }
    }
};

var fornritAttrs = {
    pos: {
        label: "pos",
        translationKey: "pos_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 1,
        dataset: {
            "l": "lo",
            "n": "no",
            "c": "st",
            "s": "so",
            "r": "fs",
            "t": "to",
            "e": "eo",
            "a": "ao",
            "f": "fn",
            "g": "gr",
            "p": "grm",
            "u": "uh",
            "v": "vf",
            "h": "nhm",
            "x": "xx"
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
            "1": "1pers",
            "2": "2pers",
            "3": "3pers"
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
            "k": "kk",
            "v": "kvk",
            "h": "hvk"
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
            "e": "et",
            "f": "ft"
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
            "n": "nf",
            "o": "þf",
            "þ": "þgf",
            "e": "ef"
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
            "f": "fs",
            "m": "ms",
            "e": "es"
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
            "g": "gm",
            "m": "mm"
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
            "n": "nh",
            "v": "vh",
            "s": "sb",
            "f": "fh",
            "þ": "lhþ",
            "l": "lhn",
            "b": "bh"
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
            "n": "nt",
            "þ": "þt"
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
            "s": "sb",
            "v": "vb",
            "o": "ob"
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
            "o": "þf",
            "þ": "þgf",
            "e": "ef"
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
            "b": "bt",
            "ó": "ót"
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
            "e": "efn",
            "a": "áfn",
            "b": "óáfn",
            "o": "ófn",
            "p": "pfn",
            "s": "sfn",
            "t": "tfn"
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
            "f": "ft"
        }
    },
    tt: {
        label:"tt",
        translationKey: "tt_",
        extendedTemplate: selectType.extendedTemplate,
        extendedController: selectType.extendedController,
        opts: liteOptions,
        order: 17,
        dataset: {
            "t": "tt"
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
            "s": "sn"
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
            "g": "mg"
        }
    }
};

var textasafnSattrs = {
    text_utgafuar: {
        label: "text_release_year",
        order: 10
    },
    text_ritstjorar: {
        label: "text_editors",
        type: "set",
        order: 40
    },
    text_utgefandi: {
        label: "text_publisher",
        order: 30
    },
    text_rit: {
        label: "text_rit",
        order: 20
    },
    text_author: {
        label: "text_author",
        order: 25
    },
    text_datefrom: {
        label: "text_date_from",
        displayType: "hidden"
    },
    text_dateto: {
        label: "text_date_to",
        displayType: "hidden"
    },
    text_timefrom: {
        label: "text_time_from",
        displayType: "hidden"
    },
    text_timeto: {
        label: "text_time_to",
        displayType: "hidden"
    },
    text_date: {
        label: "text_date",
        pattern: '<%=val.substring(6,8)+"-"+val.substring(4,6)+"-"+val.substring(0,4)%>'
    },
    text_title: {
        label: "text_title",
        displayType: "hidden"
    },
    text_sentencecount: {
        label: "text_sentencecount",
        hideExtended: true,
        order: 110
    },
    text_wordcount: {
        label: "text_wordcount",
        hideExtended: true,
        order: 100
    },
    text_paragraphcount: {
        label: "text_paragraphcount",
        hideExtended: true,
        order: 120
    },
    text_translator : {
        label: "text_translator",
        type: "set",
        order: 26
    }
}

var otbSattrs = {
    text_date: textasafnSattrs.text_date,
    text_datefrom: textasafnSattrs.text_datefrom,
    text_dateto: textasafnSattrs.text_dateto,
    text_timefrom: textasafnSattrs.text_timefrom,
    text_author: textasafnSattrs.text_author,
    text_translator: textasafnSattrs.text_translator,
    text_publisher: textasafnSattrs.text_utgefandi,
    text_publishing_place: {
        label: "text_publishing_place",
        hideExtended: true,
        order: 35
    },
    text_wordcount: textasafnSattrs.text_wordcount,
    text_sentencecount: textasafnSattrs.text_sentencecount,
    text_paragraphcount: textasafnSattrs.text_paragraphcount,
    text_title: {
        label: "text_title",
        order: 0
    }
}

var fornritSattrs = {
    text_utgafuar: {
        label: "text_release_year",
        order: 20
    },
    text_ritstjorar: {
        label: "text_editors",
        type: "set",
        order: 40
    },
    text_utgefandi: {
        label: "text_publisher",
        order: 30
    },
    text_rit: {
        label: "text_rit",
        order: 10
    },
    text_titill: {
        label: "text_titill",
        order: 0
    },
    text_sentencecount: {
        label: "text_sentencecount",
        order: 110
    },
    text_wordcount: {
        label: "text_wordcount",
        order: 100
    },
    text_paragraphcount: {
        label: "text_paragraphcount",
        order: 120
    },
    part_title: {
        label: "part_title",
        order: 5
    },
    chapter_n: {
        label: "chapter_no",
        order: 1
    },
    part_ismain: {
        label: "handle_appendix",
        hideSidebar: "true",
        opts: {
            "skip": "=",
            "search_in": "!="
        },
        extendedTemplate: "<br>",
        extendedController: function($scope) {
            $scope.model = $scope.model || "t"
        },
    }
}

module.exports = {
  spWithin,
  spContext,
  modernAttrs,
  modernAttrs2,
  defaultContext,
  attrs,
  sattrs,
  modernAttrsOld,
  setOptions,
  liteOptions,
  lexClassesText,
  readability,
  fsv_aldrelagar,
  fsv_yngrelagar,
  fornritSattrs,
  fornritAttrs,
  icelandicAttrs,
  icelandicSattrs,
  otbSattrs,
  textasafnSattrs,
  otbSattrs,
  icelandicSattrsNoUrl,
  icelandicSAttrsNoDate,
  mimSattrs,
  icelandicCustomAttrs
}
