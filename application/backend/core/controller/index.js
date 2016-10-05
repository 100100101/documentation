module.exports = class {
  controller (options){
    app.use(route.get('/', app.model.list));
    app.use(route.get('/post/new', add));
    app.use(route.get('/post/delete/:id', del));
    app.use(route.get('/post/update/:id', update));
    app.use(route.get('/post/:id', show));
    app.use(route.post('/post', create));
  };
};
