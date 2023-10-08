// middleware.js
const mysql = require("mysql2");

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const connection = mysql.createConnection(dbconfig);

function CheckUserMiddleware(req, res, next) {
  const { pseudo } = req.body;
  const query = "SELECT * FROM user WHERE pseudo = ?";
  connection.query(query, [pseudo], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      throw new Error(error);
    }

    if (results.length > 0) {
      return res.status(403).json({ error: "Le pseudo existe déjà." });
    }

    return next();
  });
}

module.exports = { CheckUserMiddleware };
