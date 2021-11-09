const { Topic, SubTopic, Course } = require("../models");

exports.createSubTopic = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const { subTopName, video, document, topicId } = req.body;
      const result = await SubTopic.create({
        subTopName,
        video,
        document,
        topicId,
      });

      // const findTopic = await Topic.findOne({ where: { id: topicId } });
      // const topicCourse = +findTopic.courseId;
      // console.log(`findTopic`, findTopic);
      // console.log(`topicCourse`, topicCourse);
      // const CourseIncreaseStage = await Course.findOne({
      //   where: { id: +topicCourse },
      // });
      // const currentStage = CourseIncreaseStage.totalStage;

      // console.log(`CourseIncreaseStage`, CourseIncreaseStage);

      // const increase = await CourseIncreaseStage.update({
      //   totalStage: currentStage + 1,
      // });

      return res.json({
        result,
        // , increase
      });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.getAllSubTopic = async (req, res, next) => {
  try {
    const result = await SubTopic.findAll({
      include: { model: Topic, attributes: ["topicName"] },
    });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getSubTopicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SubTopic.findAll({ where: { topicId: id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getSubTopicByTopicId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SubTopic.findAll({ where: { topicId: id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateSubTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subTopName, video, document, topicId } = req.body;
    if (req.user.role === "admin") {
      const [rows] = await SubTopic.update(
        {
          subTopName,
          video,
          document,
          topicId,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.json([rows]);
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteSubTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === "admin") {
      // const findSub = await SubTopic.findOne({ where: { id } });

      // console.log(`findSub`, findSub);
      // const findTopic = await Topic.findOne({ where: { id: findSub.topicId } });
      // console.log(`findTopic`, findTopic);
      // const topicCourse = +findTopic.courseId;

      // console.log(`topicCourse`, topicCourse);
      // const CourseDecreaseStage = await Course.findOne({
      //   where: { id: +topicCourse },
      // });
      // const currentStage = CourseDecreaseStage.totalStage;

      // console.log(`CourseIncreaseStage`, CourseDecreaseStage);

      // const decrease = await CourseDecreaseStage.update({
      //   totalStage: currentStage - 1,
      // });
      // console.log(`decrease`, decrease);

      const rows = await SubTopic.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete Sub Topic" });
      }

      return res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};
