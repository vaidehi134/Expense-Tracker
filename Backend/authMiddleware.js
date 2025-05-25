console.log("authMiddleware.js loaded");
import jwt from "jsonwebtoken";
import User from "./model/users.model.js";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("Loaded JWT_SECRET:", JWT_SECRET);

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch full user (excluding password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
