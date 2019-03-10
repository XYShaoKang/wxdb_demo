const { series, watch, src, dest } = require('gulp')
const changed = require('gulp-changed')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')
const webpack = require('webpack-stream')

const webpackConfig = require('./webpack.config.js')
const generateFragmentTypes = require('./client/generate-fragment-types.exec')
const { PORT: API_PORT } = require('./server/config')

const API_HOST = `http://localhost:${API_PORT}`

async function serve(cb) {
  await nodemon({
    script: 'server/src/app.js',
    exec:
      './node_modules/.bin/babel-node --config-file ./babel.config.server.js',
    ignore: ['gulpfile.js', 'node_modules/', 'public/**/*.*', 'client/**/*.*'],
    ext: 'js,json',
    watch: ['server/src/**/*'],
    stdout: false,
  }).on('readable', function(data) {
    this.stdout.on('data', function(chunk) {
      process.stdout.write(chunk)
      if (/Server ready/.test(chunk)) {
        generateFragmentTypes(API_HOST)
      }
    })
  })
}

async function browser() {
  await browserSync.init(
    {
      proxy: API_HOST,
      files: ['public/**/*.*'],
      port: 8080,
    },
    function() {
      console.log('browser refreshed')
    },
  )
}

function client() {
  return src('client/index.js')
    .pipe(changed('client'))
    .pipe(
      webpack({
        config: webpackConfig,
      }),
    )
    .pipe(dest('public/'))
}

watch(['client/**/*.*'], client)

exports.default = series(serve, client, browser)
