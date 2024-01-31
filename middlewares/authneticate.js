const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  let token;

  // Check if the token is in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Check if the token is in the request body
  else if (req.body && req.body.token) {
    token = req.body.token;
  }
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing JWT token" });
  }

  jwt.verify(token, "JWTTOKEN", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid JWT token" });
    }
    req.user = user.userId; // Add the user information to the request object
    next();
  });
}

module.exports = { authenticateJWT };
