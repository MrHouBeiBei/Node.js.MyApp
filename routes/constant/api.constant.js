var proxy = require('http-proxy-middleware'); //代理转发

const routes = [
    /**
     * 连squle
     * start
     */
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
    /**
     * 连squle
     * end
     */

     
    {
        name: '爬虫、中间件处理数据',
        path: '/webCrawler',
        filePath: require('../webCrawler') 
    },

    // {
    //     name: '代理',
    //     path: '/agent',
    //     filePath: proxy({target: 'http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList', changeOrigin: true}) 
    // },

    {
        name: '操作系统api',
        path: '/os',
        filePath: require('../os') 
    },
    {
        name: '路径api',
        path: '/path',
        filePath: require('../path') 
    },
]

module.exports = routes