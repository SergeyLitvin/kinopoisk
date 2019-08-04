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
		src: 'css/style.less',
		watch: 'css/**/*.less',
		dest: '/css'
	}
};