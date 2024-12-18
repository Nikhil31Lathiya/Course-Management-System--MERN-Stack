// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin login/logout routes
router.get("/login", adminController.getAdminLoginPage);
router.post("/login", adminController.loginAdmin);
router.get("/logout", adminController.logoutAdmin); 

// Admin dashboard and course routes
router.get("/dashboard", adminController.getAdminDashboard); //search 
router.get("/insertCourse", adminController.getCourseForm);
router.post("/insertCourse", adminController.insertCourse);
router.get("/deleteCourse/:id", adminController.deleteCourse);
router.get("/editCourse/:id", adminController.getEditCourseForm);
router.post("/editCourse/:id", adminController.updateCourse);

module.exports = router;
