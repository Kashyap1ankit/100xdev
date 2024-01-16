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

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const userId = (
    await User.findOne({ username: username, password: password })
  ).id;

  const payload = {
    username: username,
    id: userId,
  };
  const token = jwt.sign(payload, `${process.env.SECRET_KEy}`);

  res.json({ token: token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  res.json({ courses: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic

  //Getting the token form header and then getting the userId from it and courseId from params then finding the course and the user and then pushing the course into users purchased course array

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userId = jwt.decode(token, { complete: true }).payload.id;
  const { courseId } = req.params;
  const getCourse = await Course.findById(courseId);
  const getCurrUser = await User.findById(userId);
  getCurrUser.purchasedCourses.push(getCourse);
  getCurrUser.save();

  res.json({
    message: `Course purchased successfully (${getCourse.title}) at ${getCourse.price}`,
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  //Getting the token form header and then getting the userId from it and then getting the populating the purchasedCourse array and then sending the purcahsedCourseArray

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const userId = jwt.decode(token, { complete: true }).payload.id;
  const getCurrUser = await User.findById(userId);

  const getCurrUserCourses = (await getCurrUser.populate("purchasedCourses"))
    .purchasedCourses;

  res.json({ purchasedCourses: getCurrUserCourses });
});

module.exports = router;
