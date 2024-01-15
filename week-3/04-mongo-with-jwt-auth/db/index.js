const mongoose = require("mongoose");
const { link } = require("../routes/admin");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}`);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    req: true,
    min: 1,
  },

  imageLink: {
    type: String,
    req: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
