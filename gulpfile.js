'use strict';

let autoprefixer = require('autoprefixer');
let cprocess = require('child_process');
let del = require('del');
let dotenv = require('dotenv');
let gulp = require('gulp');
let jspm = require('jspm');
let precss = require('precss')
let cssnano = require('gulp-cssnano');
let postcss = require('gulp-postcss');
let preprocess = require('gulp-preprocess');
let replace = require('gulp-rev-replace');
let rev = require('gulp-rev');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');
let typescript = require('typescript');

dotenv.load();

let buildTasks = gulp.parallel(buildServer, buildClient, buildCss, copyImages, copyFonts);

gulp.task('default', gulp.series(clean, buildTasks, startServer, gulp.parallel(watchServer, watchClient, watchPublic)));

gulp.task('release', gulp.series(clean, buildTasks, gulp.parallel(bundleClient, minifyCss), revPublic, repPublic));

function clean() {
  return del('dist');
}

// Server

let serverProject = ts.createProject('app/server/tsconfig.json', { typescript: typescript });
var serverProcess = null;

function buildServer() {
  let source = ['{app/server,lib}/**/*.{ts,tsx}', 'typings/main.d.ts'];
  let result = gulp.src(source).pipe(sourcemaps.init()).pipe(preprocess({ context: { SERVER: true }, includeBase: __dirname })).pipe(ts(serverProject));

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

let clientProject = ts.createProject('app/client/tsconfig.json', { typescript: typescript });

function buildClient() {
  let source = ['{app/client,lib}/**/*.{ts,tsx}', 'typings/browser.d.ts'];
  let result = gulp.src(source).pipe(sourcemaps.init()).pipe(preprocess({ context: { CLIENT: true }, includeBase: __dirname })).pipe(ts(clientProject));

  return result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist/client'));
}

function watchClient() {
  gulp.watch('{app/client,lib}/**/*.{ts,tsx}', buildClient);
}

function bundleClient() {
  return jspm.bundleSFX('dist/client/app/client/app', 'dist/public/app.js', { minify: true, sourceMaps: true});
}

// Public

function buildCss() {
  let manifests = ['public/css/**/*.css', '!public/css/**/_*.css'];

  return gulp.src(manifests).pipe(sourcemaps.init()).pipe(postcss([precss, autoprefixer])).pipe(sourcemaps.write()).pipe(gulp.dest('dist/public'));
}

function minifyCss() {
  return gulp.src('dist/**/*.css').pipe(sourcemaps.init()).pipe(cssnano()).pipe(sourcemaps.write('.')).pipe(gulp.dest('dist'));
}

function copyImages() {
  return gulp.src('public/images/**/*.jpg').pipe(gulp.dest('dist/public'));
}

function copyFonts() {
  return gulp.src('public/fonts/**/*.woff').pipe(gulp.dest('dist/public'));
}

function watchPublic() {
  gulp.watch('public/css/**/*.css', buildCss);
  gulp.watch('public/fonts/**/*.woff', copyFonts);
  gulp.watch('public/images/**/*.jpg', copyImages);
}

function revPublic() {
  return gulp.src('dist/public/**').pipe(rev()).pipe(gulp.dest('dist/public')).pipe(rev.manifest({ path: 'manifest.json' })).pipe(gulp.dest('dist/public'));
}

function repPublic() {
  const manifest = gulp.src('dist/public/manifest.json');
  return gulp.src('dist/public/**/*.css').pipe(replace({ manifest: manifest })).pipe(gulp.dest('dist/public'))
}
