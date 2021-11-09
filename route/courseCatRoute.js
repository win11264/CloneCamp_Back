const express = require("express");
const courseCatController = require("../controller/courseCatController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", courseCatController.getAllCourseCat);
router.get(
  "/bycourse/:courseId",

  courseCatController.getCourseCatByCourse
);

router.get(
  "/bycat/:categoryId",

  courseCatController.getCourseCatByCat
);
router.post("/", authenticate, courseCatController.addCourseCat);
// router.put("/:id", authenticate, instructorController.updateInstructor);
router.delete(
  "/:courseId/:categoryId",
  authenticate,
  courseCatController.deleteCourseCat
);
module.exports = router;
