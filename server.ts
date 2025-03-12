

import express from 'express'

const app  = express();

import cors from 'cors'
app.use(cors()); // Allows all origins

const port = process.env.PORT || 8080;

import config from 'dotenv'
config.config();// Load environment variables from .env

app.use(express.json()); 

import  userRoutes   from './src/routes/userRoutes.js';
import eventRoutes from "./src/routes/eventRoutes.js";

import  MyFunction  from './src/config/util';

//app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

let aaa = MyFunction('2439802938490');
console.log(aaa);

//MyFunction()



//   //const pool = require("./db");
// app.get("/users", async (req, res) => {
//   try {
//     const pool = await poolPromise; // Ensure the connection is established

//     if (!pool) {
//       throw new Error("Database connection is not available");
//     }
//     const result = await pool.request().query("SELECT top 20 Name FROM customers"); // Use .request().query()

//     res.json(result.recordset); // Return JSON response
//   } catch (err) {
//     console.error("Error retrieving users:", err);
//     res.status(500).json({ error: "Internal Server Error", jopa: err });
//   }
// });



app.get('/api', (req, res) => { 
    res.json({"users": ["user_1999999999", "user_29999999", "user_39999999"]})
})

app.get('/', (req, res) => { 
    res.json({"Customers": ["new_version", "cuser_2werwerwer", "cuser_werwerweer3"]})
})


app.listen(port, () => {
     console.log(`Server started at ${port} port `)}
    );



