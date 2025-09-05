const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = fetchUser;
