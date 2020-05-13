/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const plusImg = require("../img/plus.png");

korpApp.directive("globalFilters", globalFilterService => ({
    restrict: "E",

    scope: {
        lang: '='
    },

    template: `\
<div ng-if="dataObj.showDirective" class="global-filters-container">
  <span style="font-weight: bold;"> {{ 'global_filter' | loc:lang}}:</span>
  <div style="display: inline-block">
      <span ng-repeat="filterKey in dataObj.selectedFilters">
          <global-filter lang="lang" attr="filterKey"
                         attr-value="dataObj.filterValues[filterKey].value",
                         attr-label="getFilterLabel(filterKey)",
                         possible-values="dataObj.filterValues[filterKey].possibleValues"
                         translation-key="getTranslationKey(filterKey)"
                         closeable="isOptionalFilter(filterKey)"/>
          <span ng-if="getAvailableFilters().length !== 0 || !$last">{{"and" | loc:lang}}</span>
       </span>

       <span uib-dropdown auto-close="outsideClick" ng-if="getAvailableFilters().length !== 0">
         <span uib-dropdown-toggle style="vertical-align: sub;">
            <img src="#{plusImg}">
         </span>
         <div uib-dropdown-menu class="korp-uib-dropdown-menu">
           <ul>
             <li ng-repeat="value in getAvailableFilters()" ng-click="addNewFilter(value)" class="attribute">
               <span>{{getFilterLabel(value) | loc:lang }}</span>
             </li>
           </ul>
         </div>
       </span>
       <span style="margin-left: 5px; vertical-align: top;" ng-if="dataObj.selectedFilters.length == 0">Välj ett filter</span>

   </div>
   <div ng-if="false">
       <img src="#{plusImg}">
       <span style="font-weight: bold" > {{'add_filter' | loc:lang}}</span>
   </div>
</div>`,

    link(scope, element, attribute) {

        globalFilterService.registerScope(scope);

        scope.dataObj =
            {showDirective: false};

        scope.update = dataObj => scope.dataObj = dataObj;

        scope.getFilterLabel = filterKey => scope.dataObj.attributes[filterKey].settings.label;

        scope.getTranslationKey = filterKey => scope.dataObj.attributes[filterKey].settings.translationKey || "";

        scope.removeFilter = filter => globalFilterService.removeFilter(filter);

        scope.getAvailableFilters = () => _.filter(scope.dataObj.optionalFilters, filter => !Array.from(scope.dataObj.selectedFilters).includes(filter));

        scope.isOptionalFilter = filterKey => (scope.dataObj.optionalFilters.indexOf(filterKey) > -1) && (scope.dataObj.defaultFilters.indexOf(filterKey) === -1);

        return scope.addNewFilter = value => globalFilterService.addNewFilter(value, true);
    }
}));

korpApp.directive("globalFilter", globalFilterService => ({
    restrict: "E",

    scope: {
      attr: "=",
      attrLabel: "=",
      attrValue: "=",
      possibleValues: "=",
      lang: "=",
      translationKey: "=",
      closeable: "="
  },

    template: `\
<span uib-dropdown auto-close="outsideClick" on-toggle="dropdownToggle(open)">
  <button uib-dropdown-toggle class="btn btn-sm btn-default global-filter-toggle">
    <span ng-if="attrValue.length == 0">
      <span>{{ "add_filter_value" | loc:lang }}</span>
      <span>{{attrLabel | loc:lang}}</span>
    </span>
    <span ng-if="attrValue.length != 0">
      <span style="text-transform: capitalize">{{attrLabel | loc:lang}}:</span>
      <span ng-repeat="selected in attrValue" class="selected-attr-value">{{translationKey + selected | loc:lang }} </span>
    </span>
    <i ng-if="closeable" class="close_btn fa fa-times-circle-o fa-1" ng-click="removeFilter($event)" />
  </button>
  <div uib-dropdown-menu class="korp-uib-dropdown-menu">
    <ul>
      <li ng-repeat="value in possibleValues" ng-class="selected" class="attribute"
          ng-click="toggleSelected(value[0], $event)"
          ng-if="isSelectedList(value[0])">
        <span ng-if="isSelected(value[0])">✔</span>
        <span>{{translationKey + value[0] | loc:lang }}</span>
        <span style="font-size: x-small;">{{value[1]}}</span>
      </li>
      <li ng-repeat="value in possibleValues" class="attribute"
          ng-click="toggleSelected(value[0], $event)"
          ng-if="!isSelectedList(value[0]) && value[1] > 0">
        <span ng-if="isSelected(value[0])">✔</span>
        <span>{{translationKey + value[0] | loc:lang }}</span>
        <span style="font-size: x-small;">{{value[1]}}</span>
      </li>
      <li ng-repeat="value in possibleValues" class="attribute disabled"
          ng-if="!isSelectedList(value[0]) && value[1] == 0"
          >
        <span>{{translationKey + value[0] | loc:lang }}</span>
        <span style="font-size: x-small;">{{value[1]}}</span>
      </li>
    </ul>
  </div>
</span>`,

    link(scope, element, attribute) {

        // if scope.possibleValues.length > 20
        //     # TODO enable autocomplete

        scope.selected = _.clone(scope.attrValue);
        scope.dropdownToggle = function(open) {
            if (!open) {
                scope.selected = [];
                return Array.from(scope.attrValue).map((value) =>
                    scope.selected.push(value));
            }
        };

        scope.toggleSelected = function(value, event) {
            if (Array.from(scope.attrValue).includes(value)) {
                __.remove(scope.attrValue, value);
            } else {
                scope.attrValue.push(value);
            }
            event.stopPropagation();
            return globalFilterService.valueChange(scope.attr);
        };

        scope.isSelected = value => Array.from(scope.attrValue).includes(value);

        scope.isSelectedList = value => Array.from(scope.selected).includes(value);

        return scope.removeFilter = function(event) {
            event.stopPropagation();
            return scope.$parent.removeFilter(scope.attr);
        };
    }
}));
