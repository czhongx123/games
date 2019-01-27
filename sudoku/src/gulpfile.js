const gulp = require("gulp");

//转译js
gulp.task("webpack",()=>{
    
})

//编译less
gulp.task("less",()=>{
    
})


gulp.task("default",gulp.parallel('webpack','less'))