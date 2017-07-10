import homeCtrl from '../controllers/home'
import authCtrl from '../controllers/user'
import koaRouter from 'koa-router'
const router = koaRouter()

router
  .post('/user/login', authCtrl.postLogin)
  .get('/user/logout', authCtrl.postLogout)
  .get('/user', authCtrl.getUserInfo)

  .get('/livelist', homeCtrl.getLiveList)

export default router
