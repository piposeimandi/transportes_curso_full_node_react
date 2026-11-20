var mysql = require('mysql2');
var util = require('util');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.MYSQL_HOST,
  port            : Number(process.env.MYSQL_PORT || 3306),
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE
});
 
pool.query = util.promisify(pool.query); 
module.exports = pool;

