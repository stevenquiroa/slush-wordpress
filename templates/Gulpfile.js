var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var minify = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var jshint = require('gulp-jshint')
 
gulp.task('scripts', function() {
  gulp.src('./assets/js/src/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'))
})

gulp.task('sass', function () {
    gulp.src('./assets/css/src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('vendors-js', function() {
    return gulp.src([
        //colocal aquí los vendors, colocando las direcciones de los archivos minificados de cada uno
        //'./bower_components/jquery/dist/jquery.min.js',
        //'./bower_components/bootstrap/dist/js/bootstrap.min.js'
    ])

    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./assets/js'))

})

gulp.task('vendors-css', function() {
    return gulp.src([
        //Se colocan las direciones directas de los css minificados
        //'./bower_components/bootstrap/dist/css/bootstrap.min.css',
        //'./bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('default', function () {
    gulp.watch('./assets/css/src/*.scss', ['sass','minify-css'])
    gulp.watch('./assets/js/src/*.js', ['scripts'])
})

gulp.task('vendors', ['vendors-css', 'vendors-css'])