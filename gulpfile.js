var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var pug = require('gulp-pug')


gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./public/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('frontend/assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/images/'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('frontend/views/pages/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('public/'));
});

gulp.task('styles', function(){
  gulp.src(['frontend/styles/**/*.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch('frontend/views/pages/*.pug', ['views']);
  gulp.watch("frontend/styles/**/*.less", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("public/*.html", ['bs-reload']);
});