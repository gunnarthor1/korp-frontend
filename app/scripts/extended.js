/** @format */
const korpApp = angular.module("korpApp")
korpApp.factory("extendedComponents", function() {
    const autocompleteTemplate = `\
    <div>
        <input type="text"
               size="37"
               ng-model="input"
               escaper
               typeahead-min-length="0"
               typeahead-input-formatter="typeaheadInputFormatter($model)"
               uib-typeahead="tuple[0] as tuple[1] for tuple in getRows($viewValue)"></input>
    </div>`

    const selectTemplate =
        "<select ng-model='input' escaper ng-options='tuple[0] as tuple[1] for tuple in dataset'></select>"
    const localize = $scope =>
        function(str) {
            if (!$scope.translationKey) {
                return str
            } else {
                return util.getLocaleString(($scope.translationKey || "") + str)
            }
        }

    const selectController = autocomplete => [
        "$scope",
        "structService",
        function($scope, structService) {
            const attribute = $scope.$parent.tokenValue.value
            const selectedCorpora = settings.corpusListing.selected

            // check which corpora support attributes
            const corpora = []
            for (let corpusSettings of selectedCorpora) {
                if (
                    attribute in corpusSettings.structAttributes ||
                    attribute in corpusSettings.attributes
                ) {
                    corpora.push(corpusSettings.id)
                }
            }

            $scope.loading = true
            const opts = { count: false, returnByCorpora: false }
            if ($scope.type === "set") {
                opts.split = true
            }
            structService.getStructValues(corpora, [attribute], opts).then(
                function(data) {
                    $scope.loading = false
                    const localizer = localize($scope)

                    const dataset = _.map(_.uniq(data), function(item) {
                        if (item === "") {
                            return [item, util.getLocaleString("empty")]
                        }
                        return [item, localizer(item)]
                    })
                    $scope.dataset = _.sortBy(dataset, tuple => tuple[1])
                    if (!autocomplete) {
                        $scope.input = $scope.input || $scope.dataset[0][0]
                    }
                },
                () => c.log("struct_values error")
            )

            $scope.getRows = function(input) {
                if (input) {
                    return _.filter(
                        $scope.dataset,
                        tuple => tuple[0].toLowerCase().indexOf(input.toLowerCase()) !== -1
                    )
                } else {
                    return $scope.dataset
                }
            }

            $scope.typeaheadInputFormatter = model => localize($scope)(model)
        }
    ]

    // Select-element. Use the following settings in the corpus:
    // - dataset: an object or an array of values
    // - translationKey: a key that will be prepended to the value for lookup in translation files
    // - escape: boolean, will be used by the escaper-directive
    return {
        datasetSelect: {
            template: selectTemplate,
            controller: [
                "$scope",
                function($scope) {
                    let dataset
                    const localizer = localize($scope)
                    if (_.isArray($scope.dataset)) {
                        dataset = _.map($scope.dataset, item => [item, localizer(item)])
                    } else {
                        dataset = _.map($scope.dataset, (v, k) => [k, localizer(v)])
                    }
                    $scope.dataset = _.sortBy(dataset, tuple => tuple[1])
                    $scope.model = $scope.model || $scope.dataset[0][0]
                }
            ]
        },

        // Select-element. Gets values from "struct_values"-command. Use the following settings in the corpus:
        // - translationKey: a key that will be prepended to the value for lookup in translation files
        // - escape: boolean, will be used by the escaper-directive
        structServiceSelect: {
            template: selectTemplate,
            controller: selectController(false)
        },

        // Autocomplete. Gets values from "struct_values"-command. Use the following settings in the corpus:
        // - translationKey: a key that will be prepended to the value for lookup in translation files
        // - escape: boolean, will be used by the escaper-directive
        structServiceAutocomplete: {
            template: autocompleteTemplate,
            controller: selectController(true)
        },

        // puts the first values from a dataset paramater into model
        singleValue: {
            template: '<input type="hidden">',
            controller: ["$scope", $scope => ($scope.model = _.values($scope.dataset)[0])]
        },

        defaultTemplate: _.template(`\
<input ng-model='input' class='arg_value arg_input' escaper ng-model-options='{debounce : {default : 300, blur : 0}, updateOn: "default blur"}'
<%= maybe_placeholder %>>
<div class="opt_container">
        <span class='val_mod'
            title="{{ title | loc:lang}}"
            ng-click='toggleSensitive()'
            ng-class='{sensitive : case == "sensitive", insensitive : case == "insensitive"}'
            ng-if="orObj.op!='*=' && orObj.op!='!*='">
                Aa
        </span>
<div>\
`
        ),
        defaultController: ["$scope", function($scope) {
            if ($scope.orObj.flags != null ? $scope.orObj.flags.c : undefined) {
                $scope.case = "insensitive"
                $scope.title = "case_insensitive"
            } else {
                $scope.case = "sensitive"
                $scope.title = "case_sensitive"
            }
            $scope.makeSensitive = function() {
                $scope.case = "sensitive"
                $scope.title = "case_sensitive"
                return ($scope.orObj.flags != null ? delete $scope.orObj.flags["c"] : undefined)
            }
            $scope.makeInsensitive = function() {
                const flags = ($scope.orObj.flags || {})
                flags["c"] = true
                $scope.orObj.flags = flags

                $scope.case = "insensitive"
                return $scope.title = "case_insensitive"
            }
            $scope.toggleSensitive = function() {
                if ($scope.case === "sensitive") {
                    return $scope.makeInsensitive()
                } else {
                    return $scope.makeSensitive()
                }
            }
            $scope.makeInsensitive() // Default is case insensitive
            $scope.$watch("orObj.op", function() {
                if (['*=', '!*='].includes($scope.orObj.op)) {
                    return $scope.makeSensitive()
                } else {
                    return $scope.makeInsensitive()
                }
            })
            return $scope.updateValue = function() {
                $scope.orObj.op = '*='
                $scope.orObj.val = '.*'
                return $scope.input = $scope.orObj.val
            }
        }
        ]
    }
})
