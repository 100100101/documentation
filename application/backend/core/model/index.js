module.exports = class{
  controller(options){
    this.list = function *list() {
      console.log('list');

      let res = yield postsDB.find({});

      this.body = yield render('list', {posts: res});
    }
  }
}