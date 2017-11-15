/**
 * Created by lixia on 2017/11/9.
 */
import api from '../controllers/todolist'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/todolist/:id', api.getTodolist)
router.post('/todolist', api.createTodolist)
router.delete('/todolist/:userId/:id', api.removeTodolist)
router.put('/todolist/:userId/:id', api.updateTodolist)

export default router