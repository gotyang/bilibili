const gulp=require('gulp');
const load=require('gulp-load-plugins')();

gulp.task('sass',function(){//编译sass文件
    return  gulp.src('./sass/*.scss')
            .pipe(load.sass())
            .pipe(gulp.dest('./css'))
            .pipe(load.connect.reload())
})



gulp.task('concatCss',function(){//合并压缩css
    return  gulp.src('./css/*.css')
            .pipe(load.concat('index.css'))
            .pipe(load.minifyCss())
            .pipe(gulp.dest('./dist/css'))
            .pipe(load.connect.reload())
});

gulp.task('concatJs',function(){//合并压缩js
    return  gulp.src('./js/*.js')
            .pipe(load.babel({presets: ['@babel/preset-env']}))
            .pipe(load.concat('index.js'))
            .pipe(load.uglify())
            .pipe(gulp.dest('./dist/js'))
            .pipe(load.connect.reload())
})

gulp.task('minifyHtml',function(){//压缩html文件
    return  gulp.src('./*.html')
            .pipe(load.minifyHtml())
            .pipe(gulp.dest('./dist'))
            .pipe(load.connect.reload())
})



gulp.task('reload',function (cb){// 自动刷新
    load.connect.server({
        root: './dist',//根目录
        livereload: true
    });
    cb();
})

gulp.task('watch',function(cb){//监视所有文件
    gulp.watch('./css/*.css',gulp.series('concatCss'));
    gulp.watch('./sass/*.scss',gulp.series('sass'));
    gulp.watch('./js/*.js',gulp.series('concatJs'));
    gulp.watch('./*.html',gulp.series('minifyHtml'));
    cb();
})

gulp.task('start',gulp.series('reload','watch'));//开始监听

gulp.task('build',gulp.parallel(//打包所有
    gulp.series('sass','concatCss'),
    gulp.series('concatJs'),
    gulp.series('minifyHtml')
))