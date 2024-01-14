const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    const { username, password } = req.headers;

    const getUser = await Admin.findOne({
      username: username,
      password: password,
    });
    if (getUser) {
      next();
    } else {
      throw new Error("You don't have the access ");
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = adminMiddleware;
