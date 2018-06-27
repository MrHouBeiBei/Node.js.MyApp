var proxy = require('http-proxy-middleware'); //代理转发

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
        path: '/webCrawler',
        filePath: require('../webCrawler') 
    },

    // {
    //     name: '代理',
    //     path: '/agent',
    //     filePath: proxy({target: 'http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList', changeOrigin: true}) 
    // },
]

module.exports = routes