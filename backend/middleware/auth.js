import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify user token
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Restrict access to staff only
export const staffOnly = (req, res, next) => {
  if (req.user && req.user.role === "staff") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: staff only" });
  }
};
