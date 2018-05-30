//gulp file
const gulp = require('gulp');
const scss = require('gulp-sass');
const pug = require('gulp-pug');
const watch = require('gulp-watch');
const prettify = require('gulp-prettify');
const runsequence = require('run-sequence');
const browserSync = require('browser-sync');
const zip = require('gulp-zip');


const buildpath = './docs';


gulp.task('html', function () {
    return gulp.src('./pug/*.pug')
    .pipe(pug())
    .pipe(prettify())
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest(buildpath));
});

gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
  .pipe(scss())
  .pipe(browserSync.reload({stream: true}))
  .pipe(gulp.dest(buildpath+'/styles'));
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: buildpath
    },
  })
});

gulp.task('icons', () => {
	return gulp.src(['./dist/svg/*.svg','./dist/png/*.png'])
	.pipe(gulp.dest(buildpath+'/images'));
});

gulp.task('zip', () =>
	gulp.src('dist/*')
		.pipe(zip('icons.zip'))
		.pipe(gulp.dest('dist/zip'))
);

gulp.task('build', ['html','sass']);

gulp.task('watch', () => {
  runsequence('scss','html','icons','zip','browserSync',(e) => {
      //not yet anything
  });
  gulp.watch('./dist/**/**',['zip']);
  gulp.watch('./scss/*.scss',['scss']);
  gulp.watch('./pug/*.pug',['html']);
});
