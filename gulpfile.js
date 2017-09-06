const gulp        = require('gulp'),
      $           = require('gulp-load-plugins')(),
      merge       = require('merge2'),
      dts         = require('dts-bundle'),
      del         = require('del'),
      resolve     = require('rollup-plugin-node-resolve'),
      commonjs    = require('rollup-plugin-commonjs'),
      runSequence = require('run-sequence');

const moduleName = 'Example';

let tsProject = $.typescript.createProject('tsconfig.json');

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
        gulp.src('.tmp/js/main.js').pipe($.betterRollup({
            moduleName: moduleName,
            plugins: [resolve({browser: true}), commonjs()]
        }, 'umd'))
            // .pipe($.uglify())
            .pipe($.rename('main.umd.js'))
            .pipe(gulp.dest('dist')),
        gulp.src('.tmp/js/main.js').pipe($.betterRollup({
            moduleName: moduleName,
            plugins: [resolve({}), commonjs()]
        }, 'cjs'))
            .pipe($.rename('main.cjs.js'))
            .pipe(gulp.dest('dist')),
        gulp.src('.tmp/js/main.js').pipe($.betterRollup({
            moduleName: moduleName,
            plugins: [resolve({}), commonjs()]
        }, 'es'))
            .pipe($.rename('main.esm.js'))
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

gulp.task('default', ['compile:ts', 'definitions-bundle'], function () {
    gulp.watch('src/*.ts', ['compile:ts', 'definitions-bundle']);
});