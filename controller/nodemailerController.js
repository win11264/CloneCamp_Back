const nodemailer = require("nodemailer");
const { User } = require("../models");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "winthitisan@gmail.com", // your email
    pass: "winnie2122", // your email password
  },
});

exports.sendEmail = async (req, res, next) => {
  try {
    const { emailInput } = req.body;

    // let mailOptions = {
    //   from: "winthitisan@gmail.com", // sender
    //   to: emailInput, // list of receivers
    //   subject: "Message From CloneCamp", // Mail subject
    //   html: `<b>Greeting ${req.user.fullName}.</b>
    //   </br>
    //   <p>This is your password</p>
    //   </br>
    //   <b>${req.user.password}</b>`, // HTML body
    // };

    const findEmail = await User.findOne({ where: { email: emailInput } });
    // console.log(`findEmail`, findEmail);

    if (findEmail) {
      const result = await transporter.sendMail(
        {
          from: "winthitisan@gmail.com", // sender
          to: emailInput, // list of receivers
          subject: "Message From CloneCamp", // Mail subject
          html: `<b>Greeting ${findEmail.fullName}.</b>
        </br>
        <p>This is your password</p>
        </br>
        <b>${findEmail.password}</b>`, // HTML body
        },
        function (err, info) {
          if (err) console.log(err);
          else console.log(info);
        }
      );
      res.json({ message: "Your password have been sent to your email." });
    }
    res.status(400).json({ message: "Incorrected Email" });
  } catch (error) {
    next(error);
  }
};
