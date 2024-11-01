const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Remove "Bearer " prefix if present
    const bearerToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    try {
        // Verify the token
        const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
        // console.log("Decoded token:", decodedToken); // Log decoded token

        req.user = decodedToken; // Store decoded token payload
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

module.exports = auth;
