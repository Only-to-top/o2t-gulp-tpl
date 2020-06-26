`use strict`;

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');            // объединение файлов
const cleancss = require('gulp-clean-css');       // минификация css файлов
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');            // для сжатия JS + es2015
const notify = require('gulp-notify');            // уведомления
const del = require('del');                       // удаление папок и файлов
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');


function css() {
    return src([
        'app/assets/libs/bootstrap-reboot-4.4.1.min.css',
        // 'app/assets/libs/font-awesome-pro-all.min.css',
        'app/assets/libs/swiper-5.4.2/swiper.min.css',
        'app/assets/libs/fancybox/jquery.fancybox.min.css',
    ])
        .pipe(concat('libs.css'))
        .pipe(cleancss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('app/assets/css/'))
        .pipe(browserSync.stream());
};


function styles() {
    return src('app/assets/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('eror', notify.onError)) // плагин уведомления об ошибках
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/assets/css/'))
        .pipe(browserSync.stream())
};


// without sourcemaps
function SASSProduction() {
    return src('app/assets/sass/**/*.sass')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('eror', notify.onError)) // плагин уведомления об ошибках
        .pipe(autoprefixer())
        .pipe(dest('./app/assets/css/'))
        .pipe(browserSync.stream())
};


function scripts() {
    return src([
        // 'app/assets/libs/jquery-3.5.0.min.js',
        'app/assets/libs/swiper-5.4.2/swiper.min.js',
        'app/assets/libs/sweetalert/sweetalert.min.js',
        'app/assets/libs/fancybox/jquery.fancybox.min.js',
        'app/assets/libs/jquery.mask.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(terser())
        .pipe(dest('app/assets/js/'))
        .pipe(browserSync.stream());
};


async function prebuild() { // перенос контента в продакшен
    src([
        './app/assets/css/*.css',
        './app/assets/fonts/**/*',
        './app/assets/img/**/*',
        './app/assets/js/*.js',
        ['./app/*.*', './app/.htaccess'],
    ], { base: 'app' })
};

// Удаление папки «dist»
function clean() {
    return del('dist/'); // Удаляем папку dist перед сборкой
};


// Сервер
function server() {
    browserSync.init({
        server: { baseDir: './app/' },
        // proxy: "http://only-to-top.loc/", // + указываем домен + папку домена
        notify: false
    });
};


// Слежение за файлами
function watching() {
    watch('app/assets/sass/**/*.sass', styles);                              // следим за sass
    watch(['app/assets/js/**/*.js', '!app/assets/js/*.min.js'], scripts);  // следим за js
    watch(['app/**/*.{html,php,json}']).on('change', browserSync.reload);
    watch('app/assets/img/**/*');
}



// exports.webpackJs = webpackJs;
exports.scripts = scripts;
exports.css = css;
exports.styles = styles;
exports.SASSProduction = SASSProduction;
exports.clean = clean;
exports.prebuild = prebuild;

// Задачи по умолчанию
exports.default = parallel(css, styles, scripts, server, watching);

// Выгрузка в продакшен
exports.build = series(clean, parallel(SASSProduction, scripts), prebuild);