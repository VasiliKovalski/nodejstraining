

const express = require('express')
const sql = require("mssql");

const app = express();

const port = process.env.PORT || 8080;

require("dotenv").config(); // Load environment variables from .env


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

//const {  poolPromise } = require("./config/db");

//const userRoutes = require("./routes/userRoutes");
//const { getUsers } = require('./controllers/userController');

  


app.use(express.json()); 

  //const pool = require("./db");
app.get("/users", async (req, res) => {
  try {
    const pool = await poolPromise; // Ensure the connection is established

    if (!pool) {
      throw new Error("Database connection is not available");
    }
    const result = await pool.request().query("SELECT top 20 Name FROM customers"); // Use .request().query()

    res.json(result.recordset); // Return JSON response
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ error: "Internal Server Error", jopa: err });
  }
});

// const getUsers = async () => {
//   try {
//     const result = await pool("SELECT * FROM playing_with_neon");
//     console.log(result.rows); // Output all users
//     res
//   } catch (err) {
//     console.error("Error fetching users:", err);
//   }
// };

// Call the function

//getUsers();




app.get('/api', (req, res) => { 
    res.json({"users": ["user_1999999999", "user_29999999", "user_39999999"]})
})

app.get('/', (req, res) => { 
    res.json({"Customers": ["cuser_1werwerwer", "cuser_2werwerwer", "cuser_werwerweer3"]})
})


app.listen(port, () => {
     console.log(`Server started at ${port} port `)}
    );



