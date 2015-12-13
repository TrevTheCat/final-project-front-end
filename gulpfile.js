var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('jshint', function() {
  gulp.src("src/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

// gulp.task('sass:compressed', function(){
//   gulp.src('src/scss/importer.scss')
//     .pipe(rename('app.min.css'))
//     .pipe(sass({outputStyle: 'compressed'}))
//     .pipe(gulp.dest('css/'))
//   })
  
// gulp.task('sass:expanded', function(){
//   gulp.src('src/scss/importer.scss')
//     .pipe(rename('app.css'))
//     .pipe(sass({outputStyle: 'expanded'}))
//     .pipe(gulp.dest('css/'));
// })

gulp.task('concat', function(){
  gulp.src('src/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('js/'))
})

gulp.task('uglify', function(){
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js/'))
})