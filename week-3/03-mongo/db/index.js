const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://kashyap25ankit:fkttCoj7XEV4UXRr@cluster0.01lbg4u.mongodb.net/course_db"
);

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
    min: 8,
  },
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
