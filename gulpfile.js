`use strict`;

const { src, dest, parallel, series, watch } = require('gulp');

const postcss = require('gulp-postcss');
const importCSS = require("postcss-import");
const autoprefixer = require('autoprefixer');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');            // объединение файлов
const cleancss = require('gulp-clean-css');       // минификация css файлов
const rename = require('gulp-rename');
const terser = require('gulp-terser');            // для сжатия JS + es2015
const del = require('del');                       // удаление папок и файлов

// SVG
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const svgMin = require('gulp-svgmin');

const include = require('gulp-file-include');

function html() {
    gulp.src(['app/_includes/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app'));
};

function css() {
    return src([
        'app/assets/libs/bootstrap-reboot-4.4.1.min.css',
        'app/assets/libs/swiper-6.2.0/swiper-bundle_6_2_0.min.css',
        'app/assets/libs/fancybox/jquery.fancybox.min.css',
    ])
        .pipe(concat('libs.css'))
        .pipe(cleancss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('app/assets/styles/'))
        .pipe(browserSync.stream());
};


function styles() {
    return src([
        'app/assets/css/**.css',
        '!app/assets/css/_*.css'
    ])
        .pipe(postcss([
            importCSS,
            autoprefixer
        ]))
        .pipe(dest('app/assets/styles'))
        .pipe(browserSync.stream());
};


function scripts() {
    return src([
        // 'app/assets/libs/jquery-3.5.1.min.js',
        // 'app/assets/libs/swiper-6.2.0/swiper-bundle_6_2_0.min.js',
        'app/assets/libs/sweetalert/sweetalert.min.js',
        'app/assets/libs/fancybox/jquery.fancybox.min.js',
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


// svg
function svg() {
    return src('app/assets/img/svg/*.svg')
        .pipe(svgMin({
            js2svg: {
                pretty: true
            }
        }))
        // .pipe(cheerio({
        //     run: function ($) {
        //         $('[fill]').removeAttr('fill');
        //         $('[stroke]').removeAttr('stroke');
        //         $('[style]').removeAttr('style');
        //     },
        //     parserOptions: { xmlMode: true }
        // }))
        // .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg",
                }
            }
        }))
        .pipe(dest('app/assets/img/'));
}


// Слежение за файлами
function watching() {
    watch(['app/assets/css/**/*.css', '!app/assets/css/*.min.css'], { usePolling: true }, series(styles));
    watch(['app/assets/js/**/*.js', '!app/assets/js/*.min.js'], { usePolling: true }, scripts);  // следим за js
    watch(['app/**/*.{html,php,json}'], { usePolling: true }).on('change', browserSync.reload);
    watch('app/assets/img/**/*'), { usePolling: true };
}



// exports.webpackJs = webpackJs;
exports.scripts = scripts;
exports.css = css;
exports.styles = styles;
exports.svg = svg;
exports.clean = clean;
exports.prebuild = prebuild;

// Задачи по умолчанию
exports.default = parallel(css, styles, scripts, svg, server, watching);

// Выгрузка в продакшен
exports.build = series(clean, scripts, prebuild);
