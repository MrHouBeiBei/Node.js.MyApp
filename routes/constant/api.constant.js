

const routes = [
    {
        name: '数据库连接测试',
        path: '/test',
        filePath: eval("require('../test')") 
    },
    {
        name: '用户数据',
        path: '/users',
        // filePath: eval("require('../users')") 
        filePath: require('../users') 
        // filePath: "./routes/users"
    },
    {
        name: '爬虫',
        path: '/crawler',
        filePath: require('../crawler') 
    },
]

module.exports = routes