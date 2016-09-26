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
var Datastore = require('nedb')
    ,db = new Datastore({ filename: './data.db' });
    db.loadDatabase(function (err) {    // Callback is optional
      // Now commands will be executed
    });



var posts = [];

// middleware

app.use(logger());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

// route definitions

/**
 * Post listing.
 */

function *list() {
  this.body = yield render('list', { posts: posts });
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
}

/**
 * Show post :id.
 */
function *show(id) {
  var post = posts[id];
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
}
/**
 * Create a post.
 */



function *create() {
  var post = yield parse(this);



  // console.log(post)
  db.insert(post, function (err, newDoc){   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
  // console.log(newDoc);



  });
var testdb
  db.find({}, function (err, docs) {
    testdb=docs;
  });
console.log(testdb);

  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');


}

// listen
app.listen(config.port);
console.log('listening on port '+config.port);
