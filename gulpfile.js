'use strict';

const autoprefixer = require('autoprefixer');
const cprocess = require('child_process');
const del = require('del');
const dotenv = require('dotenv');
const gulp = require('gulp');
const jspm = require('jspm');
const precss = require('precss')
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const preprocess = require('gulp-preprocess');
const replace = require('gulp-rev-replace');
const rev = require('gulp-rev');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const typescript = require('typescript');
const uglify = require('gulp-uglify');

dotenv.load();

const buildTasks = gulp.parallel(buildServer, buildClient, buildCss, buildJs, copyAssets);

const watchTasks = gulp.parallel(watchServer, watchClient, watchCss, watchJs, watchAssets);

gulp.task('default', gulp.series(clean, buildTasks, gulp.parallel(startWeb, startWorker), watchTasks));

gulp.task('release', gulp.series(clean, buildTasks, gulp.parallel(bundleClient, minifyCss, minifyJs), revPublic, repPublic));

function clean() {
  return del('dist');
}

// Start

var webProcess = null;
var workerProcess = null;

function startWeb(done) {
  if (!webProcess) {
    webProcess = cprocess.spawn('node', ['--harmony_destructuring', '--harmony_default_parameters', '--harmony_rest_parameters', 'bin/web'], { stdio: 'inherit' });
  }

  done();
}

function killWeb(done) {
  if (webProcess) {
    webProcess.once('close', done);
    webProcess.kill();
  }

  webProcess = null;
}

function startWorker(done) {
  if (!workerProcess) {
    workerProcess = cprocess.spawn('node', ['--harmony_destructuring', '--harmony_default_parameters', '--harmony_rest_parameters', 'bin/worker'], { stdio: 'inherit' });
  }

  done();
}

function killWorker(done) {
  if (workerProcess) {
    workerProcess.once('close', done);
    workerProcess.kill();
  }

  workerProcess = null;
}

// Server

const serverProject = ts.createProject('app/server/tsconfig.json', { typescript: typescript });

function buildServer() {
  const source = ['{app/server,lib}/**/*.{ts,tsx}', 'typings/main.d.ts'];
  const result = gulp.src(source).pipe(sourcemaps.init()).pipe(preprocess({ context: { NODE_BUILD: true }, includeBase: __dirname })).pipe(ts(serverProject));

  return result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist/server'));
}

function watchServer() {
  gulp.watch('{app/server,lib}/**/*.{ts,tsx}', gulp.series(gulp.parallel(buildServer, killWeb, killWorker), gulp.parallel(startWeb, startWorker)));
}

// Client

const clientProject = ts.createProject('app/client/tsconfig.json', { typescript: typescript });

function buildClient() {
  const source = ['{app/client,lib}/**/*.{ts,tsx}', 'typings/browser.d.ts'];
  const result = gulp.src(source).pipe(sourcemaps.init()).pipe(preprocess({ includeBase: __dirname })).pipe(ts(clientProject));

  return result.js.pipe(babel({ presets: ['es2015'] })).pipe(sourcemaps.write()).pipe(gulp.dest('dist/client'));
}

function watchClient() {
  gulp.watch('{app/client,lib}/**/*.{ts,tsx}', buildClient);
}

function bundleClient() {
  return jspm.bundleSFX('babel-polyfill + dist/client/app/client/client', 'dist/public/app.js', { minify: true, sourceMaps: true});
}

// Public

function buildCss() {
  let manifests = ['public/css/**/*.css', '!public/css/**/_*.css'];

  return gulp.src(manifests).pipe(sourcemaps.init()).pipe(postcss([precss, autoprefixer])).pipe(sourcemaps.write()).pipe(gulp.dest('dist/public'));
}

function minifyCss() {
  return gulp.src('dist/public/**/*.css').pipe(sourcemaps.init()).pipe(cssnano()).pipe(sourcemaps.write('.')).pipe(gulp.dest('dist/public'));
}

function watchCss() {
  gulp.watch('public/css/**/*.css', buildCss);
}

function watchJs() {
  gulp.watch('public/js/**/*.js', buildJs);
}

function copyAssets() {
  return gulp.src('public/{images,fonts}/**/*.{jpg,woff}').pipe(gulp.dest('dist/public'));
}

function watchAssets() {
  gulp.watch('public/{images,fonts}/**/*.{jpg,woff}', copyAssets);
}

function buildJs() {
  return gulp.src('public/js/**/*.js').pipe(sourcemaps.init()).pipe(babel({ presets: ['es2015'] })).pipe(sourcemaps.write()).pipe(gulp.dest('dist/public'));
}

function minifyJs() {
  return gulp.src('dist/public/**/*.js').pipe(uglify()).pipe(gulp.dest('dist/public'));
}

function watchJs() {
  gulp.watch('public/js/**/*.js', buildJs);
}

function copyAssets() {
  return gulp.src('public/{images,fonts}/**/*.{jpg,woff}').pipe(gulp.dest('dist/public'));
}

function watchAssets() {
  gulp.watch('public/{images,fonts}/**/*.{jpg,woff}', copyAssets);
}

function revPublic() {
  return gulp.src('dist/public/**').pipe(rev()).pipe(gulp.dest('dist/public')).pipe(rev.manifest({ path: 'manifest.json' })).pipe(gulp.dest('dist/public'));
}

function repPublic() {
  return gulp.src('dist/public/**/*.css').pipe(replace({ manifest: gulp.src('dist/public/manifest.json') })).pipe(gulp.dest('dist/public'))
}
