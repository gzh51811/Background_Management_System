//编译scss文件为css文件
var gulp = require('gulp');
var pump = require('pump');

//压缩html
// var  gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify', () => {
	return gulp.src('./src/public/html/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist/public/html'));
});

//压缩css
// let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
	return gulp.src('./src/public/css/*.css')
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('./dist/public/css'));
}); 
// //引入gulp，gulp-babel的npm模块；
// var babel = require('gulp-babel');


//压缩js
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
/////新建一个‘script’任务   /////用于压缩js文件
gulp.task('script', function () {
	/////找到文件
	gulp.src('./src/*.js')
		//////把ES6代码转成ES5代码
		.pipe(babel())
		/////压缩文件
		.pipe(uglify())
		/////另存压缩后文件
		.pipe(gulp.dest('./dist/'));
});
