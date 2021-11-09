const express = require('express');
const commentController = require('../controller/commentController');
const { authenticate } = require('../controller/authController');

const router = express.Router();

router.get("/", commentController.getAllComment);
router.get("/:id", commentController.getCommentById);
router.get("/all/:id", commentController.getAllCommentById);
router.post("/", authenticate, commentController.createComment);
router.put("/:id", authenticate, commentController.updateComment);
router.put("/delete/:id", authenticate, commentController.deleteComment);
module.exports = router;
