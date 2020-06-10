`use strict`;

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');            // объединение файлов
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');            // для сжатия JS + es2015
const notify = require('gulp-notify');            // уведомления
const del = require('del');                       // удаление папок и файлов

// Подключение webpack
// const gulpWebpack = require('gulp-webpack');
// const webpack = require('webpack');
// const webpackConfig = {
//     output: {
//         filename: "bundle.js"
//     }
// };

// webpack
// function webpackJs() {
//     return src('app/assets/js/scripts.js')
//         .pipe(gulpWebpack(webpackConfig, webpack))
//         .pipe(dest('app/assets/js/'));
// };


function css() {
    return src([
        'app/assets/libs/bootstrap-reboot-4.4.1.min.css',
        // 'app/assets/libs/font-awesome-pro-all.min.css',
        'app/assets/libs/swiper-5.4.2/swiper.min.css',
        'app/assets/libs/fancybox/jquery.fancybox.min.css',
    ])
        .pipe(concat('libs.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./app/assets/css/'))
        .pipe(browserSync.stream());
};


function SASS() {
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
        .pipe(dest('./app/assets/js/'))
        .pipe(browserSync.stream());
};


async function prebuild() { // перенос контента в продакшен
    src('./app/assets/css/*.css').pipe(dest('./dist/assets/css/'))
    src('./app/assets/fonts/**/*').pipe(dest('./dist/assets/fonts/'))
    src('./app/assets/img/**/*').pipe(dest('./dist/assets/img/'))
    src('./app/assets/js/*.js').pipe(dest('./dist/assets/js/'))
    src(['./app/*.*', './app/.htaccess']).pipe(dest('./dist/'));
};

// Удаление папки «dist»
function clean() {
    return del('./dist/'); // Удаляем папку dist перед сборкой
};


// Сервер + Слежение за файлами
function server() {
    browserSync.init({
        server: { baseDir: './app/' },
        // proxy: "http://only-to-top.loc/", // + указываем домен + папку домена
        notify: false
    });

    watch('app/assets/sass/**/*.sass', parallel('SASS'));                              // следим за sass
    watch(['app/assets/js/**/*.js', '!app/assets/js/*.min.js'], parallel('scripts'));  // следим за js
    watch(['app/**/*.{html,php,json,jpg,jpeg,png,webp,svg}']).on('change', browserSync.reload);
};


// exports.webpackJs = webpackJs;
exports.scripts = scripts;
exports.css = css;
exports.SASS = SASS;
exports.SASSProduction = SASSProduction;
exports.clean = clean;
exports.prebuild = prebuild;

// Задачи по умолчанию
exports.default = parallel(css, SASS, scripts, server);

// Выгрузка в продакшен
exports.build = series(clean, parallel(SASSProduction, scripts), prebuild);