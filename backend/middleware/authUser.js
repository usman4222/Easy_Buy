import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticatedUser = (req, res, next) => {
  const token = req.cookies.token;

  console.log("This is the token:", token);

  if (!token) {
    return next(new ErrorHandler( "Please Login to access this resource.",401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);  
      return next(new ErrorHandler( "Unauthorized",401));
    }

    if (!decoded || !decoded.userId) {
      return next(new  ErrorHandler("Invalid token data", 401));
    }

    req.user = { _id: decoded.userId, email: decoded.email, role: decoded.role };

    next();
  }); 
};



export const authorizeRole = (...roles) => {
    return (req, res, next) => {
        console.log(`User's Role: ${req.user.role}`);

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler( `Role: ${req.user.role} not allowed to access this resource.`,403));
        }

        next();
    };
};

