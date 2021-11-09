const express = require("express");
const quizController = require("../controller/quizController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", quizController.getAllQuiz);
router.get("/:id", authenticate, quizController.getQuizById);
router.get("/topicId/:id", authenticate, quizController.getQuizByTopicId);
router.post("/", authenticate, quizController.createQuiz);
router.put("/:id", authenticate, quizController.updateQuiz);
router.delete("/:id", authenticate, quizController.deleteQuiz);
module.exports = router;
