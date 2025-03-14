import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
// ✅ Ensure `authenticateUser` is an Express Middleware with `NextFunction`
export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies?.authToken;
        //console.log('token in authenticateUser: ', token);
        if (!token) {
            res.status(401).json({ message: "Unauthorized - No Token" });
            return;
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // ✅ Attach user data to request
        next(); // ✅ Correctly move to next middleware
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
