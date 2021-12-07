const http = require('http');
// 用户不能直接修改context、request、response
const context = require('./context');
const request = require('./request');
const response = require('./response')
const events = require('events')

class Application extends events {
  constructor() {
    super();
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);

    this.middlewares = [];
  }

  use(middlewares) {
    this.middlewares.push(middlewares)
  }

  creatContext(req, res) {
    const ctx = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    ctx.request = request; // 自己封装的
    ctx.request.req = ctx.req = req;
    ctx.response = response; // 自己封装的
    ctx.response.res = ctx.res = res;
    return ctx;
  }

  // 将功能组合在一起一起执行
  compose(ctx) {
    let index = -1
    const dispatch = (i) => {
      // 防止重复调用 next
      if (index <= i) {
        return Promise.reject('next重复调用了')
      }
      index = i;
      if (this.middlewares.length == i) {
        return Promise.resolve();
      }
      const middlewares = this.middlewares[i];
      try {
        return Promise.resolve(middlewares(ctx, () => dispatch(i + 1)));
      } catch (e) {
        Promise.reject(e)
      }
    }
    return dispatch(0)
  }

  handleRequest = (req, res) => {
    const ctx = this.creatContext(req, res);
    res.statusCode = 404;
    this.compose(ctx).then(() => {
      if (ctx.body || ctx.response.body) {
        res.end(ctx.body)
      } else {
        res.end('not undefined')
      }
    }).catch((err) => {
      this.emit('error', err)
    })
    //this.fn(ctx);
  }

  listen(...arg) {
    const server = http.createServer(this.handleRequest)
    server.listen(...arg)
  }
}

module.exports = Application;