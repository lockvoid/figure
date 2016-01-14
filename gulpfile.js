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

let buildTasks = gulp.parallel(buildServer, buildClient, buildCss, copyImages, copyFonts);
let watchTasks = gulp.parallel(watchServer, watchClient, watchPublic);

gulp.task('default', gulp.series(clean, buildTasks, startServer, watchTasks));

function clean() {
  return del('dist');
}

// Server

let serverProject = ts.createProject('app/server/tsconfig.json', { typescript: typescript });
var serverProcess = null;

function buildServer() {
  let source = ['{app/server,lib}/**/*.{ts,tsx}', 'typings/main.d.ts'];
  let result = gulp.src(source).pipe(sourcemaps.init()).pipe(preprocess({ context: { SERVER: true } })).pipe(ts(serverProject));

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

// Client
//
let clientProject = ts.createProject('app/client/tsconfig.json', { typescript: typescript });

function buildClient() {
  let source = ['{app/client,lib}/**/*.{ts,tsx}', 'typings/browser.d.ts'];
  let result = gulp.src(source).pipe(sourcemaps.init()).pipe(preprocess({ context: { CLIENT: true } })).pipe(ts(clientProject));

  return result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist/client'));
}

function watchClient() {
  gulp.watch('{app/client,lib}/**/*.{ts,tsx}', buildClient);
}

// Public

function buildCss() {
  let manifests = ['public/css/**/*.css', '!public/css/**/_*.css'];

  return gulp.src(manifests).pipe(sourcemaps.init()).pipe(postcss([precss, autoprefixer])).pipe(sourcemaps.write()).pipe(gulp.dest('dist/public'));
}

function copyImages() {
  return gulp.src('public/images/**/*.{png,svg,jpg}').pipe(gulp.dest('dist/public'));
}

function copyFonts() {
  return gulp.src('public/fonts/**/*.woff').pipe(gulp.dest('dist/public'));
}

function watchPublic() {
  gulp.watch('public/css/**/*.css', buildCss);
  gulp.watch('public/images/**/*.{png,svg,jpg}', copyImages);
  gulp.watch('public/fonts/**/*.woff', copyFonts);
}
