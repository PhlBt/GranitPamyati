const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack-stream');

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
      .pipe(webpack({
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'main.js'
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        },
        mode: options.dev ? 'development' : 'production',
        devtool: options.dev ? 'eval-source-map' : 'none'
      }))
      .pipe(gulp.dest('./build/'))
  }
};