const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const stylelint = require('gulp-stylelint')

gulp.task('styles', () => (
    gulp.src('patterns/**/*.scss')
        .pipe(stylelint({
            reporters: [{
                formatter: 'verbose',
                console: true
            }],
            debug: true,
            cache: true,
            fix: true,
            syntax: 'scss'
        }))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('dist/patterns'))
))

gulp.task('html', () => (
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'))
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
        .pipe(gulp.dest('dist/fonts'))
))

gulp.task('build', ['html', 'styles','images', 'fonts', 'font-styles'])

gulp.task('refresh', ['styles'])


gulp.task('watch', ['refresh'], () => {
    gulp.watch('patterns/**/**/*.scss', ['styles'])
})
