const cache = require('gulp-cache');

module.exports = function () {
  return function () {
    return cache.clearAll()
  }
};