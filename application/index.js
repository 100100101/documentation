var config = {
      port:3011
    };
/**
 * Module dependencies.
*/
var path = require('path');

var art = require('ascii-art');

var http = require('http');
var koa = require('koa');
var mount = require('koa-mount');
// var serveStatic = require('koa-serve-static');
var serveStatic = require('koa-static');
var convert = require('koa-convert');

var views = require('co-views');
var logger = require('koa-logger');
var route = require('koa-route');

/*RESTful resource router*/
// var router = require('koa-router');
var parse = require('co-body');

var multer = require('koa-multer');
// var helmet = require('koa-helmet');
var sendfile = require('koa-sendfile');



var app = module.exports = koa();

// setup views mapping .html
// to the swig template engine
console.log(__dirname + '/backend/core/view/');
var render = views(__dirname + '/backend/core/view/', {
  map: { html: 'swig' }
});

/*database*/
var Datastore = require('nedb');
var wrap = require('co-nedb');
var db = new Datastore({
		filename: '../data.db'
		,autoload: true
 	});
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});


var postsDB = wrap(db);


var posts = [];

// middleware

app.use(logger());

// route middleware
// app.use(helmet());

// app.use((ctx) => {
//   ctx.body = 'Hello World';
// });

// app.use(function *(/*next*/){
//   this.body = 'Hello Koa!'
// });


// serve files in public folder (css, js etc)
app.use(serveStatic(__dirname + 'backend/core/view'));


app.use(mount('/backend/core/view', convert(serveStatic(
  path.join(__dirname, 'backend/core/view'),
  /*config.serveStatic*/{}
))));

app.use(function* index() {
  yield sendfile(this, __dirname + '/backend/core/view/riot-test.html');
});




// app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/delete/:id', del));
app.use(route.get('/post/update/:id', update));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

// route definitions

/**
 * Post listing.
 */

function *list() {
  console.log('list');

  // let res = yield postsDB.find({});

  // this.body = yield render('list', {posts: res});
  this.body = yield render('riot-test.html');

}

/**
 * Show creation form.
 */

function *add() {
  console.log('add');
  this.body = yield render('new');
}


function *update(id){
	let res = yield postsDB.findOne({_id: id});

}

function *del(id){
  console.log('del');

  let res = yield postsDB.findOne({_id: id});
  // var post = posts[id];


  if (!res) this.throw(404, 'invalid post id');

  yield postsDB.remove({_id: id});
  this.throw(200, 'post delete');
}
/**
 * Show post :id.
 */
function *show(id) {
  console.log('show');
  let res = yield postsDB.findOne({_id: id});
  // var post = posts[id];


  if (!res) this.throw(404, 'invalid post id');


  this.body = yield render('show', { post: res });
}
/**
 * Create a post.
 */



function *create() {
  var post = yield parse(this);


  yield postsDB.insert(post);
  console.log('create')
//   // console.log(post)
//   db.insert(post, function (err, newDoc){   // Callback is optional
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
//   // console.log(newDoc);
//   });
// var testdb
//   db.find({}, function (err, docs) {
//     testdb=docs;
//   });
// console.log(testdb);

  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');
}

// listen
http.createServer(app.callback()).listen(config.port);
// app.listen(config.port);


art.font(String(config.port), 'Doom', 'cyan', function(ascii){
    console.log('listening on port: ');
    console.log(ascii);
});


// console.log('listening on port '+config.port);
