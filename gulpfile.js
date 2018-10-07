var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');

gulp.task('minifyjs', function() {
	return gulp.src('src/js/*.js') //操作的源文件
		.pipe(concat('built.js')) //合并到临时文件
		.pipe(gulp.dest('dist/js')) //生成到目标文件夹
		.pipe(rename({suffix: '.min'})) //重命名
		.pipe(uglify()) //压缩
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString());})
		.pipe(gulp.dest('dist/js'))
        .pipe(livereload());
 });

gulp.task('lessTask', function () {
   return gulp.src('src/less/*.less')
       .pipe(less())
       .pipe(gulp.dest('src/css'))
       .pipe(livereload());
});

gulp.task('cssTask', ['lessTask'], function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('built.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});
gulp.task('htmlMinify', function() {
   return gulp.src('atguigu.html')
       .pipe(htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest('dist'))
       .pipe(livereload());
});

gulp.task('default', ['minifyjs', 'cssTask', 'htmlMinify']);

gulp.task('watch', ['default'], function () {
   livereload.listen();
   gulp.watch('src/js/*.js', ['minifyjs']);
   gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssTask', 'lessTask'])
});