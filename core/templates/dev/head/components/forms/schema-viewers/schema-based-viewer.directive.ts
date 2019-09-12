// Copyright 2016 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for general schema-based viewers.
 */

require(
  'components/forms/schema-viewers/schema-based-custom-viewer.directive.ts');
require(
  'components/forms/schema-viewers/schema-based-dict-viewer.directive.ts');
require(
  'components/forms/schema-viewers/schema-based-html-viewer.directive.ts');
require(
  'components/forms/schema-viewers/schema-based-list-viewer.directive.ts');
require(
  'components/forms/schema-viewers/schema-based-primitive-viewer.directive.ts');
require(
  'components/forms/schema-viewers/schema-based-unicode-viewer.directive.ts');

require('domain/utilities/UrlInterpolationService.ts');

angular.module('oppia').directive('schemaBasedViewer', [
  'UrlInterpolationService', function(UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        schema: '&',
        localValue: '='
      },
      templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
        '/components/forms/schema-viewers/schema-based-viewer.directive.html'),
      controllerAs: '$ctrl',
      controller: [function() {}]
    };
  }]);