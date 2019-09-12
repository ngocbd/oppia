// Copyright 2018 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for Number with Units rules.
 */

// TODO(#7222): Remove the following block of unnnecessary imports once
// number-with-units-rules.service.ts is upgraded to Angular 8.
import { FractionObjectFactory } from 'domain/objects/FractionObjectFactory';
import { UnitsObjectFactory } from 'domain/objects/UnitsObjectFactory';
// ^^^ This block is to be removed.

require(
  'interactions/NumberWithUnits/directives/' +
  'number-with-units-rules.service.ts');

describe('Number with Units rules service', function() {
  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('FractionObjectFactory', new FractionObjectFactory());
    $provide.value('UnitsObjectFactory', new UnitsObjectFactory());
  }));

  var nurs = null;
  beforeEach(angular.mock.inject(function($injector) {
    nurs = $injector.get('NumberWithUnitsRulesService');
  }));

  var createFractionDict = function(
      isNegative, wholeNumber, numerator, denominator) {
    return {
      isNegative: isNegative,
      wholeNumber: wholeNumber,
      numerator: numerator,
      denominator: denominator
    };
  };

  var createNumberWithUnitsDict = function(
      type, real, fractionDict, unitList) {
    return {
      type: type,
      real: real,
      fraction: fractionDict,
      units: unitList
    };
  };

  var REAL_RULE_INPUT = {
    f: createNumberWithUnitsDict('real', 2, createFractionDict(
      false, 0, 0, 1), [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}])
  };

  var FRACTION_RULE_INPUT = {
    f: createNumberWithUnitsDict('fraction', 0, createFractionDict(
      false, 0, 2, 3), [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}])
  };

  var CURRENCY_RULE_INPUT = {
    f: createNumberWithUnitsDict('real', 2, createFractionDict(
      false, 0, 0, 1), [{unit: 'dollar', exponent: 1}, {unit: 'm',
      exponent: -2}])
  };

  it('should have a correct \'equal to\' rule', function() {
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'real', 2.5, createFractionDict(false, 0, 0, 1),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]
    ), REAL_RULE_INPUT)).toBe(false);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: 2}]
    ), REAL_RULE_INPUT)).toBe(false);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 6, 3),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]), REAL_RULE_INPUT)
    ).toBe(false);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]), REAL_RULE_INPUT)
    ).toBe(true);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 2, 3),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]),
    FRACTION_RULE_INPUT)).toBe(true);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 20, 30),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]),
    FRACTION_RULE_INPUT)).toBe(false);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 2, 3),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: 2}]),
    FRACTION_RULE_INPUT)).toBe(false);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'dollar', exponent: 1}, {unit: 'm', exponent: -2}]),
    CURRENCY_RULE_INPUT)).toBe(true);
    expect(nurs.IsEqualTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'cent', exponent: 1}, {unit: 'm', exponent: -2}]),
    CURRENCY_RULE_INPUT)).toBe(false);
  });

  it('should have a correct \'equivalent to\' rule', function() {
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: 2}]), REAL_RULE_INPUT)
    ).toBe(false);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]), REAL_RULE_INPUT)
    ).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'real', 2000, createFractionDict(false, 0, 0, 1),
      [{unit: 'g', exponent: 1}, {unit: 'm', exponent: -2}]), REAL_RULE_INPUT)
    ).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'real', 0.2, createFractionDict(false, 0, 0, 1),
      [{unit: 'g', exponent: 1}, {unit: 'cm', exponent: -2}]), REAL_RULE_INPUT)
    ).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 4, 2),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]), REAL_RULE_INPUT)
    ).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 20, 30),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]),
    FRACTION_RULE_INPUT)).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 2, 30),
      [{unit: 'g', exponent: 1}, {unit: 'cm', exponent: -2}]),
    FRACTION_RULE_INPUT)).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 2000, 3),
      [{unit: 'g', exponent: 1}, {unit: 'm', exponent: -2}]),
    FRACTION_RULE_INPUT)).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'fraction', 0, createFractionDict(false, 0, 200, 30),
      [{unit: 'kg', exponent: 1}, {unit: 'm', exponent: -2}]),
    FRACTION_RULE_INPUT)).toBe(false);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'real', 2, createFractionDict(false, 0, 0, 1),
      [{unit: 'Dollars', exponent: 1}, {unit: 'm', exponent: -2}]),
    CURRENCY_RULE_INPUT)).toBe(true);
    expect(nurs.IsEquivalentTo(createNumberWithUnitsDict(
      'real', 200, createFractionDict(false, 0, 0, 1),
      [{unit: 'cents', exponent: 1}, {unit: 'm', exponent: -2}]),
    CURRENCY_RULE_INPUT)).toBe(true);
  });
});
