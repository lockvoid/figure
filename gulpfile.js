'use strict';

const autoprefixer = require('autoprefixer');
const cprocess = require('child_process');
const del = require('del');
const dotenv = require('dotenv');
const fs = require('fs-extra');
const gulp = require('gulp');
const jspm = require('jspm');
const path = require('path');
const postcssModules = require('postcss-modules');
const precss = require('precss')
const babel = require('gulp-babel');
const concat = require('gulp-concat');
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

const buildTasks = gulp.parallel(buildServer, buildClient, buildCss, copyAssets);

const watchTasks = gulp.parallel(watchServer, watchClient, watchCss, watchAssets);

gulp.task('default', gulp.series(clean, buildTasks, gulp.parallel(startWeb, startWorker), watchTasks));

gulp.task('release', gulp.series(clean, buildTasks, gulp.parallel(bundleClient, minifyCss), revPublic, revPublic));

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
  gulp.watch('{app/server,lib}/**/*.{ts,tsx,css}', gulp.series(gulp.parallel(buildServer, killWeb, killWorker), gulp.parallel(startWeb, startWorker)));
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
  return jspm.bundleSFX('babel-polyfill + dist/client/app/client/client', 'dist/public/app.js', { runtime: false, minify: true, sourceMaps: true});
}

// Public

function buildCss() {
  const paths = (css, opts) => {
    const STYLES_REGEX = '@styles';
    const relativeStylesPath = `${path.relative(path.dirname(css.source.input.file), '.')}/lib/styles`;

    css.walkAtRules('value', rule => {
      rule.params = rule.params.replace(STYLES_REGEX, relativeStylesPath);
    });

    css.walkDecls('composes', decl => {
      decl.value = decl.value.replace(STYLES_REGEX, relativeStylesPath);
    });
  };

  const modules = postcssModules({
    getJSON: (cssPath, json) => {
      const relativeCssPath = path.relative('.', cssPath);
      const resolveDestPath = (kind) => path.resolve('./', `${path.join(kind, relativeCssPath)}.json`);

      if (relativeCssPath.startsWith('app/server')) {
        fs.outputJsonSync(resolveDestPath('dist/server'), json);
      }

      if (relativeCssPath.startsWith('app/client')) {
        fs.outputJsonSync(resolveDestPath('dist/client'), json);
      }

      if (relativeCssPath.startsWith('lib/components')) {
        fs.outputJsonSync(resolveDestPath('dist/client'), json);
        fs.outputJsonSync(resolveDestPath('dist/server'), json);
      }
    }
  });

  const cssMasks = ['{app/client,app/server,lib/components,public/css}/**/*.css', '!**/_*.css'];

  return gulp.src(cssMasks).pipe(sourcemaps.init()).pipe(postcss([paths, precss, modules, autoprefixer])).pipe(sourcemaps.write()).pipe(gulp.dest('dist/public/css'));
}

function minifyCss() {
  return gulp.src('dist/**/*.css').pipe(concat('app.css')).pipe(sourcemaps.init()).pipe(cssnano()).pipe(sourcemaps.write('.')).pipe(gulp.dest('dist/public'));
}

function watchCss() {
  gulp.watch('{app,public,lib}/**/*.css', buildCss);
}

function copyAssets() {
  return gulp.src('public/{images,fonts}/**/*.{jpg,png,woff,ico}').pipe(gulp.dest('dist/public'));
}

function watchAssets() {
  gulp.watch('public/{images,fonts}/**/*.{jpg,png,woff,ico}', copyAssets);
}

function revPublic() {
  return gulp.src('dist/public/**').pipe(rev()).pipe(gulp.dest('dist/public')).pipe(rev.manifest({ path: 'manifest.json' })).pipe(gulp.dest('dist/public'));
}
