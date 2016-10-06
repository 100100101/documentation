require('babel-core/register')({
  presets: ['es2015-node6'],
  plugins: [
    'transform-async-to-generator',
    'syntax-async-functions'
  ]
});

// let config = new class {
//   constructor() {
//     this.path = {};
//     this.path.root = __dirname;
//       this.path.application = this.path.root + '/application/';
//       this.path.application.backend = this.path.application + 'backend/';
//     this.path.develop = this.path.root + '/develop/';
//       this.path.develop.libs = this.path.develop + 'libs/';
//         this.path.develop.libs.functions = this.path.develop.libs + 'functions/index.js';
//         this.path.confile = this.path.develop.libs + 'config/index.js';
//     /**/
//     this.packageJSON = require('./package.json5');
//
//   }
// };
//
// require(config.path.develop.libs.functions);
//
// global.config = new (require(config.paths.confile))(config);

require('./application/index.js');
