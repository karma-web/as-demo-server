import db from '../config/db.js' // 引入表结构
const todoModel = '../schema/list.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel) // 用sequelize的import方法引入表结构，Todolist。

const getTodolistById = async function (id) {
    const todolist = await Todolist.findAll({ // 查找全部的数据
        where: {
            user_id: id
        },
        attributes: ['id', 'text', 'favorite'],
        'order': [
            ['id', 'DESC'],
        ]
    })

    return todolist
}

const createTodolist = async function (data) { // 添加
    const newData = await Todolist.create({
        user_id: data.id,
        text: data.text,
        favorite: data.favorite
    })
    return newData
}

const removeTodolist = async function (id,userId) { //删除
    await Todolist.destroy({
        where: {
            id,
            user_id: userId
        }
    })
    return true
}

const updateTodolist = async function (id, userId, favorite, text) { //更新
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
