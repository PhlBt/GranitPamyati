const gulp = require('gulp');
const rename = require('gulp-rename')
const ejs = require('gulp-ejs');

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
      .pipe(ejs())
      .pipe(rename({extname: '.html'}))
      .pipe(gulp.dest(options.dest))
  }
};