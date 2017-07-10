import koaRouter from 'koa-router';
import authCtrl from '../controllers/user';
import tableCtrl from '../controllers/table';

const router = koaRouter();

router
  .post('/user/login', authCtrl.postLogin)
  .get('/user/logout', authCtrl.postLogout)
  .get('/user', authCtrl.getUserInfo)

  .get('/table/list', tableCtrl.getList);

export default router;
