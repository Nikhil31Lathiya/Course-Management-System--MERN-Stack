// app.js
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const session = require("express-session"); 
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", "./views");

app.use(
  session({
    secret: "SecretKey", 
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// http://localhost:3000/ -- visit this site
