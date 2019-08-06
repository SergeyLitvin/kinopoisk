const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
let pipeline = require('readable-stream').pipeline;
const plumber = require('gulp-plumber');
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
  	},
  	js: {
		src: '/js',
		watch: '/js/*.js',
		dest: '/js'
	},
	browserslist: [
		"> 1%",
		"ie >= 8",
		"edge >= 15",
		"ie_mob >= 10",
		"ff >= 45",
		"chrome >= 45",
		"safari >= 7",
		"opera >= 23",
		"ios >= 7",
		"android >= 4",
		"bb >= 10"
	  ]
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
					overrideBrowserslist: config.browserslist
				}))
				.pipe(gulpIf(isProd, cleanCSS({
		            level: 2
		        })))
			   .pipe(gulpIf(isDev, sourcemaps.write()))
			   .pipe(gulp.dest(config.build + config.css.dest))
			   .pipe(gulpIf(isSync, browserSync.stream()));
}

// Build JS
function js(){
	return gulp.src([
		// список обрабатываемых файлов в нужной последовательности
		config.src + config.js.src + '/some.js',
		config.src + config.js.src + '/main.js'

	])
    .pipe(plumber({ errorHandler: true  }))
	.pipe(concat('main.js'))
	// .pipe(uglify())
	.pipe(gulp.dest(config.build + config.js.dest))
	.pipe(gulpIf(isSync, browserSync.stream()));
}


// Clear
function clear(){
	return del(config.build + '/*');
}

// Development mode
function watch(){
	if(isSync){
		browserSync.init({
	        server: {
	            baseDir: config.build
	        },
	        // tunnel: true
	    });
	}

	gulp.watch(config.src + config.html.src, html);
	gulp.watch(config.src + config.css.watch, css);
	gulp.watch(config.src + config.js.watch, js);
}

// Build for production
let build = gulp.series(clear, 
  gulp.parallel(html, img, css, js)
);

gulp.task('clear', clear);
gulp.task('html', html);
gulp.task('css', css);
gulp.task('img', img);
gulp.task('js', js);
gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));