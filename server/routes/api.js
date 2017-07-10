import koaRouter from 'koa-router';
import homeCtrl from '../controllers/home';
import authCtrl from '../controllers/user';

const router = koaRouter();

router
  .post('/user/login', authCtrl.postLogin)
  .get('/user/logout', authCtrl.postLogout)
  .get('/user', authCtrl.getUserInfo)

  .get('/livelist', homeCtrl.getLiveList);

export default router;
