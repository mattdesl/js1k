// Include gulp
var gulp = require('gulp'),
    fs = require('fs'),
    template = require('./gulp-template'),
    gutil = require('gulp-util'),
    tokenizer = require('glsl-tokenizer'),
    parser = require('glsl-parser'),
    deparser = require('glsl-deparser'),
    minify = require('glsl-min-stream'),
    exec = require('gulp-exec'),
    notify = require('gulp-notify'); 

var plumber = require('gulp-plumber');

var js1k = require("gulp-js1k");


// var closureCompiler = require('gulp-closure-compiler');

// gulp.task('js1k-closure', function () {
//     gulp.src('src/*.js')
//         .pipe(closureCompiler())
//         .pipe(gulp.dest('dist'));
// });


// gulp.task("glslmin", function() {
//     gulp.src("shader.glsl")
//         // .pipe(plumber())
//         .pipe(tokenizer())
//         // .pipe(parser())
//         // .pipe(minify())           // <-- the minifier
//         // .pipe(deparser(false))    // <-- "false" == no unnecessary whitespace, please.
//         .pipe(gulp.dest("./submission"))
// });

// gulp.task('glslmin', function() {
//   var options = {
//     silent: false,
//   };
//   gulp.src('./shader.glsl')
//     .pipe(exec('glslmin ./shader.glsl -o ./submission/shader.min.glsl'))
//     .pipe(notify({
//           message: "You just got super Sassy!"
//         }));
// });

// Print some stats (js1k elgibility), minify and output to "/submission/"
gulp.task("js1k", function() {
    fs.createReadStream('./shader.glsl')
      .pipe(tokenizer())
      .pipe(parser())
      .pipe(minify())           // <-- the minifier
      .pipe(deparser(false))    // <-- "false" == no unnecessary whitespace, please.
      .pipe(fs.createWriteStream('./submission/shader.min.glsl'))

    gulp.src("js1k-app.js")
        .pipe(template({ frag: './submission/shader.min.glsl' }))
        .pipe(js1k(null, 1024))
            .on('error', gutil.log)
        .pipe(gulp.dest("./submission/"))
});


// Print some stats (js1k elgibility), minify and output to "/submission/"
gulp.task("js2k", function() {
    gulp.src("js2k-app.js")
        .pipe(js1k(null, 2048))
        .pipe(gulp.dest("./submission/"));
});

// Print some stats (js1k elgibility), minify, output to "/submission/" with the shim html file 
gulp.task("js1k-with-shim", function() {
    gulp.src("js1k-app.js")
        .pipe(js1k(true)) // Notice the true
        .pipe(gulp.dest("./submission"));
});

gulp.task('default', ['js1k'], function() {
    // Watch Files For Changes 
    gulp.watch('./*.{js,glsl}', function() {
        // gulp.run('glslmin');
        gulp.run('js1k');
    }); 
});