import Sequelize from 'sequelize'
// 使用url连接的形式进行连接
const Todolist = new Sequelize('mysql://root:mysql20151126@localhost/todolist',{
    define: {
        timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    }
})
export default {
    Todolist // 导出接口
}