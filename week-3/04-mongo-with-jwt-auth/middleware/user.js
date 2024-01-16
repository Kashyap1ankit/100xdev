const { User } = require("../db");
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    //Getting the authroization token and then verifying it -- if verified then next otherwise throwing the exception

    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
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
