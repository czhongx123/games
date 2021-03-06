const gulp = require("gulp");

//转译js
gulp.task("webpack",async()=>{
    const webpack=require("webpack-stream");
    const config=require("./webpack.config.js");
    gulp.src('./js/**/*.js')
        .pipe(webpack(config))
        .pipe(gulp.dest("../www/js"))
})

//编译less
gulp.task("less",async()=>{
    const less=require("gulp-less");
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest("../www/css"))
})


gulp.task("default",gulp.parallel('webpack','less'));

gulp.task("watch",()=>{
    gulp.watch("less/**/*.less",async()=>{
        const less=require("gulp-less");
        gulp.src('./less/*.less')
            .pipe(less())
            .pipe(gulp.dest("../www/css"))});

    gulp.watch("js/**/*.js",async()=>{
        const webpack=require("webpack-stream");
        const config=require("./webpack.config.js");
        gulp.src('./js/**/*.js')
            .pipe(webpack(config))
            .pipe(gulp.dest("../www/js"))

    });
})



//gulp 4.0 版本需要异步函数anync

//gulp 监听命令  gulp && gulp watch