const Koa = require('./koa');
const app = new Koa();

app.use((ctx) => { // 用户请求的回调
  ctx.body = 'hello world';
  console.log(ctx.req.url); // req 是node 原生属性
  console.log(ctx.request.path) // request 是koa 封装的
  console.log(ctx.request.query)

  console.log(ctx.url);
  console.log(ctx.path);
  ctx.body = 'hello world';
  ctx.response.body = 'hell world2';
})

app.listen(3000,() => {
  console.log('listen')
})