const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});
const { Course, MyCourse, Instructor, Topic } = require('../models');
const { Op } = require('sequelize');

exports.createCheckout = async (req, res, next) => {
  const { token, courseId } = req.body;

  const find = await Course.findOne({ where: { id: courseId } });
  const price = +find.price;

  const updateLearner = +find.learner;
  // console.log(`find`, price);
  // console.log(`learner`, +find.learner);
  // console.log(`discount`, discount);

  const findTopic = await Topic.findAll({ where: { courseId: courseId } });
  const mapTopic = findTopic.map(item => item.instructorId);

  // mapTopic(id=> {
  // console.log(`<--- mapTopic --->`, mapTopic);
  // })

  const findIns = await Instructor.findAll({
    where: { id: { [Op.or]: mapTopic } },
  });

  // const mapLearner = findIns.map(item => item.learner);

  // console.log(`<--- findIns --->`, mapLearner);

  try {
    const charge = await omise.charges.create({
      amount: price * 100,
      currency: 'thb',
      card: token,
      metadata: { courseId: courseId, user: req.user.id },
    });
    // console.log(`charge -------> `, charge);

    if (charge.status === 'successful') {
      const myCourse = await MyCourse.create({
        userId: req.user.id,
        courseId,
        totalStage: find.totalStage,
        duration: find.duration,
        price: find.price,
      });

      const enroll = await find.update({
        learner: updateLearner + 1,
      });

      findIns.forEach(async item => {
        const insUpdate = await Instructor.findByPk(item.id);
        insUpdate.learner = insUpdate.learner + 1;
        insUpdate.save();
      });
      return res.json({
        charge,
        myCourse,
        enroll,
      });
    }
  } catch (error) {
    next(error.message);
  }
};
