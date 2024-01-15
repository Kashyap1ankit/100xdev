const { User } = require("../db");
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    const { authorization } = req.headers;
    const password = jwt.decode(authorization, { complete: true }).payload
      .password;

    const decoded = jwt.verify(authorization, `${password}`);

    if (decoded) {
      next();
    } else {
      throw new Error("You don't have the access");
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = userMiddleware;
