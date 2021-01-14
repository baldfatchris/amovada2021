var config = require('./config.json');

var mysql = require('mysql');
var pool  = mysql.createPool({
    host            : config.dbhost,
    user            : config.dbuser,
    password        : config.dbpassword,
    database        : config.dbname
  });

function getPool() {
    return pool;
}

module.exports = {getPool};