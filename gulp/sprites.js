let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let svgSprite = require('gulp-svg-sprite');
let imagemin = require('gulp-imagemin');
let gulp = require('gulp');

module.exports = {

  fn: async function () {
    return gulp.src('src/images/icons/**/*.svg')
            .pipe(imagemin())
            .pipe(svgSprite({
              mode: {
                symbol: true,
              },
              preview: false,
            }))
            .pipe(gulp.dest('src/templates/components'));
  },


  watchFiles: projectRoot(`/src/images/icons/**/*.*`),


}
