const express = require("express");
// const feedbackController = require("../controller/feedbackController");
const checkoutController = require("../controller/checkoutController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

// router.get("/", authenticate, feedbackController.getAllFeedback);
// router.get("/:id", authenticate, feedbackController.getFeedbackById);
router.post("/", authenticate, checkoutController.createCheckout);
// router.put("/:id", authenticate, feedbackController.updateFeedback);
// router.delete("/:id", authenticate, feedbackController.deleteFeedback);
module.exports = router;
