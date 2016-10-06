// const
/**/
// path = require('path')
// path.dirname(require.main.filename)
/**/
module.exports = class {
	/*constructor*/
	constructor (options){
		var options = options || {};
		// this.application = {
		// 	name: options.packageJSON.name
		// }
		this.server = {
			port:'3000'
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

		/**/
		mergeObjects(this, options);
	}
	/*/constructor/*/
};
