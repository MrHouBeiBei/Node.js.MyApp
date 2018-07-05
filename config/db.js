var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123321",
//   database: "octpark",
  database: "test",
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;


// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123321",
//   database:"octpark"
// });

// connection.connect();

//   connection.query("SELECT 2 + 2 AS solution", function(err, rows, fields) {
//     if (err) throw err;
//     console.log("The solution is: ", rows[0].solution);
//   });

//   connection.query('SELECT id FROM `opark`',function(error, results, fields){
//     if(error) throw error;
//     console.log(results);
//     // console.log(fields);
// })

//   connection.end();

