const browserSync = require('browser-sync').create()
const cssnano = require('cssnano')
const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')

gulp.task('styles', () => (
    gulp.src('patterns/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('dist/patterns'))
        .pipe(browserSync.stream())
))


gulp.task('images', () => (
    gulp.src('images/*')
        .pipe(gulp.dest('dist/images'))
))

gulp.task('fonts', () => (
    gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
))

gulp.task('font-styles', () => (
    gulp.src('fonts/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('dist/fonts'))
))

gulp.task('build', ['styles','images', 'fonts', 'font-styles'])

gulp.task('refresh', ['styles'])


gulp.task('watch', ['refresh'], () => {
    gulp.watch('patterns/**/**/*.scss', ['styles'])

    browserSync.init({
        server: {
            baseDir: 'dist',
        },
        open: false,
    })
})
