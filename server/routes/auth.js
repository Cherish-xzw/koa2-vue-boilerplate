import auth from '../controllers/user.js'
import koa_router from 'koa-router'
const router = koa_router()

router.get('/user/:id', auth.getUserInfo)
router.post('/user', auth.postUserAuth)
router.get('/logout', auth.postLogout)

export default router
