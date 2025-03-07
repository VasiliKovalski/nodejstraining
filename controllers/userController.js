
  const { sql, poolPromise } = require("../config/db");  

exports.getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT top 5 * FROM customers");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
};

