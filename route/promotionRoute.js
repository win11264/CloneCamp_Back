const express = require("express");
const promotionController = require("../controller/promotionController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", promotionController.getAllPromotion);
router.get("/:id", authenticate, promotionController.getPromotionById);
router.post("/", authenticate, promotionController.createPromotion);
router.put("/:id", authenticate, promotionController.updatePromotion);
router.delete("/:id", authenticate, promotionController.deletePromotion);
module.exports = router;
