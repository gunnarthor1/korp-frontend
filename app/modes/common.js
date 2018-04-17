settings.senseAutoComplete = "<autoc model='model' placeholder='placeholder' type='sense'/>";

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
        pattern: '<%=val.substring(6,8)+"-"+val.substring(4,6)+"-"+val.substring(0,4)%>'
    },
    text_midill: {
        label: "text_midill",
        hideExtended: "true"
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
};


var icelandicSattrsNoUrl = {
    text_author: {
        label: "text_author"
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
        pattern: '<%=val.substring(6,8)+"-"+val.substring(4,6)+"-"+val.substring(0,4)%>'
    },
    text_midill: {
        label: "text_midill",
        hideExtended: "true"
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
        pattern: "<p><span rel='localize[text_title]'></span>: <a target='_blank' href='<%=struct_attrs.text_url%>'><%=struct_attrs.text_title%></a></p>"
    },
    article_nourl: {
        label: 'article',
        customType: 'struct',
        pattern: "<p><span rel='localize[text_title]'></span>: <%=struct_attrs.text_title%></p>"
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
    text_author: {
        label: "text_author",
        hideSidebar: "true"
    },
    text_midill: icelandicSattrs.text_midill,
    text_wordcount: icelandicSattrs.text_wordcount,
    text_id_midill: icelandicSattrs.text_id_midill,
    text_title: icelandicSattrs.text_title,
    text_url: icelandicSattrs.text_url,
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
