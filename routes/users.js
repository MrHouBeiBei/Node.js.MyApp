var express = require("express");
var router = express.Router();
var db = require("../config/db");

//header三大件

// header("Access-Control-Allow-Origin :".$origin); //允许的域名（ * 所有域）
// header("Access-Control-Allow-Methods : POST"); //允许的方法
// header("Access-Control-Allow-Headers : x-requested-with , content-type"); //服务器支持的头信息

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send("respond with a resource");

  // sql = "SELECT 2 + 2 AS solution";
  // sql = "SELECT id FROM `opark`";
  // sql = "SELECT * FROM `opark` WHERE area=100";
  sql = "SELECT `name`, address FROM `opark`;";
  db.query(sql, function(err, rows) {
    if (err) {
      throw err;
    } else {
      // console.log("The solution is: ", rows[0].solution);
      console.log(rows)
      res.send(rows);
    }
  });

  var a = {
    c: 2
  };
  a.b = 1;
  a.q = req.query.id; //获取query参数
  // res.send(a);
});

module.exports = router;


