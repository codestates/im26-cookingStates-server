const express = require('express');
const { Course } = require('../models');
const { RecipeModel } = require('../db/mongo');

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
      res.status(404).send('request failed');
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
          image.small 
        };
      });
      res.status(200).json(result);
    });
  },
};
