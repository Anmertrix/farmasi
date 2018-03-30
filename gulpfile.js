var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		inject       = require('gulp-inject'),
		uglify       = require('gulp-uglify');

gulp.task('browser-sync', ['styles', 'scripts', 'inject', 'common'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('inject', function () {
	return gulp.src('./app/index.html')
		.pipe(inject(gulp.src(['./app/css/header.min.css']), {
			name: 'head',
			transform: function (filePath, file) {
				$result = '<style>';
				$result = $result + file.contents.toString('utf8');
				$result = $result + '</style>';
				return $result
			}
		}))
		.pipe(gulp.dest('./app/'));
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/jquery/jquery-1.11.2.min.js',
		'./app/libs/waypoints/waypoints.min.js',
		'./app/libs/nicescroll/jquery.nicescroll.min.js',
		'./app/js/jquery.sticky.min.js',
		'./app/js/slick.min.js'
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('common', function() {
	return gulp.src([
		'./app/js/common.js',
		])
		.pipe(concat('common.min.js'))
		.pipe(uglify()) // Minify common.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/css/header.min.css', ['inject']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/common.js', ['common']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
