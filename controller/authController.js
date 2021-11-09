const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CustomError = require("../utils/error");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const router = require("../route/authRoute");
const { log } = require("console");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "winthitisan@gmail.com", // your email
    pass: "Winnie2122_", // your email password
  },
});

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    const user = await User.findOne({ where: { id: decoded.id } });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    req.user = user;
    req.data = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      fullName,
      birthDate,
      email,
      mobileNo,
      username,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      throw new CustomError("password and confirm password did not match", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullName,
      birthDate,
      email,
      mobileNo,
      username,
      password: hashedPassword,
    });
    res.status(200).json({ message: "your account has been created" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log(`username`, username);
    // console.log(`password`, password);
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    }); // '30d'
    res.json({ message: "success logged in", token });
  } catch (err) {
    next(err.message);
  }
};
exports.googleLogin = async (req, res, next) => {
  // console.log(`req`, req.body);

  try {
    const { googleId, googleEmail, googleName } = req.body;
    console.log(`1 --->`, req.body);
    const dataUser = await User.findAll({});
    console.log(`2 --->`, dataUser);
    const newArr = dataUser.map(item => item.dataValues.googleId);
    console.log(`3 --->`, newArr);
    // console.log('dataUser: ', newArr);
    console.log(`check Google ID`, newArr.includes(googleId));
    if (newArr.includes(googleId) === false) {
      const hashedPassword = await bcrypt.hash(googleEmail, 12);
      console.log(`hashedPassword`, hashedPassword);
      await User.create({
        username: googleName,
        fullName: googleName,
        email: googleEmail,
        birthDate: new Date(),
        mobileNo: "",
        googleId,
        googleName,
        googleEmail,
        password: hashedPassword,
      });
    }
    const user = await User.findOne({ where: { googleId: googleId } });
    // console.log('1');
    if (!user) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    }); // '30d'
    res.status(200).json({ message: "success logged in", token });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(`err`, err);
    }
    const token = buffer.toString("hex");
    User.findOne({ where: { email: email } }).then(user => {
      if (!user) {
        return res.status(422).json({ error: "Email isn't correct" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then(result => {
        transporter.sendMail({
          to: user.email,
          from: "winthitisan@gmail.com",
          subject: "CloneCamp : Password Reset",
          html: `<p>Request for password reset</p>
          <h5>Click <a href="http://localhost:3000/reset-password/${token}">THIS LINK</a> to reset password</h5>
          `,
        });
        // console.log(`object`, object);
        res.json({ message: "please check your email" });
      });
    });
  });
};

exports.newPassword = (req, res, next) => {
  const { newPassword, token } = req.body;
  User.findOne({
    where: { resetToken: token },
  }).then(user => {
    if (!user) {
      // console.log(`user`, user);
      return res.status(422).json({ error: "Try Again Session Expire" });
    }
    // console.log(`user`, user);
    bcrypt.hash(newPassword, 12).then(hashedPassword => {
      (user.password = hashedPassword),
        (user.resetToken = undefined),
        (user.expireToken = undefined);
      user.save().then(savedUser =>
        res.json({
          savedUser,
        })
      );
    });
  });
};
