const express = require("express");
const myCourseController = require("../controller/myCourseController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", authenticate, myCourseController.getAllMyCourse);
router.get("/my", authenticate, myCourseController.getAllPersonalCourse);
router.get("/my/:id", authenticate, myCourseController.getPersonalMyCourseById);
router.get("/:id", authenticate, myCourseController.getAllMyCourseById);
router.put("/:id", authenticate, myCourseController.updatePersonalMyCourse);
// router.put("/:id", authenticate, categoryController.updateCat);
// router.delete("/:id", authenticate, categoryController.deleteCat);
module.exports = router;
