import todolist from '../models/todolist'

const getTodolist = async function (ctx){ // 获取列表
    const id = ctx.params.id;
    const result = await todolist.getTodolistById(id);
    ctx.body = result
}
const createTodolist = async function (ctx){ // 创建
    const data = ctx.request.body;
    const result = await todolist.createTodolist(data);
    ctx.body = result
}
const removeTodolist = async function (ctx){ // 删除
    const id = ctx.params.id
    const userId = ctx.params.userId
    await todolist.removeTodolist(id, userId)
    ctx.body = {
        success: true
    }
}
const updateTodolist = async function (ctx){ // 更新
    const id = ctx.params.id
    const userId = ctx.params.userId
    const data = ctx.request.body;
    let favorite = data.favorite
    let text = data.text
    favorite === '0' ? favorite = false : favorite = true
    await todolist.updateTodolist(id, userId, favorite, text)
    ctx.body = {
        success: true
    }
}
export default {
    getTodolist,
    createTodolist,
    removeTodolist,
    updateTodolist
}