import gulp from 'gulp';
import gutil from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import shell from 'gulp-shell';

// Input file.
var bundler = browserify('src/jsx/app.jsx', {
    extensions: ['.js', '.jsx'],
    debug: true,
    standalone: 'amUI'
});

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src',
    presets: ["es2015", "react"]
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    return bundler.bundle()
        .on('error', function (err) {
            console.log("=====");
            console.error(err.toString());
            console.log("=====");
            this.emit("end");
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'))
    ;
}


gulp.task('js', () => bundle());

gulp.task('upload', shell.task([
    'aws s3 cp public/assets s3://apps.kbia.org/am-static-assets --recursive --profile kbia'
]));

gulp.task('deploy', ['js', 'upload']);

gulp.task('watch',function(){
    gutil.log('Gulp will say that this task has finished, but don\'t believe its dirty lies.');
    gutil.log('Hit \^c to actually exit watch mode.');
    gulp.watch('src/**/*.jsx',['js']);
});
