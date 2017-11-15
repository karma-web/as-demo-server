import user from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const getUserInfo = async function (ctx) {
    const id = ctx.params.id // 获取url里传过来的参数里的id
    const result = await user.getUserById(id)
    ctx.body = result // 将从数据库读取的结果放到response的body里返回
}
const postUserAuth = async function (ctx) {
    const data = ctx.request.body;
    const userInfo = await user.getUserByName(data.name);

    if(userInfo != null){ // 如果查无此用户会返回null
        if(!bcrypt.compareSync(data.password, userInfo.password)){ //检验密码
            ctx.body = {
                success: false, // success字段让前端判断返回结果
                info: '密码错误！'
            }
        }else{ // 如果密码正确
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            const secret = 'karma-vue2-koa2-iview2'; // 指定密钥
            const token = jwt.sign(userToken, secret) // 签发token
            ctx.body = {
                success: true,
                token: token, // 返回token
            }
        }
    }else{
        ctx.body = {
            success: false,
            info: '用户不存在！' // 如果用户不存在返回用户不存在
        }
    }
}
export default {
    getUserInfo,
    postUserAuth
}