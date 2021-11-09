const { MyCourse, Course } = require('../models');

exports.getAllMyCourse = async (req, res, next) => {
  const result = await MyCourse.findAll({ include: { model: Course } });
  return res.json({ result });
};

exports.getAllPersonalCourse = async (req, res, next) => {
  const result = await MyCourse.findAll({
    include: { model: Course },
    where: { userId: req.user.id },
  });
  return res.json({ result });
};

exports.getAllMyCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await MyCourse.findOne({
      where: { id },
      include: { model: Course },
    });
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};

exports.getPersonalMyCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(`id`, id);
    const result = await MyCourse.findOne({
      where: { id },
      include: { model: Course },
    });
    // console.log(`result`, result);
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};

exports.updatePersonalMyCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(`id--->`, id);
    // const find = await MyCourse.findAll({
    //   where: { userId: req.user.id },
    //   include: { model: Course },
    // });

    const find = await MyCourse.findOne({
      where: { id },
    });

    // console.log(`find ----------->`, find);
    const findStage = find.dataValues.currentStage;
    // console.log(`findStage ------>`, findStage);

    const findId = find.id;

    // console.log(`findId->>>`, findId);
    const result = await MyCourse.update(
      {
        currentStage: findStage + 1,
      },
      { where: { id: findId } }
    );
    // console.log(`result`, result);
    // console.log(`result--->`, result);
    if (findStage === find.totalStage - 1) {
      const updateStatus = MyCourse.update(
        {
          status: 'completed',
        },
        { where: { id: findId } }
      );
    }
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};
