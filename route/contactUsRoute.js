const express = require("express");
const contactUsController = require("../controller/contactUsContoller");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", contactUsController.getContact);
router.post("/", authenticate, contactUsController.createContactUs);
router.put("/:id", authenticate, contactUsController.updateContact);

module.exports = router;
