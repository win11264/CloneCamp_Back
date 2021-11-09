const { Course } = require("../models");
const { CourseCat } = require("../models");
const { Category } = require("../models");
const { Promotion, Instructor, Topic } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const { Op } = require("sequelize");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

// exports.getAllCourse = async (req,res,next) => {
//     try {
//         const courseResult = await Course.findAll({

//         })
//     }
// }

exports.getAllCoursebyDate = async (req, res, next) => {
  try {
    // const findTopic = await Topic.findAll({ where: { courseId: id } });
    // const mapTopic = findTopic.map(item => item.instructorId);
    // const findIns = await Instructor.findAll({
    //   where: { id: { [Op.or]: mapTopic } },
    // });
    const courseResult = await Course.findAll({
      include: [
        { model: CourseCat, include: { model: Category } },
        { model: Promotion },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      courseResult,
      // findIns
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCoursebyRating = async (req, res, next) => {
  try {
    // const findTopic = await Topic.findAll({ where: { courseId: id } });
    // const mapTopic = findTopic.map(item => item.instructorId);
    // const findIns = await Instructor.findAll({
    //   where: { id: { [Op.or]: mapTopic } },
    // });
    const courseResult = await Course.findAll({
      include: [
        { model: CourseCat, include: { model: Category } },
        { model: Promotion },
      ],
      order: [["rating", "DESC"]],
    });
    res.status(200).json({
      courseResult,
      // findIns
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCourseByPro = async (req, res, next) => {
  try {
    const courseResult = await Course.findAll({
      include: [
        { model: CourseCat, include: { model: Category } },
        { model: Promotion },
      ],
      order: [["discountRate", "DESC"]],
    });
    // console.log('courseResult: ', courseResult);
    res.status(200).json({ courseResult });
    // console.log("courseResult: ", courseResult);
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const courseResult = await Course.findOne({
      where: { id },
      include: { model: Topic, include: { model: Instructor, group: "id" } },
    });
    res.status(200).json({ courseResult });
  } catch (error) {
    next(error.message);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const {
      courseName,
      price,
      duration,
      shortDescription,
      about,
      level,
      clip,
      courseImage,
      categoryId,
      discountRate,
      discountUntil,
    } = req.body;
    // console.log(req.body);
    if (req.user.role === "admin") {
      const result = await uploadPromise(req.file.path);

      if (discountUntil === "") {
        const courseResult = await Course.create({
          courseName,
          price,
          duration,
          shortDescription,
          about,
          level,
          clip,
          courseImage: result.secure_url,
          discountRate,
          discountUntil: null,
        });
        // console.log(`courseResult`, courseResult);
        let preparedInput = categoryId.split(",");

        // if (typeof categoryId === "string") {
        //   preparedInput.push(+categoryId);
        // } else {
        //   categoryId.forEach(item => {
        //     preparedInput.push(+item);
        //   });
        // }
        const input = preparedInput.map(item => ({
          courseId: courseResult.id,
          categoryId: +item,
        }));

        const catmatch = await CourseCat.bulkCreate(input);

        return res.json({ courseResult, catmatch });
      } else {
        const courseResult = await Course.create({
          courseName,
          price,
          duration,
          shortDescription,
          about,
          level,
          clip,
          courseImage: result.secure_url,
          discountRate,
          discountUntil,
        });
        // console.log(`courseResult`, courseResult);
        let preparedInput = categoryId.split(",");

        // if (typeof categoryId === "string") {
        //   preparedInput.push(+categoryId);
        // } else {
        //   categoryId.forEach(item => {
        //     preparedInput.push(+item);
        //   });
        // }
        const input = preparedInput.map(item => ({
          courseId: courseResult.id,
          categoryId: +item,
        }));

        const catmatch = await CourseCat.bulkCreate(input);

        return res.json({ courseResult, catmatch });
      }
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};

exports.updateCourse = async (req, res, next) => {
  // console.log(`req.body`, req.body);
  try {
    const { id } = req.params;
    // console.log(`req.params`, req.params);
    const {
      courseName,
      price,
      duration,
      shortDescription,
      about,
      level,
      clip,
      courseImage,
      discountRate,
      discountUntil,
      categoryId,
    } = req.body;
    // console.log(`req.body`, req.body);

    if (req.user.role === "admin") {
      const result = await uploadPromise(req.file.path);

      if (discountUntil === "null") {
        const [rows] = await Course.update(
          {
            // 10
            courseName,
            price,
            duration,
            shortDescription,
            about,
            level,
            clip,
            courseImage: result.secure_url,
            discountRate,
            discountUntil: null,
          },
          {
            where: {
              id,
            },
          }
        );

        // if (typeof categoryId === "string") {
        //   preparedInput.push(+categoryId);
        // } else {
        //   categoryId.forEach(item => {
        //     preparedInput.push(+item);
        //   });
        // }

        if (categoryId) {
          let preparedInput = categoryId.split(",");
          console.log(`preparedInput`, preparedInput);
          const input = preparedInput.map(item => ({
            courseId: +req.params.id,
            categoryId: +item,
          }));

          const catmatch = await CourseCat.bulkCreate(input);
        }

        return res.json([rows]);
      } else {
        const [rows] = await Course.update(
          {
            // 10
            courseName,
            price,
            duration,
            shortDescription,
            about,
            level,
            clip,
            courseImage: result.secure_url,
            discountRate,
            discountUntil,
          },
          {
            where: {
              id,
            },
          }
        );

        if (categoryId) {
          let preparedInput = categoryId.split(",");
          console.log(`preparedInput`, preparedInput);

          const input = preparedInput.map(item => ({
            courseId: +req.params.id,
            categoryId: +item,
          }));

          const catmatch = await CourseCat.bulkCreate(input);
        }

        return res.json([rows]);
      }
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === "admin") {
      const rows = await Course.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete Course" });
      }

      return res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};

exports.changeCourseStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const [rows] = await Course.update(
      {
        status,
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(`id----->`, id);
    console.log(`status---->`, status);
    res.json([rows]);
  } catch (error) {
    next(error);
  }
};
