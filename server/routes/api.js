import api from '../controllers/home.js'
import koa_router from 'koa-router'
const router = koa_router()

router.get('/livelist', api.getLiveList)

export default router
