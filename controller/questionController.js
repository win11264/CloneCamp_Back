const { Question } = require('../models');

exports.getAllQuestion = async (req, res, next) => {
  try {
    const result = await Question.findAll();
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const {
        question,
        choiceA,
        choiceB,
        choiceC,
        choiceD,
        image,
        correct,
        quizId,
      } = req.body;
      const result = await Question.create({
        question,
        choiceA,
        choiceB,
        choiceC,
        choiceD,
        image,
        correct,
        quizId,
      });
      return res.json({ result });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Question.findOne({ where: { id } });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionByQuizId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Question.findOne({ where: { quizId: id } });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, choiceA, choiceB, choiceC, choiceD, image, correct } =
      req.body;
    if (req.user.role === 'admin') {
      const [rows] = await Question.update(
        {
          question,
          choiceA,
          choiceB,
          choiceC,
          choiceD,
          image,
          correct,
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
    next(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === 'admin') {
      const rows = await Question.destroy({
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
