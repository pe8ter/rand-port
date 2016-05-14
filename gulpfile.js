
const gulp = require('gulp');
const tsc = require('gulp-typescript');
const ts = require('typescript');

gulp.task('default', ['transpile']);

gulp.task('transpile', () => {
    const transpilerProject = tsc.createProject('tsconfig.json', { typescript: ts });
    return gulp.src('./main.ts')
        .pipe(tsc(transpilerProject))
        .js
        .pipe(gulp.dest('.'));
});
