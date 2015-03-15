var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    wiredep = require('wiredep').stream,
    plugins = require('gulp-load-plugins')();

gulp.task('default', function() {
});

gulp.task('index', function () {
  var target = gulp.src('./html/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

  return target
    .pipe(plugins.inject(sources))
    .pipe(plugins.inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest('./build'));
});

// TODO finish gulp concat
// 1. concat our scripts
// 2. concat vendor scripts
// 3. inject vendor scripts
gulp.task('pages', function () {
})
