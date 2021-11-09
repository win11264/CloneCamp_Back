const { Comment } = require('../models');
const { Course, Topic, Instructor } = require('../models');
const { Op } = require('sequelize');

exports.createComment = async (req, res, next) => {
  try {
    const { commentName, rating, commentBody, courseId } = req.body;
    const find = await Course.findOne({ where: { id: courseId } });
    const courseRating = +find.rating;
    const courseRatingAmount = +find.ratingAmount;
    const courseRatingTotal = +find.ratingTotal;

    const findTopic = await Topic.findAll({ where: { courseId: courseId } });
    const mapTopic = findTopic.map(item => item.instructorId);
    const findIns = await Instructor.findAll({
      where: { id: { [Op.or]: mapTopic } },
    });

    // console.log(`findTopic`, findTopic);
    // console.log(`mapTopic`, mapTopic);
    // console.log(`findins`, findIns);

    const result = await Comment.create({
      userId: req.user.id,
      commentName,
      rating,
      commentBody,
      courseId,
    });
    // console.log(`result`, result);
    // console.log(`rating ---->`, courseRating);
    // console.log(`result.rating ---->`, result.rating);
    // console.log(`courseRatingAmount ---->`, courseRatingAmount);
    const totalRating =
      (+courseRatingTotal + +result.rating) / (courseRatingAmount + 1);
    // console.log(`typeof totalRating`, typeof totalRating);
    const updateCourse = await find.update({
      ratingAmount: courseRatingAmount + 1,
      rating: totalRating.toFixed(2),
      ratingTotal: courseRatingTotal + result.rating,
    });
    // console.log(`updateCourse`, updateCourse);

    findIns.forEach(async item => {
      const insUpdate = await Instructor.findByPk(item.id);

      insUpdate.ratingAmount = insUpdate.ratingAmount + 1;

      insUpdate.rating = (
        (Number(insUpdate.ratingTotal) + Number(result.rating)) /
        insUpdate.ratingAmount
      ).toFixed(2);

      insUpdate.ratingTotal = +insUpdate.ratingTotal + +result.rating;

      // console.log(`insUpdate`, insUpdate.rating);
      // console.log(`insUpdate`, insUpdate.ratingTotal);
      // console.log(`insUpdate`, result.rating);
      insUpdate.save();
    });

    return res.json({ result, updateCourse });
  } catch (error) {
    next(error);
  }
};

exports.getAllComment = async (req, res, next) => {
  try {
    const result = await Comment.findAll();
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getAllCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Comment.findAll({ where: { courseId: id } });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Comment.findOne({ where: { id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};
exports.getAllCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Comment.findAll({ where: { courseId: id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { commentName, commentBody } = req.body;

    const find = await Comment.findOne({ where: { id } });
    console.log(`find`, find);

    if (req.user.id === find.userId) {
      const [rows] = await Comment.update(
        {
          commentName,
          commentBody,
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

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Comment.update(
      {
        commentName: 'Deleted comment',
        commentBody: 'This comment has been deleted by admin ',
      },
      { where: { id } }
    );
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};
