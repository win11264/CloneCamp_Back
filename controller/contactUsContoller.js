const { ContactUs } = require("../models");

exports.createContactUs = async (req, res, next) => {
  try {
    const { map, email, phoneNo, facebook, twitter, youtube, line, address } =
      req.body;
    if (req.user.role === "admin") {
      const result = await ContactUs.create({
        map,
        email,
        phoneNo,
        facebook,
        twitter,
        youtube,
        line,
        address,
      });
      return res.json({ result });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const result = await ContactUs.findAll();
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { map, email, phoneNo, facebook, twitter, youtube, line, address } =
      req.body;
    if (req.user.role === "admin") {
      const [rows] = await ContactUs.update(
        {
          map,
          email,
          phoneNo,
          facebook,
          twitter,
          youtube,
          line,
          address,
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
