const Koa = require('koa');
const app = new Koa();
// 洋葱模型
// koa中所有异步都基于promise
// koa内部会将所有的中间件进行组合操作，组合成一个promise，只要从开始走到结束，就完成
// koa 中间件必须增加 await next() async
app.use((ctx,next) => {
  // 开始
  console.log(1);
  next();
  console.log(2)
  // 结束
})
app.use((ctx,next) => {
  console.log(3);
  next();
  console.log(4)
})
app.use((ctx,next) => {
  console.log(5);
  next()
  console.log(6);
})

app.listen(3000,() => {
  console.log('listen')
})