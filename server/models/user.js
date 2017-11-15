import db from '../config/db.js' // 引入user的表结构
const userModel = '../schema/user.js'
const TodolistDb = db.Todolist; // 引入数据库
const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化User。
const getUserById = async function (id) {
    const userInfo = await User.findOne({
        where: {
            id: id
        }
    })
    return userInfo // 返回数据
}
const  getUserByName = async function (name) {
    const  userInfo = await User.findOne({
        where: {
            user_name: name
        }
    })
    return userInfo
}
export default {
    getUserById,
    getUserByName
}
