const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic

  const { username, password } = req.body;
  const newAdmin = await new Admin({ username, password });
  newAdmin.save();
  res.send("New admin created");
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;
  const { username } = req.headers;
  const newCourse = await new Course({ title, description, price, imageLink });
  newCourse.save();
  const coursePoster = await Admin.findOne({ username: username });
  coursePoster.courses.push(newCourse);
  coursePoster.save();
  res.send(`Course created successfully with courseId : ${newCourse._id}`);
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  const { username } = req.headers;
  const findAdmin = await Admin.findOne({ username: username });
  const coursesArray = (await findAdmin.populate("courses")).courses;
  coursesArray.forEach((e) => {
    e.published = true;
  });
  res.send(`courses:[${coursesArray}]`);
});

module.exports = router;
