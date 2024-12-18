const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User routes
router.get("/", userController.getLoginPage);
router.get("/signup", userController.getSignupPage);
router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/userDashboard", userController.getUserDashboard);
router.post("/enroll", userController.enrollCourse); 
router.get("/logout", userController.logoutUser); 

module.exports = router;
