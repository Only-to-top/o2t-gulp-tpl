'use strict';

const { src, dest, parallel, series, watch, lastRun } = require('gulp');

const postcss = require('gulp-postcss');
const importCSS = require("postcss-import");
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();
const rsync = require('gulp-rsync');
const concat = require('gulp-concat');                  // объединение файлов
const cleancss = require('gulp-clean-css');             // минификация css файлов
const rename = require('gulp-rename');
const terser = require('gulp-terser');                  // для сжатия JS + es2015
const del = require('del');                             // удаление папок и файлов

const fileInclude = require('gulp-file-include');
const touch = require('gulp-touch-cmd');

const imagemin = require('gulp-imagemin');


// Сервер
function server() {
    browserSync.init({
        server: { baseDir: 'build/' },
        // proxy: "http://only-to-top.loc/", // + указываем домен + папку домена
        notify: false,
        online: 'online'
    });
}


function html() {
    return src(['app/**/*.html'])
        .pipe(fileInclude())
        .pipe(dest('build/'))
        .pipe(browserSync.stream())
        .pipe(touch());
}


function libs_css() {
    return src([
        // 'app/assets/libs/bootstrap-reboot-4.4.1.min.css',
        'app/assets/libs/minireset.min.css',
        'app/assets/libs/swiper-6.2.0/swiper-bundle_6_2_0.min.css',
        'app/assets/libs/fancybox/jquery.fancybox.min.css',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('libs.css'))
        .pipe(cleancss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/assets/css/'))
        .pipe(browserSync.stream())
        .pipe(touch());
}


function styles() {
    return src([
        'app/assets/css/**.css',
        '!app/assets/css/_*.css',
        '!app/assets/css/libs.min.css'
    ], { since: lastRun(styles) })
        .pipe(sourcemaps.init())
        .pipe(postcss([
            importCSS,
            autoprefixer
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/assets/css'))
        .pipe(browserSync.stream())
        .pipe(touch());
}


function css_deploy() {
    return src([
        'app/assets/css/**.css',
        '!app/assets/css/_*.css',
        '!app/assets/css/libs.min.css'
    ])
        .pipe(postcss([
            importCSS,
            autoprefixer
        ]))
        .pipe(dest('build/assets/css'))
        .pipe(browserSync.stream())
        .pipe(touch());
}

function scripts() {
    return src([
        // 'app/assets/libs/jquery-3.5.1.min.js',
        // 'app/assets/libs/swiper-6.2.0/swiper-bundle_6_2_0.min.js',
        'app/assets/libs/sweetalert/sweetalert.min.js',
        'app/assets/libs/fancybox/jquery.fancybox.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(terser())
        .pipe(dest('build/assets/js/'))
        .pipe(browserSync.stream())
        .pipe(touch());
}


function js() {
    return src([
        'app/assets/js/**/**.js',
    ], { since: lastRun(js) })
        .pipe(dest('build/assets/js/'))
        .pipe(browserSync.stream());
}


function images() {
    return src(['app/assets/img/**/*'], { since: lastRun(images) })
        .pipe(imagemin([
            // imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 95, progressive: true }),
            imagemin.optipng({ optimizationLevel: 1 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false }
                ]
            })
        ]))
        .pipe(dest('build/assets/img/'))
        .pipe(browserSync.stream());
}


function fonts() {
    return src(['app/assets/fonts/**/*'])
        .pipe(dest('build/assets/fonts/'))
        .pipe(browserSync.stream());
}


function video() {
    return src(['app/assets/video/**/*'])
        .pipe(dest('build/assets/video/'))
        .pipe(browserSync.stream());
}


function clean() { // Удаление папки «build»
    return del('build');
}


// Слежение за файлами
function watching() {
    watch(['app/**/*.{html,php}'], { usePolling: true }, html);
    watch(['app/assets/css/**/*.css', '!app/assets/css/*.min.css'], { usePolling: true }, styles);
    watch(['app/assets/js/**/*.js', '!app/assets/js/*.min.js'], { usePolling: true }, parallel(js, scripts));
    watch(('app/assets/img/**/*'), { usePolling: true }, images).on('change', browserSync.reload);
    watch('app/assets/fonts/**/*'), { usePolling: true }, fonts;
}


// Deploy на хостинг
function rSync() {

}


exports.html = html;
exports.libs_css = libs_css;
exports.styles = styles;
exports.css_deploy = css_deploy;
exports.scripts = scripts;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.video = video;

exports.clean = clean;


// Задачи по умолчанию
exports.default = series(
    clean,
    parallel(html, libs_css, styles, scripts, js, images, fonts, video, watching, server)
);

// Deploy на хостинг по SSH
exports.deploy = series(
    parallel(html, libs_css, styles, scripts, js, images, fonts, video),
    rSync
);