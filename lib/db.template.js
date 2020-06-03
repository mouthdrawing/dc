const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

module.exports = connection;
