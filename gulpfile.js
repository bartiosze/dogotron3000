var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    wiredep = require('wiredep').stream,
    plugins = require('gulp-load-plugins')();

var target = './html/index.html';
var vendorFiles = ['./build/vendor.js', './build/vendor.css'];
var ownFiles = './src/js/*.js';

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
  // first copy bower main files and app files to build directory
  gulp.src(ownFiles)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest('./build'));
    // .pipe(plugins.copy('build/own', {prefix: 1}));
  gulp.src(bowerFiles())
    .pipe(plugins.copy('tmp/vendors', {prefix: 2}));
  // now handle *.js files
  gulp.src('tmp/vendors/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest('./build'));
  // do the same for css
  gulp.src('tmp/vendors/**/*.css')
    .pipe(plugins.minifyCss())
    .pipe(plugins.concat('vendor.css'))
    .pipe(gulp.dest('./build'));
  gulp.src(target)
    .pipe(plugins.inject(gulp.src('./build/app.js')))
    .pipe(plugins.inject(gulp.src(vendorFiles), {name: 'bower'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('clean-tmp', function(){
  return gulp.src('tmp', {read: false})
    .pipe(plugins.clean());
});
gulp.task('clean-build', function(){
  return gulp.src(['build', 'index.html'], {read: false})
    .pipe(plugins.clean());
});
gulp.task('clean', ['clean-tmp', 'clean-build']);
