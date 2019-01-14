const { series, watch, src, dest } = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')
const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

function serve(cb) {
  nodemon({
    script: 'server/app.js',
    ignore: ['gulpfile.js', 'node_modules/', 'public/**/*.*', 'client/**/*.*'],
  }).on('start', function() {
    browserSync.init(
      {
        proxy: 'http://localhost:3000',
        files: ['public/**/*.*'],
        port: 8080,
      },
      function() {
        console.log('browser refreshed')
      },
    )
  })
}

function client() {
  return src('client/index.js')
    .pipe(
      webpack({
        config: webpackConfig,
      }),
    )
    .pipe(dest('public/'))
}

watch(['client/**/*.*'], client)

exports.default = series(client, serve)
