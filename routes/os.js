var express = require("express");
var router = express.Router();

const os = require('os')

router.get("/", function(req, res, next) {
    var osInfo = {
        code: 200
    }
    var homedir = os.homedir()
    var hostname = os.hostname()   //主机名
    var cpus = os.cpus()
    osInfo.homedir = homedir
    osInfo.hostname = hostname
    osInfo.cpus = cpus
    res.send(osInfo)
})
module.exports = router;
