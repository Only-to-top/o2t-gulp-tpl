`use strict`;

let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps');


gulp.task('clean', async function(){
    del.sync('dist')
})


gulp.task('css', function(){
    return gulp.src([
        'app/libs/bootstrap-4.3.1/bootstrap-reboot.min.css',
        'app/libs/bootstrap-4.3.1/bootstrap-grid.min.css',
        'app/libs/sweetalert2/sweetalert2.min.css',
        'app/libs/swiper/swiper.min.css',
        'app/libs/fancybox/jquery.fancybox.min.css',
    ])
        .pipe(concat('libs.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded'} )) // compressed
        .pipe(autoprefixer({ grid: true, overrideBrowserlist: ['last 9 versions'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('js', function(){
    return gulp.src([
        'app/libs/swiper/swiper.min.js',
        'app/libs/sweetalert2/sweetalert2.min.js',
        'app/libs/fancybox/jquery.fancybox.min.js',
        'app/libs/jquery.mask.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      },
      notify: false
  });
});


gulp.task('export', function(){
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'));

    let buildPHP = gulp.src('app/**/*.php')
        .pipe(gulp.dest('dist/'));

    let BuildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let BuildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
        
    let BuildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let BuildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});


gulp.task('watch', function(){
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});


gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css' ,'sass', 'js', 'browser-sync', 'watch'));