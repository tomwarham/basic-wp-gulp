var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync");

// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "192.168.29.54:8098" // or localhost and port
    });
});

// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(['./sass/main.scss'])
        .pipe(sass({
            includePaths: ['scss'],
            errLogToConsole: true,
            style: 'compressed',
            sourceComments: 'true'
        }))

        .pipe(gulp.dest('./wordpress/wp-content/themes/<THEME NAME>/css'))
        //.pipe(gulp.dest('./dev/css'))
        .pipe(browserSync.reload({stream:true}));

});


// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch(["wordpress/wp-content/themes/<THEME NAME>/assets/**/*.html", "wordpress/wp-content/themes/<THEME NAME>/assets/**/*js"], ['bs-reload']);
});