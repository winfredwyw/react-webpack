var gulp = require('gulp');
var del = require('del');
var smushit = require('gulp-smushit');

gulp.task('clean', function () {
    console.log('清除build文件夹，start...');

    del([
        'build/**/*'
    ]);
});

gulp.task('copy', function () {
    console.log('拷贝项目依赖非打包资源，start...');

    gulp.src('source/**/*')
        .pipe(gulp.dest('build'))
});

gulp.task('better', function() {
    console.log('无损压缩图片资源，start...');

    return gulp.src('build/images/**/*')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('build/images'));
});