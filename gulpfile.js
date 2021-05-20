'use strict';

var argv = require('yargs').argv;
var path = require('path');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var mocha = require('gulp-spawn-mocha');
var Promise = require('es6-promise').Promise;

var SINGLE_TEST = argv.single ? parseTestName(argv.single) : null;
process.env.SINGLE_TEST = JSON.stringify(SINGLE_TEST);
process.env.BENCHMARK = argv.benchmark;

var SRC_FOLDER = SINGLE_TEST ? singleRule(SINGLE_TEST.name) : 'src/**/*.ts';
var TEST_FOLDER = SINGLE_TEST ? singleTest(SINGLE_TEST.name) : 'dist/test/**/*.js';
var DEF_FOLDER = 'typings/**/*.ts'
var tsProject = ts.createProject('tsconfig.json');

gulp.task('lint', function lint() {
  return gulp
    .src(SRC_FOLDER)
    .pipe(tslint({
      formatter: 'stylish',
    }))
    .pipe(tslint.report());
});

gulp.task('build', gulp.series(...(argv.lint === false ? [] : ['lint']), function build(done) {
  var hasError = false;
  gulp
    .src([SRC_FOLDER, DEF_FOLDER])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .on('error', function onError() {
      hasError = true;
    })
    .js
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: path.join(__dirname, '/src')
    }))
    .pipe(gulp.dest('dist'))
    .on('end', function () {
      if (hasError) {
        done('TypeScript has reported errors');
      } else {
        done();
      }
    });
}));

gulp.task('readme', gulp.series('build', function readme(gulpCallBack) {
  var readme = require('./dist/readme');
  readme.updateRuleFiles(function () {
    readme.updateReadme(function () {
      gulpCallBack();
    });
  });
}));

gulp.task('fetch', gulp.series('build', function fetch(gulpCallBack) {
  var fetch = require('./dist/readme/fetch');
  Promise.all([
    fetch.compareToESLint(),
    fetch.compareToTSLint()
  ]).then(function () {
    gulpCallBack();
  });
}));

gulp.task('new-rule', gulp.series('build', function newRule(done) {
  var newRule = require('./dist/tools/newRule');
  const ruleName = argv.rule;
  if (!ruleName) {
    done('missing `--rule` option');
  } else if (!ruleName.startsWith('ter-')) {
    done('rule name is missing the `ter-` prefix');
  } else {
    newRule.writeNewRule(ruleName);
    newRule.writeNewRuleTests(ruleName);
    done();
  }
}));

gulp.task('self-lint', function selfLint() {
  return gulp
    .src(SRC_FOLDER)
    .pipe(tslint({
      configuration: 'tslint_eslint_rules.json',
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('test', gulp.series('build', function test() {
  var opt = argv.benchmark ? { 'noTimeouts': true } : {};
  return gulp
    .src(TEST_FOLDER)
    .pipe(mocha(opt));
}));

gulp.task('watch', function watch() {
  gulp.watch(SRC_FOLDER, ['build']);
});

gulp.task('default', gulp.series('watch'));

gulp.task('publish', function build() {
  return tsProject
    .src([SRC_FOLDER, DEF_FOLDER])
    .pipe(tsProject());
});

// ---
function toCamelCase(str){
  return str.replace(/-(.)/g, function (_, char) {
    return char.toUpperCase();
  });
}

function parseTestName(str) {
  var parts = str.split(':');
  return {
    name: parts[0],
    group: parts[1] || null,
    num: parts[2] !== undefined ? parseInt(parts[2], 10) : null
  };
}

function singleRule(name) {
  return 'src/**/?(' + toCamelCase(name) + '*|helper).ts';
}

function singleTest(name) {
  return 'dist/test/rules/' + toCamelCase(name) + 'RuleTests.js';
}
