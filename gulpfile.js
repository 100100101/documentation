var config = {
      browserSync:{
        /*proxy: 'example.local/'*/
        proxy: "localhost:3011"
        // server:{
        //   baseDir:'./'
        //   ,index:'documentation.html'
        // }
       ,port:3010
       ,open: false
      }
      ,paths:{
        src:{
          scss:['./src/scss/**/*.scss','!./src/scss/**/_*.scss']
          ,js:{
            root:'./src/js/'
            ,mainFile:'main.js'
            ,partials:'./src/js/partials/**/*.js'
          }
          ,modernizr:'./bower_components/modernizr/**/*.js'
        }
        ,dist:{
          css:'./dist/css/'
          ,js:'./dist/js/'
        }
        ,watch:{
          scss:'./src/scss/**/*.scss'
          ,js:'./src/js/**/*.js'
          ,html:'./**/*.html'
        }
      }
    };
/*load plugins*/
var
  /*,path = require('path')*/
  /**/
  gulp = require('gulp')
  /**/
  ,browserSync = require('browser-sync').create()
  /**/
  ,nodemon = require('gulp-nodemon')
  /**/
  ,cache = require('gulp-cached')
  /**/
  /*pump is a small node module that pipes streams together and destroys all of them if one of them closes*/
  ,pump = require('pump')
  /**/
  ,plumber = require('gulp-plumber')
  // ,watch = require('gulp-watch')
  /**/
  ,sourcemaps = require('gulp-sourcemaps')
/*FOR CSS*/
  /**/
  ,sass = require('gulp-sass')
  /**/
  ,autoprefixer = require('gulp-autoprefixer')
  /**/
  ,cleanCSS = require('gulp-clean-css')
  /**/
  ,rename = require('gulp-rename')
/*FOR JS*/
  /**/
  ,concat = require('gulp-concat')
  /**/
  ,uglify = require('gulp-uglify')
  /*build modernizr*/
  ,modernizr = require('gulp-modernizr');



/*MODERNIZR*/
gulp.task('modernizr', function(cb){
  pump([
     gulp.src(config.paths.src.js)
    ,modernizr('modernizr-custom.js'
    //   {
    //   Based on default settings on http://modernizr.com/download/
    //   'options' : [
    //       'setClasses',
    //       'addTest',
    //       'html5printshiv',
    //       'testProp',
    //       'fnBind'
    //   ]
    // }
    )
    ,uglify()
    ,rename({suffix: '.min'})
    ,gulp.dest(config.paths.dist.js)
      ],
      cb
    );
});

/*JS CONCAT*/
gulp.task('js-concat', function(cb){
  pump([
     gulp.src(config.paths.src.js.partials)
    ,sourcemaps.init()
    ,concat(config.paths.src.js.mainFile)
    ,uglify()
    ,rename({suffix: '.min'})
    ,sourcemaps.write()
    ,gulp.dest(config.paths.dist.js)
    ,browserSync.stream()
      ],
      cb
    );
});
/*JS MINIFY*/
gulp.task('js-minify', function(cb){
  pump([
     gulp.src(config.paths.src.js.root+'*.js')
    ,cache('linting')
    ,sourcemaps.init()
    ,uglify()
    ,rename({suffix: '.min'})
    ,sourcemaps.write()
    ,gulp.dest(config.paths.dist.js)
    ,browserSync.stream()
      ],
      cb
    );
});

/*SASS*/
gulp.task('sass', function (cb){
  pump([
     gulp.src(config.paths.src.scss)
     /* ,cache('linting') */
     /**/
    ,plumber()
     /**/
    ,sourcemaps.init()
     /**/
    ,sass({
        /*includePaths: []*/
        /* ,imagePath: 'path/to/images' */
      }).on('error', sass.logError)

     /*https://github.com/ai/browserslist*/
    ,autoprefixer('last 2 version','> 1%','Explorer >= 8',{
      cascade:false
     })
     /**/
    ,cleanCSS({compatibility: 'ie8'})
     /**/
    ,rename({suffix: '.min'})
     /**/
    ,sourcemaps.write()
     /**/
    ,plumber.stop()
     /**/
    ,gulp.dest(config.paths.dist.css)
     /**/
    ,browserSync.stream()
      ],
      cb
    );
});

gulp.task('nodemon', function (cb){
	var started = false;
	return nodemon({
		script: 'index.js'
	})
  /*on start*/
  .on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
    /*browserSync.reload();*/
	})
  /*on crash*/
  .on('crash', function () {
    console.log('script crashed for some reason');
  });
});


/*Server + watching files*/
gulp.task('default', function(){
  /**/
  gulp.run('sass');
  /**/
  // gulp.run('modernizr');
  /**/
  gulp.run('js-concat');
  /**/
  gulp.run('js-minify');
  /*wath scss*/
  gulp.watch(config.paths.watch.scss, ['sass']);

  /*wath js*/
  gulp.watch(config.paths.src.js.partials, function(){
    gulp.run('js-concat');
  });
  gulp.watch(config.paths.src.js.root+'*.js', function(){
    gulp.run('js-minify');
  });

  /*wath php*/
  /*gulp.watch('*.php').on('change', browserSync.reload);*/
  /*watch html*/
  gulp.watch(config.paths.watch.html).on('change', browserSync.reload);
  /**/
  browserSync.init(config.browserSync);
  /**/
  gulp.run('nodemon');

});
