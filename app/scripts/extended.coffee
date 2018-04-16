korpApp = angular.module("korpApp")
korpApp.factory "extendedComponents", () ->
    autocompleteTemplate = """
        <div>
            <input type="text"
                   size="37"
                   ng-model="input"
                   escaper
                   typeahead-min-length="0"
                   typeahead-input-formatter="typeaheadInputFormatter($model)"
                   uib-typeahead="tuple[0] as tuple[1] for tuple in getRows($viewValue)"></input>
        </div>
    """
    selectTemplate = "<select ng-model='input' escaper ng-options='tuple[0] as tuple[1] for tuple in dataset'></select>"
    localize = ($scope) ->
        return (str) ->
            if not $scope.translationKey
                return str
            else
                return util.getLocaleString( ($scope.translationKey or "") + str)

    selectController = (autocomplete) -> ["$scope", "structService", ($scope, structService) ->
        attribute = $scope.$parent.tokenValue.value
        selectedCorpora = settings.corpusListing.selected

        # check which corpora support attributes
        corpora = []
        for corpusSettings in selectedCorpora
            if attribute of corpusSettings.structAttributes or (attribute of corpusSettings.attributes)
                corpora.push corpusSettings.id

        $scope.loading = true
        structService.getStructValues(corpora, [attribute], {count: false, returnByCorpora: false}).then((data) ->
            $scope.loading = false
            localizer = localize($scope)
            dataset = _.map data, (item) -> return [item, localizer item]
            $scope.dataset = _.sortBy dataset, (tuple) -> return tuple[1]
            if not autocomplete
                $scope.input = $scope.input or $scope.dataset[0][0]
        , () ->
            c.log "struct_values error"
        )

        $scope.getRows = (input) ->
            if input
                return _.filter $scope.dataset, (tuple) -> tuple[0].toLowerCase().indexOf(input.toLowerCase()) != -1
            else
                return $scope.dataset

        $scope.typeaheadInputFormatter = (model) ->
            return localize($scope) model
    ]

    # Select-element. Use the following settings in the corpus:
    # - dataset: an object or an array of values
    # - translationKey: a key that will be prepended to the value for lookup in translation files
    # - escape: boolean, will be used by the escaper-directive
    datasetSelect:
        template: selectTemplate
        controller: ["$scope", ($scope) ->
            localizer = localize($scope)
            if _.isArray $scope.dataset
                dataset = _.map $scope.dataset, (item) -> return [item, localizer item]
            else
                dataset = _.map $scope.dataset, (v, k) -> return [k, localizer v]
            $scope.dataset = _.sortBy dataset, (tuple) -> return tuple[1]
            $scope.model = $scope.model or $scope.dataset[0][0]
        ]

    # Select-element. Gets values from "struct_values"-command. Use the following settings in the corpus:
    # - translationKey: a key that will be prepended to the value for lookup in translation files
    # - escape: boolean, will be used by the escaper-directive
    structServiceSelect:
        template: selectTemplate
        controller: selectController false

    # Autocomplete. Gets values from "struct_values"-command. Use the following settings in the corpus:
    # - translationKey: a key that will be prepended to the value for lookup in translation files
    # - escape: boolean, will be used by the escaper-directive
    structServiceAutocomplete:
        template: autocompleteTemplate
        controller: selectController true


    # puts the first values from a dataset paramater into model
    singleValue:
        template: '<input type="hidden">'
        controller: ["$scope", ($scope) ->
            $scope.model = _.values($scope.dataset)[0]
        ]

    defaultTemplate: _.template """
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
                <div>
                """
    defaultController: ["$scope", ($scope) ->
        if $scope.orObj.flags?.c
            $scope.case = "insensitive"
            $scope.title = "case_insensitive"
        else
            $scope.case = "sensitive"
            $scope.title = "case_sensitive"
        $scope.makeSensitive = () ->
            $scope.case = "sensitive"
            $scope.title = "case_sensitive"
            delete $scope.orObj.flags?["c"]
        $scope.makeInsensitive = () ->
            flags = ($scope.orObj.flags or {})
            flags["c"] = true
            $scope.orObj.flags = flags

            $scope.case = "insensitive"
            $scope.title = "case_insensitive"
        $scope.toggleSensitive = () ->
            if $scope.case == "sensitive"
                $scope.makeInsensitive()
            else
                $scope.makeSensitive()
        $scope.makeInsensitive() # Default is case insensitive
        $scope.$watch "orObj.op", () ->
            if $scope.orObj.op in ['*=', '!*=']
                $scope.makeSensitive()
            else
                $scope.makeInsensitive()
        $scope.updateValue = () ->
            $scope.orObj.op = '*='
            $scope.orObj.val = '.*'
            $scope.input = $scope.orObj.val
    ]
