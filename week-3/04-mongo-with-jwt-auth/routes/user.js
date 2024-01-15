const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic

  const { username, password } = req.body;
  const newUser = new User({ username: username, password: password });
  newUser.save();
  res.json({ message: "User created successfully" });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const token = jwt.sign(
    { username: username, password: password },
    `${password}`
  );

  res.json({ token: token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  res.json({ courses: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { authorization } = req.headers;
  const username = jwt.decode(authorization, { complete: true }).payload
    .username;
  const { courseId } = req.params;
  const getCourse = await Course.findById(courseId);
  const getCurrUser = await User.findOne({ username: username });
  getCurrUser.purchasedCourses.push(getCourse);
  getCurrUser.save();

  res.json({
    message: `Course purchased successfully (${getCourse.title}) at ${getCourse.price}`,
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  const { authorization } = req.headers;
  const username = jwt.decode(authorization, { complete: true }).payload
    .username;
  const getCurrUser = await User.findOne({ username: username });

  const getCurrUserCourses = (await getCurrUser.populate("purchasedCourses"))
    .purchasedCourses;

  res.json({ purchasedCourses: `${getCurrUserCourses}` });
});

module.exports = router;
