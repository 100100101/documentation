const
  config = {
    application: {
      name: '"name from package.json5"'
    }
    ,server: {
      port: 3000
    }

  };

const
  /*other*/
  path = require('path')
  ,http = require('http')
  ,art = require('ascii-art')
  /*/other/*/

  /*koa modules*/
  ,app = new (require('koa'))()
  /**/
  ,convert = require('koa-convert')
  /**/
  ,logger = require('koa-logger')
  /*routing*/
  // ,route = require('koa-route')
  /*RESTful resource router*/
  ,router = new (require('koa-router'))()

  /**/
  // ,serveStatic = require('koa-static')
  /**/
  ,serve = require('koa-static')
  /**/
  ,bodyParser = require('koa-bodyparser')
  /**/
  ,views = require('koa-views')

  // ,mount = require('koa-mount')
  // ,serveStatic = require('koa-serve-static')
  ;


/*middlewares*/
app.use(convert(logger()));


// $ GET /package.json
app.use(convert(serve('.')));

/**/
app.use(convert(bodyParser()));
/**/

// Must be used before any router is used
app.use(views(__dirname + '/backend/core/view'));

// app.use(
//   async (ctx, next) => {
//     await console.log(ctx.request);
//   }
// );
// route definitions
router.get('/*',
  function* (){
    console.log('root');
    // this.body = yield 'This is root!'/*render('riot-test.html')*/;
    // this.body = yield 'test';
    console.log(this.request);

    yield this.render('riot-test');
  }
);

/*/middlewares/*/



// router.get('/', function *(next) {...});
 app
   .use(convert(router.routes()))
   .use(convert(router.allowedMethods()));





/*listen*/
http.createServer(app.callback()).listen(config.server.port, function(){

  art.font(String(config.server.port), 'Doom', 'cyan', function(ascii){

      console.log('%s listening at port %d', config.application.name, config.server.port);
      console.log(ascii);

  });

});
