const express = require('express');
const instructorController = require('../controller/instructorController');
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

router.get("/", instructorController.getAllInstructor);
router.get("/rt", instructorController.getInstructorByRating);
router.get("/:id", instructorController.getInstructorById);

router.post(
  '/',
  authenticate,
  upload.single('thisisinput'),
  instructorController.createInstructor
);
router.put(
  '/:id',
  authenticate,
  upload.single('thisisinput'),
  instructorController.updateInstructor
);
router.delete('/:id', authenticate, instructorController.deleteInstructor);
module.exports = router;
