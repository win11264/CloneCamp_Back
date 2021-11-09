const {
  Topic,
  Instructor,
  Course,
  SubTopic,
  Quiz,
  Question,
} = require('../models');

exports.createTopic = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { topicName, courseId, instructorId } = req.body;
      const result = await Topic.create({
        topicName,
        courseId,
        instructorId,
      });

      const CourseIncreaseStage = await Course.findOne({
        where: { id: result.courseId },
      });

      const currentStage = CourseIncreaseStage.totalStage;
      const increase = await CourseIncreaseStage.update({
        totalStage: currentStage + 1,
      });

      return res.json({ result });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error);
  }
};

exports.getAllTopic = async (req, res, next) => {
  try {
    const result = await Topic.findAll({
      include: [
        { model: Course },
        { model: Instructor },
        { model: SubTopic },
        { model: Quiz, include: [{ model: Question }] },
      ],
    });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getTopicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Topic.findOne({
      where: { id },
      include: [{ model: Course }, { model: Instructor }],
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getTopicByInsId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Topic.findAll({
      where: { instructorId: id },
      include: [{ model: Course }, { model: Instructor }],
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getTopicByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Topic.findAll({
      where: { courseId: id },
      include: [
        { model: Course },
        { model: Instructor },
        { model: SubTopic },
        { model: Quiz, include: [{ model: Question }] },
      ],
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topicName, courseId, instructorId } = req.body;
    if (req.user.role === 'admin') {
      const [rows] = await Topic.update(
        {
          topicName,
          courseId,
          instructorId,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.json({ topicName, courseId, instructorId });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteTopic = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'admin') {
      const findTop = await Topic.findOne({ where: { id } });
      const topicCourse = +findTop.courseId;
      const CourseDecreaseStage = await Course.findOne({
        where: { id: +topicCourse },
      });
      const currentStage = CourseDecreaseStage.totalStage;

      // console.log(`CourseIncreaseStage`, CourseDecreaseStage);

      const decrease = await CourseDecreaseStage.update({
        totalStage: currentStage - 1,
      });

      const rows = await Topic.destroy({
        where: {
          id,
        },
      });

      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete Topic' });
      }

      return res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};
