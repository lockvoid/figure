'use strict';

let autoprefixer = require('autoprefixer');
let cprocess = require('child_process');
let del = require('del');
let dotenv = require('dotenv');
let precss = require('precss')
let typescript = require('typescript');
let gulp = require('gulp');
let postcss = require('gulp-postcss');
let preprocess = require('gulp-preprocess');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');

dotenv.load();

gulp.task('default', gulp.series(clean, buildServer, startServer, gulp.parallel(watchServer)));

function clean() {
  return del('dist');
}

// Build

let serverProject = ts.createProject('app/server/tsconfig.json', { typescript: typescript });
var serverProcess = null;

function buildServer() {
  let result = gulp.src('{app/server,lib}/**/*.{ts,tsx}').pipe(sourcemaps.init()).pipe(preprocess({ context: { SERVER: true } })).pipe(ts(serverProject));

  return result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist/server'));
}

function watchServer() {
  gulp.watch('{app/server,lib}/**/*.{ts,tsx}', gulp.series(gulp.parallel(buildServer, closeServer), startServer));
}

function startServer(done) {
  serverProcess = cprocess.spawn('node', ['bin/web'], { stdio: 'inherit' });
  done();
}

function closeServer(done) {
  serverProcess && serverProcess.kill();
  done();
}
