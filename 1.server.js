const Koa = require('./koa');
const app = new Koa();
// 1. 每次请求都是独立的上下文
// 2. 每个应用也是独立的上下文


app.use((ctx) => { // 用户请求的回调
  ctx.body = 'hello world'
})

app.listen(3000,() => {
  console.log('listen')
})