const { Course } = require('../models');
const { CourseCat } = require('../models');
const { Category } = require('../models');

exports.getAllCourseCat = async (req, res, next) => {
  try {
    const result = await CourseCat.findAll({
      include: [{ model: Course }, { model: Category }],
    });

    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getCourseCatByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const result = await CourseCat.findAll({ where: { courseId } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getCourseCatByCat = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const result = await CourseCat.findAll({
      where: { categoryId },
      include: [{ model: Course }, { model: Category }],
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.addCourseCat = async (req, res, next) => {
  try {
    const { courseId, categoryId } = req.body;
    // console.log(`req.body`, req.body);
    if (req.user.role === 'admin') {
      const result = await CourseCat.create({
        courseId,
        categoryId,
      });
      res.json(result);
    }
  } catch (error) {
    next(error.message);
  }
};

exports.deleteCourseCat = async (req, res, next) => {
  try {
    const { courseId, categoryId } = req.params;
    // console.log(`req.params`, req.params);
    if (req.user.role === 'admin') {
      const rows = await CourseCat.destroy({
        where: {
          courseId,
          categoryId,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete waste' });
      }

      res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (err) {
    next(err);
  }
};
