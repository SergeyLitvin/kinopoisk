const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const less = require('gulp-less');
const path = require('path');

let isDev = process.argv.includes('--dev');
let isProd = !isDev;
let isSync = process.argv.includes('--sync');

let config = {
	src: './src/',
	build: './build',
	html: {
		src: '**/*.html',
		dest: '/'
	},
	img: {
		src: 'img/**/*',
		dest: '/img'
	},
	css: {
		src: 'css/styles.less',
		watch: 'css/**/*.less',
		dest: '/css'
	}
};

// Build html
function html(){
	return gulp.src(config.src + config.html.src)
			   .pipe(gulp.dest(config.build + config.html.dest))
			   .pipe(gulpIf(isSync, browserSync.stream()));
}

// Compression images
function img(){
	return gulp.src(config.src + config.img.src)
			   .pipe(gulpIf(isProd, imagemin([
			   		imageminPngquant({
			   			quality: [0.7, 0.9]
			   		})
			   	])))
			   .pipe(gulp.dest(config.build + config.img.dest));
}

// Build css
function css(){
	return gulp.src(config.src + config.css.src)
			   .pipe(less())
			   .pipe(gulpIf(isDev, sourcemaps.init()))
			   .pipe(concat('style.css'))
			   .pipe(autoprefixer({
		            browsers: ['> 0.2%']
		        }))
			   .pipe(gulpIf(isProd, cleanCSS({
		            level: 2
		        })))
			   .pipe(gulpIf(isDev, sourcemaps.write()))
			   .pipe(gulp.dest(config.build + config.css.dest))
			   .pipe(gulpIf(isSync, browserSync.stream()));
}

// Clear
function clear(){
	return del(config.build + '/*');
}