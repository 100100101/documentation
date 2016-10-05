module.exports = class {
	constructor (options){

		this.browserSync = {
      /*proxy: 'example.local/'*/
      proxy: "localhost:3011"
      // server:{
      //   baseDir:'./'
      //   ,index:'documentation.html'
      // }
     ,port:3010
     ,open: false
    }

    /**/
    this.paths = {
    	gulpfile: './develop/libs/gulp/gulpfile.js'
      ,src:{
      	root:'./src/'
        ,scss:['scss/**/*.scss','!./src/scss/**/_*.scss']
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
// console.log(this);


	}	
}
