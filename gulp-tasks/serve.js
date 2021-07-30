const browserSync = require('browser-sync').create();

module.exports = function (options) {
  return function () {
    browserSync.init({
      server: options.server,
      notify: false
    });
    browserSync.watch(`${options.server}/**/*.*`).on('change', browserSync.reload)
  }
};