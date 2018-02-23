'use strict';

const assert = require('chai').assert;
const contentId = require('../index');

describe('contentid#pad', function() {
  it('should pad a string less than 11 chars', function() {
    assert.equal(contentId.pad('123456'), '00000123456');
  });
  it('should not pad a string has 11 chars', function() {
    assert.equal(contentId.pad('12345678901'), '12345678901');
  });
});

describe('contentid#escape', function() {
  it('should return empty string if the parameter is null', function() {
    assert.equal(contentId.escape(null), '');
  });
  it('should return empty string if the parameter is empty', function() {
    assert.equal(contentId.escape(''), '');
  });
  it('should return empty string if the parameter has nothing more than spaces', function() {
    assert.equal(contentId.escape('   '), '');
  });
  it('should return an uppercase char if the parameter has one allowed char only', function() {
    assert.equal(contentId.escape('a'), 'A');
  });
  it('should return an underscore if the parameter has one not-allowed char only', function() {
    assert.equal(contentId.escape('#'), '_');
  });
  it('should return the original string if the parameter has allowed chars only', function() {
    assert.equal(contentId.escape('abc'), 'abc');
    assert.equal(contentId.escape('ABC'), 'ABC');
    assert.equal(contentId.escape('Abc'), 'Abc');
    assert.equal(contentId.escape('abc-def'), 'abc-def');
    assert.equal(contentId.escape('abc-def_ghi.jkl'), 'abc-def_ghi.jkl');
  });
  it('should handle the parameter if it contains not-allowed chars', function() {
    assert.equal(contentId.escape('abc-def_ghi.jkl#mno pqrßtuv~wxy汉z'), 'abc-def_ghi.jklMnoPqrTuv__wxyZ');
  });
  it('should handle the leading and trailing spaces', function() {
    assert.equal(contentId.escape('  abc-def_ghi.jkl#mno pqrßtuv~wxy汉z   '), 'abc-def_ghi.jklMnoPqrTuv__wxyZ');
  });
});

describe('contentid#assemble', function() {
  it('should escape the 2nd parameter', function() {
    assert.equal(contentId.assemble('escenic', ' provider name-here', 'articleId'),
      'escenic~providerName-here~articleId');
  });
  it('should left padding the 3rd component if it is an integer', function() {
    assert.equal(contentId.assemble('escenic', 'provider', 123456),
      'escenic~provider~00000123456');
  });
});
