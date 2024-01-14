const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  try {
    const { username, password } = req.headers;

    const isUser = await User.findOne({
      username: username,
      password: password,
    });
    if (isUser) {
      next();
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = userMiddleware;
