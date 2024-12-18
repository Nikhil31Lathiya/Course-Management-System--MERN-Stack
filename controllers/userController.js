const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course"); 

// login page
exports.getLoginPage = (req, res) => {
  res.render("users/login");
};

// sign-up page
exports.getSignupPage = (req, res) => {
  res.render("users/signup");
};

// user registration
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.render("users/signup", {
      success: "Registration successful! Please login.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// user login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt:", email, password); 

    const user = await User.findOne({ email, password });
    if (!user) {
      console.log("User not found or incorrect password"); 
      return res.render("users/login", { error: "Invalid email or password" });
    }

    console.log("User found:", user); 

    // Store user data in session
    req.session.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.redirect("/userDashboard");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server Error");
  }
};

// show available courses
exports.getUserDashboard = async (req, res) => {
  try {
    // user data from session
    const user = req.session.user;
    if (!user) {
      return res.redirect("/"); 
    }

    const courses = await Course.find(); 

    res.render("users/userDashboard", {
      courses,
      user, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// admin login page
exports.getAdminLoginPage = (req, res) => {
  res.render("admin/adminLogin");
};

// admin login
exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    res.redirect("/adminDashboard");
  } else {
    res.render("admin/adminLogin", { error: "Invalid credentials" });
  }
};

// admin dashboard
exports.getAdminDashboard = (req, res) => {
  res.render("admin/adminDashboard");
};


exports.enrollCourse = async (req, res) => {
  const { firstname, lastname, email, mobileno, birthdate, gender, address, courses } = req.body; // Ensure these names match your form
  try {
    // fetch course from db
    const selectedCourses = await Course.find({ _id: { $in: courses } });

    // new record
    const enrollment = new Enrollment({
      firstname, 
      lastname,  
      email,
      mobileno,  
      birthdate,
      gender,
      address,
      courses: Array.isArray(courses) ? courses : [courses],
    });
    
    await enrollment.save();

    // course confirm page
    res.render("users/enrollmentConfirmation", {
      name: `${firstname} ${lastname}`, 
      email,
      mobileno,  
      birthdate,
      gender,
      address,
      courses: selectedCourses, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.logoutUser = (req, res) => {
// end the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out.");
    }
    res.redirect("/"); 
  });
};
