const express = require('express');
const bannerController = require('../controller/bannerController');
const { authenticate } = require('../controller/authController');
const multer = require('multer');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(file);
      cb(null, 'public/image');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '.' + file.mimetype.split('/')[1]);
    },
  }),
});

router.get('/', bannerController.getAllBanner);
router.get('/:id', authenticate, bannerController.getBannerById);
router.post(
  '/',
  authenticate,
  upload.single('thisisinput'),
  bannerController.createBanner
);
router.put(
  '/:id',
  authenticate,
  upload.single('thisisinput'),
  bannerController.updateBanner
);
router.delete('/:id', authenticate, bannerController.deleteBanner);
module.exports = router;
