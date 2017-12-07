var mysql = require('mysql');
var config = require('./config.js');
// var connection = mysql.createConnection({
//   host: config.mongodb.host,
//   user: config.mongodb.user,
//   password: config.mongodb.password,
//   database: config.mongodb.database,
//   multipleStatements: config.mongodb.multipleStatements
// });
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: config.mongodb.host,
  user: config.mongodb.user,
  password: config.mongodb.password,
  database: config.mongodb.database,
  multipleStatements: config.mongodb.multipleStatements
});
// pool.getConnection(function(err, connection) {
//   // connected! (unless `err` is set)
//   if (!!err) {
//     console.log(err);
//   }else{
//     console.log("connected");
//   }
// });
// Attempt to catch disconnects
pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});


module.exports = pool;
