const { Admin } = require("../db");
const jwt = require("jsonwebtoken");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    //Getting the authorization token

    const { authorization } = req.headers;

    //Getting the token and separating the Bearer

    const token = authorization.split(" ")[1];

    //Verifying the token

    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);

    //If verified then next process otherwise throws an exception

    if (decoded) {
      //Getting the id from the payload & checking if it's admin if or not-- if not then throwing an exception

      const adminId = jwt.decode(token, { complete: true }).payload.id;
      const findAdmin = await Admin.findById(adminId);
      if (findAdmin) {
        next();
      } else {
        throw new Error("You are not the admin of platform");
      }
    } else {
      throw new Error("You are not the user of platform");
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = adminMiddleware;
