const express = require("express");
const nodemailerController = require("../controller/nodemailerController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

// router.get("/", categoryController.getAllCat);
// router.get("/:id", authenticate, categoryController.getCatById);
router.post("/", authenticate, nodemailerController.sendEmail);
// router.put("/:id", authenticate, categoryController.updateCat);
// router.delete("/:id", authenticate, categoryController.deleteCat);
module.exports = router;
