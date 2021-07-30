const gulp = require('gulp');
const gulpIf = require('gulp-if');
const isBuild = (process.argv.includes('--build'));
const isDev = !isBuild;

function lazyRequireTask(taskName, path, options) {
  options = options || {};

  gulp.task(taskName, function (callback) {
    let task = require(path).call(this, options);
    return task(callback)
  })
}

const tasks = [
  {
    name: 'ejs',
    path: './gulp-tasks/ejs',
    options: {
      src: 'src/*.ejs',
      dest: 'build/'
    }
  },
  {
    name: 'sass',
    path: './gulp-tasks/sass',
    options: {
      src: 'src/assets/style.scss',
      dest: 'build/css/',
      dev: isDev,
      build: isBuild
    }
  },
  {
    name: 'js',
    path: './gulp-tasks/js',
    options: {
      src: 'src/assets/main.js',
      dest: 'build/css/',
      dev: isDev,
      build: isBuild
    }
  },
  {
    name: 'static',
    path: './gulp-tasks/static',
    options: {
      src: 'src/static/*.*',
      dest: 'build/static/'
    }
  },
  {
    name: 'clear',
    path: './gulp-tasks/clear',
    options: {
      src: 'build'
    }
  },
  {
    name: 'clear:cache',
    path: './gulp-tasks/clear-cache'
  },
  {
    name: 'serve',
    path: './gulp-tasks/serve',
    options: {
      server: 'build'
    }
  },
];

tasks.forEach(item => lazyRequireTask(item.name, item.path, item.options));

gulp.task('watch', function () {
  gulp.watch('src/**/*.ejs', gulp.series('ejs'));
  gulp.watch('src/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.js', gulp.series('js'));
});

gulp.task('default', gulpIf(isBuild,
  gulp.series(
    'clear',
    gulp.parallel('ejs', 'sass', 'js', 'static')
  ),
  gulp.series(
    'clear',
    gulp.parallel('ejs', 'sass', 'js', 'static'),
    gulp.parallel('watch', 'serve')
  )
));