const gulp        = require('gulp');
const ts          = require('gulp-typescript');
const merge       = require('merge2');
const dts         = require('dts-bundle');
const del         = require('del');
const rollup      = require('gulp-better-rollup');
const runSequence = require('run-sequence');
const rename      = require("gulp-rename");

let tsProject = ts.createProject('tsconfig.json');

gulp.task('clean:dist', function () {
    return del('dist/**/*');
});

gulp.task('clean:tmp', function () {
    return del('.tmp');
});

gulp.task('compile:ts', function () {
    let tsResult = gulp.src('src/*.ts')
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('.tmp/definitions')),
        tsResult.js.pipe(gulp.dest('.tmp/js'))
    ]);
});

gulp.task('definitions-bundle', function () {
    return dts.bundle({
        name: "ts-rollup-mocha-starter",
        main: ".tmp/definitions/main.d.ts",
        out: "../definitions-bundle/main.d.ts"
    });
});

gulp.task('bundle', function () {
    return merge([
        gulp.src('.tmp/js/main.js').pipe(rollup({}, 'umd'))
            .pipe(rename('main.umd.js'))
            .pipe(gulp.dest('dist')),
        gulp.src('.tmp/js/main.js').pipe(rollup({}, 'cjs'))
            .pipe(rename('main.cjs.js'))
            .pipe(gulp.dest('dist')),
        gulp.src('.tmp/js/main.js').pipe(rollup({}, 'es'))
            .pipe(rename('main.esm.js'))
            .pipe(gulp.dest('dist'))
    ]);
});

gulp.task('copy:definitions-bundle', function () {
    return gulp.src('.tmp/definitions-bundle/main.d.ts')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
    runSequence(
        ['clean:dist', 'clean:tmp'],
        'compile:ts',
        'definitions-bundle',
        ['bundle', 'copy:definitions-bundle'],
        // 'clean:tmp',
        callback
    )
});

gulp.task('dev', ['compile:ts'], function () {
    gulp.watch('src/*.ts', ['compile:ts', 'definitions-bundle']);
});