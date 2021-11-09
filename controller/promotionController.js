const { Promotion } = require('../models');

exports.createPromotion = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { discountRate, discountUntil, courseId } = req.body;
      const result = await Promotion.create({
        discountRate,
        discountUntil,
        courseId,
      });
      return res.json({ result });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};

exports.getAllPromotion = async (req, res, next) => {
  try {
    const result = await Promotion.findAll();
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getPromotionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Promotion.findOne({ where: { id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updatePromotion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { discountRate, discountUntil, courseId } = req.body;
    if (req.user.role === 'admin') {
      const [rows] = await Promotion.update(
        {
          discountRate,
          discountUntil,
          courseId,
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

exports.deletePromotion = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === 'admin') {
      const rows = await Promotion.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete Promotion' });
      }

      return res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};
