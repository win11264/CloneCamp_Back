const { Topic, Quiz, Course, Question } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.createQuiz = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const { quizName, score, topicId, questionArray } = req.body;
      const result = await Quiz.create({
        quizName,
        topicId,
        score,
      });
      // console.log(`result`, req.body);

      //   const questionList = questionArray.map(item => {
      //     console.log(`item.question ----->`, item.question);
      //     return { ...item, quizId: result.id };
      //   });

      const questionList = questionArray.map(item => {
        return { ...item, quizId: result.id };
      });

      const answer = questionArray.map(item => {
        const correct = item.answerOptions.find(
          item => item.isCorrect === true
        );
        // console.log(`questionList`, questionList);
        const correctValue = correct.answerText;
        // console.log(`correct`, correctValue);
        return {
          question: item.questionText,
          choiceA: item.answerOptions[0].answerText,
          choiceB: item.answerOptions[1].answerText,
          choiceC: item.answerOptions[2]?.answerText || null,
          choiceD: item.answerOptions[3]?.answerText || null,
          correct: correctValue,
          quizId: result.id,
        };
      });

      // const answerItem = answer.map(item => {
      //   return item.answerOptions;
      // });

      // console.log(`answer`, answer);
      // console.log(`questionList`, questionList.answerOptions);

      // const input = questionList.map(item => ({
      //   quizId,
      //   question : questionList.questionText,
      //   choiceA: +item,
      // })); -------------

      //   const withImage = questionList.filter(item => {
      //     return item.image !== undefined;
      //   });
      //   console.log(`withImage --->`, withImage);
      //   const withoutImage = questionList.filter(item => {
      //     return item.image === undefined;
      //   });
      //   console.log(`withoutImage --->`, withoutImage);

      //   if (withoutImage) {

      const mapQ = answer.map(item => {
        return item.question;
      });

      // console.log(`mapQ`, mapQ);

      const createQuestion = await Question.bulkCreate(answer);

      // console.log(`createQuestion`, createQuestion);

      //   if (withImage) {
      //     const result = await uploadPromise(req.file.path);
      //     const courseResult = await Course.bulkCreate({ withImage });
      //   }

      //   console.log(`questionArray`, questionArray);

      //   console.log(`questionList`, questionList);
      //   const questionItem = questionList.map(item => {
      //     return {question : item.question};
      //   });

      // const findTopic = await Topic.findOne({ where: { id: topicId } });
      // const topicCourse = +findTopic.courseId;
      // //   console.log(`findTopic`, findTopic);
      // //   console.log(`topicCourse`, topicCourse);
      // const CourseIncreaseStage = await Course.findOne({
      //   where: { id: +topicCourse },
      // });
      // const currentStage = CourseIncreaseStage.totalStage;

      // //   console.log(`CourseIncreaseStage`, CourseIncreaseStage);

      // const increase = await CourseIncreaseStage.update({
      //   totalStage: currentStage + 1,
      // });

      // const findQuiz = await Quiz.findOne({
      //   where: { id: +result.id },
      // });

      // const increaseScoreQuiz = await findQuiz.update({
      //   score: findQuiz.score + questionList.length,
      // });

      //   console.log(`increaseScoreQuiz`, increaseScoreQuiz);
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

exports.getAllQuiz = async (req, res, next) => {
  try {
    const result = await Quiz.findAll({
      include: { model: Topic, attributes: ["topicName"] },
    });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Quiz.findOne({
      where: { id },
      include: [
        { model: Topic, attributes: ["topicName"] },
        { model: Question },
      ],
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};
exports.getQuizByTopicId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Quiz.findAll({
      where: { topicId: id },
      include: [
        { model: Topic, attributes: ["topicName"] },
        { model: Question },
      ],
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quizName } = req.body;
    if (req.user.role === "admin") {
      const [rows] = await Quiz.update(
        {
          quizName,
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

exports.deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === "admin") {
      // const findQuiz = await Quiz.findOne({ where: { id } });

      // const findTopic = await Topic.findOne({
      //   where: { id: findQuiz.topicId },
      // });

      // const topicCourse = +findTopic.courseId;

      // const CourseDecreaseStage = await Course.findOne({
      //   where: { id: +topicCourse },
      // });
      // const currentStage = CourseDecreaseStage.totalStage;

      // //   console.log(`CourseIncreaseStage`, CourseDecreaseStage);

      // const decrease = await CourseDecreaseStage.update({
      //   totalStage: currentStage - 1,
      // });
      // //   console.log(`decrease`, decrease);

      const rows = await Quiz.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete Quiz" });
      }

      return res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};
