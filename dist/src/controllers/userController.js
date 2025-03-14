import { poolPromise } from '../config/db.js';
import jwt from "jsonwebtoken";
const users = [];
const SECRET_KEY = process.env.JWT_SECRET == undefined ? 'MySecret' : process.env.JWT_SECRET;
const USERNAME = process.env.LOGIN_USERNAME == undefined ? 'MySecret' : process.env.LOGIN_USERNAME;
const PASSWORD = process.env.LOGIN_PASSWORD == undefined ? 'MySecret' : process.env.LOGIN_PASSWORD;
const getCustomers = async () => {
    try {
        const pool = await poolPromise; // ✅ Get the DB connection pool
        if (!pool) {
            throw new Error("Database connection failed.");
        }
        const result = await pool.request().query("SELECT top 10 * FROM Customers");
        return result.recordset; // ✅ Return the customers list
    }
    catch (error) {
        console.error("❌ Error fetching customers:", error);
        throw error;
    }
};
export const userLoginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        //  console.log(USERNAME);
        //  console.log(username);
        //  console.log(PASSWORD);
        //  console.log(password);
        if (username !== USERNAME || password !== PASSWORD) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        //console.log(SECRET_KEY);    
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie("authToken", token, {
            httpOnly: false, // Prevent JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "none",
            maxAge: 3600000, // 1 hour 
        });
        //console.log(token);
        //console.log(username)
        res.json({ message: 'User authenticated' });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to user login" });
    }
};
// const getUsers = async (res: Response) => {
//   try {
//     const pool = await poolPromise; 
//     if (!pool) {
//       throw new Error("Database connection failed.");
//     }
//       const result: sql.IResult<any> = await pool.request().query("SELECT top 5 * FROM Calls where result = 5");
//     res.json(result.recordset);
//   } catch (err) {
//     //res.status(500).json({ error: "Database query failed", details: err });
//   }
// };
export const userLogin = async (req, res) => {
    try {
        const pool = await poolPromise;
        if (!pool) {
            throw new Error("Database connection failed.");
        }
        //const result = await pool.request().query("SELECT top 5 * FROM customers");
        const { username, password } = req.body;
        // Generate JWT token
        //const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        //console.log(token);
        //console.log(username)
        res.json({ message: "Login successful" });
    }
    catch (err) {
        res.status(500).json({ error: "Database query failed", details: err });
    }
};
