const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//create mysql connection
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connect to the database.");
});

module.exports = connection;
