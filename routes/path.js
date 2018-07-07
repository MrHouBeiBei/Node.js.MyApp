var express = require("express");
var router = express.Router();

const path = require('path');

router.get('/', function(req, res, next) {
    var pathInfo = {}
    pathInfo.code = 200
    pathInfo.path = __dirname;  //当前文件路径
    pathInfo.filename = module.filename;  //当前文件名
    pathInfo.basename = path.basename(pathInfo.filename);  //返回path的最后一部分
    res.send(pathInfo)
})

module.exports = router;
