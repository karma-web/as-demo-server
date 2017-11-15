import db from '../config/db.js' // 引入todolist的表结构
const todoModel = '../schema/list.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel) // 用sequelize的import方法引入表结构，Todolist。

const getTodolistById = async function (id) {
    const todolist = await Todolist.findAll({ // 查找全部的todolist
        where: {
            user_id: id
        },
        attributes: ['id', 'text', 'favorite'],
        'order': [
            ['id', 'DESC'],
        ]
    })

    return todolist // 返回数据
}

const createTodolist = async function (data) { // 添加一条todolist
    const newData = await Todolist.create({
        user_id: data.id,
        text: data.text,
        favorite: data.favorite
    })
    return newData
}

const removeTodolist = async function (id,userId) { //删除一条todolist
    await Todolist.destroy({
        where: {
            id,
            user_id: userId
        }
    })
    return true
}

const updateTodolist = async function (id, userId, favorite, text) { //更新一条todolist
    await Todolist.update(
        {
            favorite,
            text
        },
        {
            where: {
                id,
                user_id: userId
            }
        }
    )
    return true
}

export default {
    getTodolistById,
    createTodolist,
    removeTodolist,
    updateTodolist
}
