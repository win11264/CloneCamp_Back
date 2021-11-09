const express = require("express");
const SubTopicController = require("../controller/subTopicController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", SubTopicController.getAllSubTopic);
router.get("/:id", SubTopicController.getSubTopicById);
router.get("/topicId/:id", SubTopicController.getSubTopicByTopicId);
router.post("/", authenticate, SubTopicController.createSubTopic);
router.put("/:id", authenticate, SubTopicController.updateSubTopic);
router.delete("/:id", authenticate, SubTopicController.deleteSubTopic);
module.exports = router;
