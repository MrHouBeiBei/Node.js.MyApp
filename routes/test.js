var express = require("express");
var router = express.Router();
var db = require("../config/db");

/* GET users listing. */

// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get("/:id/:a", function(req, res, next) {
  console.log(req.params)
    sql = "SELECT name FROM `opark` WHERE id=" + req.params.id + " AND district_id=" + req.params.a;
    db.query(sql, function(err, rows) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  })

  // ?id = 6
  router.get("/", function(req, res, next) {
      console.log(req.query)
    sql = "SELECT name FROM `opark` WHERE id=" + req.query.id;
    db.query(sql, function(err, rows) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  });

module.exports = router;
