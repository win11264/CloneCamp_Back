const { Category } = require('../models');

exports.getAllCat = async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.json({ category });
  } catch (error) {
    next(error);
  }
};

exports.getCatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id } });
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

exports.createCat = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    if (req.user.role === 'admin') {
      const category = await Category.create({
        categoryName,
      });
      return res.status(201).json({ category });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (err) {
    next(err);
  }
};

exports.updateCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    if (req.user.role === 'admin') {
      const [rows] = await Category.update(
        { categoryName },
        {
          where: {
            id,
          },
        }
      );
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to update category' });
      }

      res.status(200).json({ message: 'success update category' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (err) {
    next(err.message);
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'admin') {
      const rows = await Category.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete category' });
      }

      res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (err) {
    next(err);
  }
};
