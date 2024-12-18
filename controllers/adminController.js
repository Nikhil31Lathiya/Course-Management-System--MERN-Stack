// controllers/adminController.js
const Course = require("../models/Course");

// admin login page
exports.getAdminLoginPage = (req, res) => {
  res.render("admin/adminLogin");
};

// check admin uname,pwd
exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    res.redirect("/admin/dashboard");
  } else {
    res.render("admin/adminLogin", { error: "Invalid credentials" });
  }
};
//course data
exports.getAdminDashboard = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render("admin/adminDashboard", { courses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// course form
exports.getCourseForm = (req, res) => {
  res.render("admin/insertCourse");
};

// Insert course data
exports.insertCourse = async (req, res) => {
  const { name, duration, details } = req.body;
  try {
    const newCourse = new Course({ name, duration, details });
    await newCourse.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Edit course 
exports.getEditCourseForm = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render("admin/editCourse", { course });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  const { name, duration, details } = req.body;
  try {
    await Course.findByIdAndUpdate(req.params.id, { name, duration, details });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getAdminDashboard = async (req, res) => {
  const searchQuery = req.query.search || "";
  try {
    // Search courses 
    const courses = await Course.find({
      name: { $regex: searchQuery, $options: "i" }, 
    });
    res.render("admin/adminDashboard", { courses, search: searchQuery });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.logoutAdmin = (req, res) => {
  // end the session
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send("Error logging out.");
      }
      res.redirect('/admin/login'); 
  });
};