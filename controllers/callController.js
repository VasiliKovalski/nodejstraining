
const {  poolPromise } = require("../config/db");  

exports.getCalls = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT top 5 * FROM Calls");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
};


exports.getSomeCalls = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT top 5 * FROM Calls where result = 5");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: "Database query failed", details: err.message });
    }
  };