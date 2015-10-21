var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect');

//var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob = require('glob');

var debowerify = require('debowerify');
var browserify = require('browserify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var browserifyInc = require('browserify-incremental');
var xtend = require('xtend');

var config = {
	artifactsPath: './artifacts',
	appPath: './app',
	result: './app/application.js'
};

gulp.task('default', ['scripts', 'html']);

gulp.task('scripts', function(cb) {

	/*var browserified = transform(function(filename) {
		return browserify(filename,  {
				debug:      true,
				transform:  ['debowerify'],
			}).bundle();
	});*/
	var bundler = browserify(xtend(browserifyInc.args, {
		basedir:    './app',
		debug:      true//,
		//transform:  ['debowerify']
	}));
	
	browserifyInc(bundler, {cacheFile: './browserify-cache.json'});
	
	bundler.plugin(tsify);
	bundler.transform(debowerify);
	
	bundler.add('./app.ts')
	
	//glob('./**/*.ts', {}, function (err, files) {
	//	files.forEach(function (file) {
	//		bundler.add(file);
	//	});

	return bundler.bundle()
		.pipe(source(config.result))
		.pipe(buffer())
		//.pipe(browserified)
		.pipe(uglify())
		.pipe(gulp.dest(config.artifactsPath));
		
	//	cb();
	//});

});

gulp.task('html', function () {
    return gulp.src(config.appPath + '/**/*.html')
        .pipe(gulp.dest(config.artifactsPath + '/app'));
});

gulp.task('bower', function() {
	
	//https://github.com/ck86/main-bower-files
	
});

gulp.task('web', function() {
	connect.server({
		root: config.artifactsPath + '/app',
		port: 8081,
		livereload: false
	});
});

