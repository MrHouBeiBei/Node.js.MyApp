var express = require("express");
var router = express.Router();

// header("Access-Control-Allow-Origin :".$origin); //允许的域名（ * 所有域） 
// header("Access-Control-Allow-Methods : POST"); //允许的方法 
// header("Access-Control-Allow-Headers : x-requested-with , content-type"); //服务器支持的头信息

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send("respond with a resource");
  var a = {
    c:2
  }
  a.b = 1;

  res.send(a);
});

module.exports = router;
