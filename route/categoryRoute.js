const express = require("express");
const categoryController = require("../controller/categoryController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", categoryController.getAllCat);
router.get("/:id", authenticate, categoryController.getCatById);
router.post("/", authenticate, categoryController.createCat);
router.put("/:id", authenticate, categoryController.updateCat);
router.delete("/:id", authenticate, categoryController.deleteCat);
module.exports = router;
