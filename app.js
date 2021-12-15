const Koa = require('koa')
const router = require('@koa/router')()
const { createClient } = require('redis')
const redisConf = require('./conf/redis')
const app = new Koa()

const client = createClient({ url: `redis://${redisConf.host}:${redisConf.port}` })

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect()

app.use(router.routes(), router.allowedMethods())

app.use(async ctx => {
  ctx.body = 'Hello World'
})

router.get('/hello', async ctx => {
  // 设置一个自增 key
  const views = await client.INCR('views')
  ctx.body = 'hello, kkk views: ' + views
})

app.listen(8080, () => {
  console.log('server start')
})
