const http = require('http');
// 用户不能直接修改context、request、response
const context = require('./context');
const request = require('./request');
const response = require('./response')

class Application {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn) {
    this.fn = fn;
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

  handleRequest = (req, res) => {
    const ctx = this.creatContext(req,res);
    this.fn(ctx);
    if(ctx.body || ctx.response.body) {
      res.end(ctx.body)
    }
  }

  listen(...arg) {
    const server = http.createServer(this.handleRequest)
    server.listen(...arg)
  }
}

module.exports = Application;