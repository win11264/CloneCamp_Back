const express = require("express");
const questionController = require("../controller/questionController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", questionController.getAllQuestion);
router.get("/:id", authenticate, questionController.getQuestionById);
router.get("/quiz/:id", authenticate, questionController.getQuestionByQuizId);
router.post("/", authenticate, questionController.createQuestion);
router.put("/:id", authenticate, questionController.updateQuestion);
router.delete("/:id", authenticate, questionController.deleteQuestion);
module.exports = router;
