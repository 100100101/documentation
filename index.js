var config = {
      port:3011
    };
/**
 * Module dependencies.
*/
var views = require('co-views');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = module.exports = koa();

// setup views mapping .html
// to the swig template engine

var render = views(__dirname + '/views', {
  map: { html: 'swig' }
});

/*database*/
var Datastore = require('nedb');
var wrap = require('co-nedb');
var db = new Datastore({ 
		filename: './data.db'
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

app.use(route.get('/', list));
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

  let res = yield postsDB.find({});

  this.body = yield render('list', {posts: res});
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
app.listen(config.port);
console.log('listening on port '+config.port);
