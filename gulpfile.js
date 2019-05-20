'use strict';

//Various Arguments that can used i.e. gulp {--verbose --prod --minhtml}:
//	--verbose = print out the files affected by each task
//	--prod = create concatenated versions of the js/css files and have the html reference those files
// 	--min = used in conjuction with the --prod argument to further minify those js/css files and have the html reference accordingly
//  --minhtml = minify the html

var nameJsIndexStart = 'bc-sdk-start';
var nameJsPopupStart = nameJsIndexStart + '-popup';
var nameJsBoldchat = 'boldchat';
var fs = require('fs');
var gulp = require('gulp');
var argv = require('yargs').argv;
var req = require('gulp-load-plugins')({lazy: true});	//lazy loads the gulp- plugins when invoked
var config = require('./gulpfile.config')();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var del = require('del');
var karma = require('karma').server;
var path = require('path');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
	return gulp.src('./out', {read: false})
		.pipe(clean());
});

gulp.task('theme', function() {
	return gulp.src('./src/themes/**/*')
		.pipe(gulp.dest('./out'));
});

gulp.task('old-js', function() {
	return gulp.src('./src/scripts/*.js')
		.pipe(concat('bc-scripts.js'))
		.pipe(gulp.dest('./out'))
		.pipe(rename('bc-scripts.min.js'))
		.pipe(uglify().on('error', console.error))
		.pipe(gulp.dest('./out'));
});

var startSrc = [
	'./src/scripts/bc-util.js',
	'./src/scripts/bc-config.js',
	'./src/scripts/bc-sdk-start.js',
	'./src/scripts/ww-bc-launch.js'
];

var coreSrc = [
	'./src/scripts/bc-api-frame.js',
	'./src/scripts/bc-client.js',
	'./src/scripts/bc-form-builder.js',
	'./src/scripts/bc-localizer.js',
	'./src/scripts/bc-person-type.js',
	'./src/scripts/bc-session-state.js',
	'./src/scripts/bc-session-storage.js',
	'./src/scripts/bc-session.js',
	'./src/scripts/bc-view-manager.js',
];

gulp.task('bootstrap-js', function() {
	return gulp.src(startSrc)
		.pipe(concat('bc-start-scripts.js'))
		.pipe(gulp.dest('./out'))
		.pipe(rename('bc-start-scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./out'));
});

gulp.task('core-js', function() {
	return gulp.src(coreSrc)
		.pipe(concat('bc-core-scripts.js'))
		.pipe(gulp.dest('./out'))
		.pipe(rename('bc-core-scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./out'));
});

gulp.task('clean-js', function() {
	return gulp.src('./out/*-scripts.js')
		.pipe(clean());
})

gulp.task('js', ['bootstrap-js', 'core-js']);

