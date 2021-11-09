const { Banner } = require('../models');
const utils = require('util');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.getAllBanner = async (req, res, next) => {
  try {
    const result = await Banner.findAll();
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};

exports.getBannerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Banner.findOne({ where: { id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.createBanner = async (req, res, next) => {
  try {
    const { name, image, link } = req.body;
    if (req.user.role === 'admin') {
      const upload = await uploadPromise(req.file.path);
      const result = await Banner.create({
        name,
        image: upload.secure_url,
        link,
      });
      fs.unlinkSync(req.file.path);
      return res.status(201).json({ result });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (err) {
    next(err);
  }
};

exports.updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, link } = req.body;
    if (req.user.role === 'admin') {
      const result = await uploadPromise(req.file.path);
      const [rows] = await Banner.update(
        {
          name,
          link,
          image: result.secure_url,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.json([rows]);
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === 'admin') {
      const rows = await Banner.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete Course' });
      }

      return res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};
