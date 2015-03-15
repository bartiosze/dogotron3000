var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var plugins = require('gulp-load-plugins')();

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./dest'));
});
