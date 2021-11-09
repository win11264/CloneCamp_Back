const { Feedback } = require("../models");

exports.createFeedback = async (req, res, next) => {
  try {
    const { feedbackName, detail, name, email } = req.body;
    const result = await Feedback.create({
      name,
      email,
      feedbackName,
      detail,
    });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const result = await Feedback.findAll();
      return res.json({ result });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Feedback.findOne({ where: { id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (req.user.role === "admin") {
      const [rows] = await Feedback.update(
        {
          status,
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

exports.deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === "admin") {
      const rows = await Feedback.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete Feedback" });
      }

      return res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};
