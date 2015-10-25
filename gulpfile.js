// ToDo
/*
 - Cached
 - Less
 - 
*/

var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var cache = require('gulp-cached');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob = require('glob');

var debowerify = require('debowerify');
var browserify = require('browserify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var browserifyInc = require('browserify-incremental');
var xtend = require('xtend');
var tsd = require('gulp-tsd');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');


var config = {
	artifactsPath: './artifacts',
	appPath: './app',
	result: './app/application.js'
};

gulp.task('default', ['scripts', 'html']);

gulp.task('scripts', function(cb) {

	var bundler = browserify(xtend(browserifyInc.args, {
		basedir: '.',
		debug: true
	}));

	browserifyInc(bundler, {cacheFile: './browserify-cache.json'});

	bundler.plugin(tsify);
	bundler.transform(debowerify);
	
	bundler.add('./app/app.ts')
	bundler.add('./typings/tsd.d.ts')

	return bundler.bundle()
		.pipe(plumber())
		.pipe(source(config.result))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.artifactsPath))
		.pipe(connect.reload());

});

gulp.task('html', function () {
	return gulp.src(config.appPath + '/**/*.html')
		.pipe(plumber())
		.pipe(cache('html'))
		.pipe(gulp.dest(config.artifactsPath + '/app'))
		.pipe(connect.reload());
});

gulp.task('tsd', function () {

	return gulp.src('./tsd.json')
		.pipe(plumber())
		.pipe(tsd());
});

gulp.task('build', ['tsd', 'scripts', 'html'], function() {
	
	//https://github.com/ck86/main-bower-files
	
});

gulp.task('watch', ['build'], function () {
  gulp.watch([config.appPath + '/**/*.html'], ['html']);
  gulp.watch([config.appPath + '/**/*.ts'], ['scripts']);
});

gulp.task('web', ['watch'], function() {
	connect.server({
		root: config.artifactsPath + '/app',
		port: 8081,
		livereload: false
	});
});
