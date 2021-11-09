const express = require("express");
const feedbackController = require("../controller/feedbackController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", authenticate, feedbackController.getAllFeedback);
router.get("/:id", feedbackController.getFeedbackById); // ลบ authenticate  ออก
router.post("/", feedbackController.createFeedback);
router.put("/:id", authenticate, feedbackController.updateFeedback);
router.delete("/:id", authenticate, feedbackController.deleteFeedback);
module.exports = router;
