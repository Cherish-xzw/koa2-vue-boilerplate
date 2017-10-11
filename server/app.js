import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';
import path from 'path';
import serve from 'koa-static';
import historyApiFallback from 'koa2-history-api-fallback';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import render from 'koa-ejs';

import api from './routes/api';

const app = new Koa();
const router = Router();

const PORT = process.env.HTTP_PORT || 4000;
const IP = process.env.HTTP_IP || '0.0.0.0';

app.use(bodyparser());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

// 如果JWT验证失败，返回验证失败信息
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'index',
  viewExt: 'html',
  cache: false,
});

app.on('error', err => {
  console.log('server error', err);
});

// 所有走/api/打头的请求都需要经过jwt验证
// router.use("/api",jwt({secret: 'vue-koa-demo'}),api.routes())
router.use('/api', api.routes());

router.get('/', async ctx => {
  await ctx.render('index');
});

// 将路由规则挂载到Koa上
app.use(router.routes());

app.use(historyApiFallback());

// 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.use(
  serve(path.resolve(__dirname, './public'), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);

app.listen(PORT, IP, () => {
  console.log(`Koa is served at http://${IP}:${PORT}`);
});

export default app;
