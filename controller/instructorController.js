const { Instructor } = require("../models");
const { InstructorCat } = require("../models");
const { Category } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");

const app = express();

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.getAllInstructor = async (req, res, next) => {
  try {
    const insResult = await Instructor.findAll({
      include: { model: InstructorCat, include: { model: Category } },
    });

    res.json({ insResult });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorByRating = async (req, res, next) => {
  try {
    const insResultRating = await Instructor.findAll({
      include: { model: InstructorCat, include: { model: Category } },
      order: [["rating", "DESC"]],
    });

    res.json({ insResultRating });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instructorResult = await Instructor.findOne({
      where: { id },
      include: { model: InstructorCat, include: { model: Category } },
    });
    res.json({ instructorResult });
  } catch (error) {
    next(error.message);
  }
};

exports.createInstructor = async (req, res, next) => {
  try {
    const {
      fullName,
      jobTitle,
      about,
      expertise,
      website,
      email,
      facebook,
      youtube,
      linkedin,
      twitter,
      profileImage,
      categoryId,
    } = req.body;
    // console.log(`fullName`, fullName);
    // console.log(`req.user.role`, req.user.role);
    if (req.user.role === "admin") {
      if (req.file) {
        const result = await uploadPromise(req.file.path);
        const insResult = await Instructor.create({
          // 10
          fullName,
          jobTitle,
          about,
          expertise,
          website,
          email,
          facebook,
          youtube,
          linkedin,
          twitter,
          profileImage: result.secure_url,
        });

        let preparedInput = categoryId.split(",");
        // let preparedInput = [];

        // if (typeof categoryId === "string") {
        //   preparedInput.push(+categoryId);
        // } else {
        //   categoryId.forEach(item => {
        //     preparedInput.push(+item);
        //   });
        // }
        const input = preparedInput.map(item => ({
          instructorId: insResult.id,
          categoryId: +item,
        }));
        console.log(`input`, input);

        const catmatch = await InstructorCat.bulkCreate(input);

        fs.unlinkSync(req.file.path);

        return res.json({ insResult, catmatch });
      } else {
        const insResult = await Instructor.create({
          fullName,
          jobTitle,
          about,
          expertise,
          website,
          email,
          facebook,
          youtube,
          linkedin,
          twitter,
        });

        let preparedInput = [];

        if (typeof categoryId === "string") {
          preparedInput.push(+categoryId);
        } else {
          categoryId.forEach(item => {
            preparedInput.push(+item);
          });
        }
        const input = preparedInput.map(item => ({
          instructorId: insResult.id,
          categoryId: item,
        }));
        // console.log(`input`, input);

        const catmatch = await InstructorCat.bulkCreate(input);

        return res.json({ insResult, catmatch });
      }
    }

    res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.updateInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      jobTitle,
      about,
      expertise,
      website,
      email,
      facebook,
      youtube,
      linkedin,
      twitter,
      profileImage,
    } = req.body;
    if (req.user.role === "admin") {
      if (req.file) {
        const result = await uploadPromise(req.file.path);
        const [rows] = await Instructor.update(
          {
            // 10
            fullName,
            jobTitle,
            about,
            expertise,
            website,
            email,
            facebook,
            youtube,
            linkedin,
            twitter,
            profileImage: result.secure_url,
          },
          {
            where: {
              id,
            },
          }
        );

        return res.json([rows]);
      } else {
        const [rows] = await Instructor.update(
          {
            fullName,
            jobTitle,
            about,
            expertise,
            website,
            email,
            facebook,
            youtube,
            linkedin,
            twitter,
          },
          {
            where: {
              id,
            },
          }
        );

        return res.json([rows]);
      }
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === "admin") {
      const rows = await Instructor.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete instructor" });
      }

      res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err);
  }
};
