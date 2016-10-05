'use strict';
const
/**/
path = require('path')
/**/
/**/
// ,config = new (require('./develop/libs/config/index.js'))({
//   paths:{
//     root: path.dirname(require.main.filename)
//     ,applicationDirName: 'application'
//     ,developDirName: 'develop'
//   }
// })
;
// var configg = new config();
/**/

// console.log(extend);
// console.log(config.paths)

/*!!!!!!!!!!!!!!!!*/
// console.log("Добавив %d к 10 мы получим %d", 'var1', 'var2');


module.exports = class {
	/*constructor*/
	constructor (options){
		var options = options || {};
		this.server = {
			port:'3010'
		}
		// this.options = options;
	  let gulp = new (require('./parts/gulp.js'))(options.gulp || {});

	  this.gulp = gulp;
	  /*pathc*/
	  this.paths = {
	  	root: path.dirname(require.main.filename)
	  	// application: options.paths.root + options.paths.applicationDirName
	  	// ,develop: options.paths.root + options.paths.developDirName
	  };


	require(/*this.paths.root*//*this.paths.dev.libs.global.functions*/ '../../../develop/libs/global/functions.js');
	// console.log(mergeObjects(this , options));
	console.log(this);


	}
	/*/constructor/*/
};

