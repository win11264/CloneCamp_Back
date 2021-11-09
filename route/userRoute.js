const express = require('express');
const userController = require('../controller/userController');
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

router.get('/', userController.getAllUser);
router.get('/userId', authenticate, userController.getUserByUserId);

router.put('/updateDetail', authenticate, userController.updateUserDetail);

router.put(
  '/updateImage',
  authenticate,
  upload.single('thisisinput'),
  userController.updateUserImage
);

module.exports = router;
