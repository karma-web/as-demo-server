/**
 * Created by lixia on 2017/11/4.
 */
import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import auth from './server/routes/auth.js'
import api from './server/routes/api'
import path from 'path'
import serve from 'koa-static'
import historyApiFallback from 'koa2-history-api-fallback'

const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async function (ctx, next) {
    let start = new Date()
    await next()
    let ms = new Date() - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
    console.log('server error', err)
})

router.use('/auth', auth.routes()) // 挂载到router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/api', jwt({secret: 'karma-vue2-koa2-iview2'}),api.routes()) // 挂载到router上，同时会让所有的api的请求路径前面加上'/api'的请求路径。

app.use(router.routes()) // 将路由规则挂载到Koa上。

app.use(historyApiFallback()); // 将这两个中间件挂载在api的路由之后
app.use(serve(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(8889, () => {
    console.log('Koa is listening in 8889')
})


export default app
