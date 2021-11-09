// สร้าง table จาก models
// const { sequelize } = require("./models");
// sequelize.sync({
//   alter: true,
// });

require("dotenv").config();
const multer = require("multer");
const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const cors = require("cors");
const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;
const app = express();
const utils = require("util");
const authRoute = require("./route/authRoute");
const categoryRoute = require("./route/categoryRoute");
const instructorRoute = require("./route/instructorRoute");
const instructorCatRoute = require("./route/instructorCatRoute");
const courseRoute = require("./route/courseRoute");
const courseCatRoute = require("./route/courseCatRoute");
const bannerRoute = require("./route/bannerRoute");
const feedbackRoute = require("./route/feedbackRoute");
const promotionRoute = require("./route/promotionRoute");
const checkoutRoute = require("./route/checkoutRoute");
const subTopicRoute = require("./route/subTopicRoute");
const Omise = require("omise");
const topicRoute = require("./route/topicRoute");
const commentRoute = require("./route/commentRoute");
const quizRoute = require("./route/quizRoute");
const myCourseRoute = require("./route/myCourseRoute");
const questionRoute = require("./route/questionRoute");
const nodemailerRoute = require("./route/nodemailerRoute");
const userRoute = require("./route/userRoute");
const contactUsRoute = require("./route/contactUsRoute");
// var bodyParser = require("body-parser");

// app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/public", express.static("public"));
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/instructor", instructorRoute);
app.use("/insCat", instructorCatRoute);
app.use("/course", courseRoute);
app.use("/courseCat", courseCatRoute);
app.use("/banner", bannerRoute);
app.use("/feedback", feedbackRoute);
app.use("/promotion", promotionRoute);
app.use("/topic", topicRoute);
app.use("/checkout", checkoutRoute);
app.use("/subtopic", subTopicRoute);
app.use("/comment", commentRoute);
app.use("/quiz", quizRoute);
app.use("/mycourse", myCourseRoute);
app.use("/question", questionRoute);
app.use("/mail", nodemailerRoute);
app.use("/user", userRoute);
app.use("/contactus", contactUsRoute);
const uploadPromise = utils.promisify(cloudinary.uploader.upload);
//path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

//error handling middleware
// app.use(errorController);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(file);
      cb(null, "public/image");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
    },
  }),
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
