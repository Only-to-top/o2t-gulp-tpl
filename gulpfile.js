`use strict`;

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),            // объединение файлов
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    terser = require('gulp-terser'),            // для сжатия JS + es2015
    notify = require('gulp-notify'),            // уведомления
    del = require('del');                       // удаление папок и файлов


gulp.task('css', () => {
    return gulp.src([
        'app/assets/libs/bootstrap-reboot-4.4.1.min.css',
        'app/assets/libs/font-awesome-pro-all.min.css',
        'app/assets/libs/sweetalert2/sweetalert2.min.css',
        'app/assets/libs/swiper-5.2.1/swiper.min.css',
        'app/assets/libs/fancybox/jquery.fancybox.min.css',
    ])
        .pipe(concat('libs.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('sass', () => {
    return gulp.src('app/assets/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('eror', notify.onError)) // плагин уведомления об ошибках
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('code', () => {
    return gulp.src(['app/*.html', 'app/*.php'])
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('script', () => {
    return gulp.src('./app/assets/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('js', () => {
    return gulp.src([
        'app/assets/libs/swiper-5.2.1/swiper.min.js',
        'app/assets/libs/sweetalert2/sweetalert2.min.js',
        'app/assets/libs/fancybox/jquery.fancybox.min.js',
        'app/assets/libs/jquery.mask.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./app/assets/js/'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./app/"
        },
        notify: false
    });
});



gulp.task('prebuild', async () => { // перенос контента в продакшен
    const buildCss = gulp.src(['./app/assets/css/main.css', './app/assets/css/libs.min.css']).pipe(gulp.dest('./dist/assets/css/'))
    const buildFonts = gulp.src('./app/assets/fonts/**/*').pipe(gulp.dest('./dist/assets/fonts/'))
    const buildImg = gulp.src('./app/assets/fonts/**/*').pipe(gulp.dest('./dist/assets/img/'))
    const buildJs = gulp.src('./app/assets/js/**/*').pipe(gulp.dest('./dist/assets/js/'))
    const buildFiles = gulp.src(['./app/*.*', './app/.htaccess']).pipe(gulp.dest('./dist/'));
});



gulp.task('watch', () => {
    gulp.watch('app/assets/sass/**/*.sass', gulp.parallel('sass')); // следим за sass
    gulp.watch(['app/*.html', 'app/*.php'], gulp.parallel('code')); // следим за HTML и PHP
    gulp.watch('app/assets/js/*.js', gulp.parallel('script'));      // следим за js
});


// Задачи по умолчанию
gulp.task('default', gulp.parallel(
    'css',
    'sass',
    'js',
    'browser-sync',
    'watch'
));


gulp.task('clean', async function () {
    return del.sync('./dist/'); // Удаляем папку dist перед сборкой
});

// Выгрузка в продакшен
gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass', 'js'));