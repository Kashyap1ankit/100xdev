const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic

  const { username, password } = req.body;
  const newAdmin = new Admin({ username, password });
  newAdmin.save();
  res.send("New admin created");
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic

  const { username, password } = req.body;

  const getAdminId = (
    await Admin.findOne({
      username: username,
      password: password,
    })
  ).id;

  const payload = {
    username: username,
    id: getAdminId,
  };

  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`);

  res.json({ token: token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;

  //Getting the token form header and then getting the adminId from it and then creating  a new course and pushing it to the admin courses array

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const adminId = jwt.decode(token, { complete: true }).payload.id;
  const newCourse = new Course({ title, description, price, imageLink });
  newCourse.save();
  const coursePoster = await Admin.findById(adminId);
  coursePoster.courses.push(newCourse);
  coursePoster.save();
  res.send(`Course created successfully with courseId : ${newCourse._id}`);
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  //Getting the token form header and then getting the adminId from it and then getting the populating the course array and then sending the courseArray

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const adminId = jwt.decode(token, { complete: true }).payload.id;
  const findAdmin = await Admin.findById(adminId);
  const coursesArray = (await findAdmin.populate("courses")).courses;
  res.send(`courses:[${coursesArray}]`);
});

module.exports = router;
