const express = require('express');
const jwt = require('jsonwebtoken');
const { Course } = require('../models');
const { Recipe } = require('../models');

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
    // get // 해당 코스에 대한 정보를 보낸다

    const courseRecipe = await Recipe.findAll({ where: { courseId: req.params.id } });
    console.log(courseRecipe);

    // 몽고디비 데이터 가져오기

    const result = courseRecipe.map((el) => {
      const { id, foodTitle, courseId, difficulty, SEQ } = el.dataValues;
      return {
        id,
        title: foodTitle,
        courseId,
        difficulty,
        image: `https://s3.ap-northeast-2.amazonaws.com/image.cookingstates.cf/recipe_${id}.png`, //! 이미지 업로드
        // way,
        // type
      };
    });

    res.status(200).send('특정 코스 정보 겟');
  },
};
