const express = require("express");
const { Course, User, User_Course_join } = require("../models");
const { RecipeModel } = require("../db/mongo");

module.exports = {
  info: async (req, res) => {
    const courseInfo = await Course.findAll();
    const result = courseInfo.map((el) => {
      const { id, courseName, description } = el.dataValues;
      return {
        id,
        title: courseName,
        description,
        image: `https://s3.ap-northeast-2.amazonaws.com/image.cookingstates.cf/course_${id}.png`,
      };
    });

    if (courseInfo) {
      res.status(200).json(result);
    } else {
      res.status(404).send("request failed");
    }
  },
  specificInfo: async (req, res) => {
    await RecipeModel.find({ courseId: req.params.id }, (err, recipe) => {
      const result = recipe.map((el) => {
        const { id, title, courseId, difficulty, way, type, image } = el;
        return {
          id,
          title,
          courseId,
          difficulty,
          way,
          type,
          image,
        };
      });
      res.status(200).json(result);
    });
  },
  addCourse: async (req, res) => {
    const { courseName, courseDiscription } = req.body;
    const result = await Course.create({
      courseName: courseName,
      description: courseDiscription,
    });

    res.status(200).send("코스 추가 완료");
  },

  complete: async (req, res) => {
    try {
      const { email, courseId, isPassed } = req.body;
      const userInfo = await User.findOne({ where: { email: email } });

      await User.update({ isPassed: isPassed }, { where: { email: email } });

      if (isPassed) {
        await User_Course_join.update(
          { endDate: new Date() },
          { where: { userId: userInfo.id, courseId: courseId } }
        );
      } else {
        await User_Course_join.update(
          { endDate: null },
          { where: { userId: userInfo.id, courseId: courseId } }
        );
      }
      res.status(200).json("successfully updated!");
    } catch (err) {
      console.log(err);
    }
  },
};
