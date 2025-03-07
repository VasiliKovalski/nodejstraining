app.get("/people", async (req, res) => {
    try {
      const pool = await poolPromise; // Ensure the connection is established
      const result = await pool.request().query("SELECT top 10 Name FROM administrators"); // Use .request().query()
  
      res.json(result.recordset); // Return JSON response
    } catch (err) {
      console.error("Error retrieving users:", err);
      res.status(500).json({ error: "Internal Server Error", jopa: err });
    }
  });

  //jopa