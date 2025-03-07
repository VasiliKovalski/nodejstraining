const sql = require("mssql");

require("dotenv").config(); // Load environment variables

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.HOST, // Use remote server IP or domain
  database: process.env.DATABASE,
  options: {

    trustServerCertificate: true, // If using a self-signed cert
    MultipleActiveResultSets: false
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("✅ Connected to MS SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });


  
  
  module.exports = { sql, poolPromise };