var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    wiredep = require('wiredep').stream,
    plugins = require('gulp-load-plugins')();

var target = gulp.src('./html/index.html');
var vendorFiles = gulp.src(['./build/vendor.js', './build/vendor.css']);
gulp.task('default', ['pages']);

gulp.task('index', function () {
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
  // first copy bower main files to build directory
  gulp.src(bowerFiles())
    .pipe(plugins.copy('build/vendors', {prefix: 2}));
  // now handle *.js files
  gulp.src('build/vendors/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest('./build'));
  // do the same for css
  gulp.src('build/vendors/**/*.css')
    .pipe(plugins.minifyCss())
    .pipe(plugins.concat('vendor.css'))
    .pipe(gulp.dest('./build'));
  target
    .pipe(plugins.inject(vendorFiles, {name: 'bower'}))
    .pipe(gulp.dest('./build'));
});
