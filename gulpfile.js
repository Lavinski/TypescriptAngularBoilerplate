var gulp = require('gulp');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var debowerify = require('debowerify');
var glob = require('glob');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

var config = {
	artifactsPath: './artifacts',
	appPath: './app',
	result: 'application.js'
};

gulp.task('default', ['scripts']);

gulp.task('scripts', function() {
	
	glob(config.appPath + '/**/*.ts', {}, function (err, files) {

		var bundler = browserify();
		files.forEach(function (file) {
			bundler.add(file);
			
			console.log(file);
		});

		bundler.plugin(tsify);
		bundler.transform(debowerify);

		return bundler.bundle()
			.pipe(source(config.result))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(config.artifactsPath));
	}); 

});

gulp.task('bower', function() {
	
	//https://github.com/ck86/main-bower-files
	
});


