const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass')(require('sass'));
const postCss = require('gulp-postcss');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
      .pipe(gulpIf(options.dev, sourcemaps.init()))
      .pipe(sass())
      // .pipe(autoprefixer({
      //   overrideBrowserslist: ['last 10 versions'],
      //   cascade: false
      // }))
      .pipe(postCss([
        require('mqpacker')()
      ]))
      .pipe(gulpIf(options.build, csso()))
      .pipe(gulpIf(options.dev, sourcemaps.write('./')))
      .pipe(gulp.dest(options.dest))
  }
};