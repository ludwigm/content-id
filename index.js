'use strict';

/**
 * Make a string "URL safe", which means it contains only A-Z, a-z, 0-9, -, _, .
 *
 * @param {string|null|object}source
 * @return {string}
 */
function escape(source) {
  let result;
  if (source == null) {
    return '';
  }
  if (typeof source !== 'string' && !(source instanceof String)) {
    if (typeof source.toString === 'function') {
      result = source.toString();
    } else {
      return '';
    }
  } else {
    result = source.trim();
  }
  if (result.length === 0) {
    return '';
  }
  if (result.length === 1) {
    return result.toUpperCase().replace(/^[^A-Za-z0-9\-_.]$/, '_');
  }
  result = result
    .replace(/~/gi, '__')
    .replace(/[^A-Za-z0-9\-_.]+(\w|$)/g, (m, p1) => p1.toUpperCase());

  return result;
}

/**
 * Left adding for a string by adding '0' as prefix until 11 digits
 *
 * @param {string}source   string to pad
 * @return {string} with left padding
 *
 */
function pad(source) {
  let result = source;
  for (let i = source.length; i < 11; i += 1) {
    result = '0' + result;
  }
  return result;
}

/**
 * Concatenate the three components with '~' as the separator.
 *
 * @param {string}source
 * @param {string}provider
 * @param {string|number}articleId
 * @return {string}
 */
function assemble(source, provider, articleId) {
  return `${source.trim()}~${provider.trim()}~${Number.isInteger(articleId) ? pad('' + articleId) : articleId.trim()}`;
}

module.exports = {
  assemble,
  escape,
  pad,
};
