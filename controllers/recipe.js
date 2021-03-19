const express = require("express");
const jwt = require("jsonwebtoken");
const { mongoose, RecipeModel } = require("../db/mongo");
const { User_Recipe_join } = require("../models");

module.exports = {
  info: (req, res) => {
    // 모든 레시피에 대한 정보를 보낸다
    RecipeModel.find({}, (err, result) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200).json(result);
      }
    });
  },
  specificInfo: (req, res) => {
    // 해당 id 값의 레시피에 대한 정보를 보낸다
    const { recipeId } = req.params;
    RecipeModel.find({ id: recipeId }, (err, result) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200).json(result);
      }
    });
  },
  checkedRecipe: (req, res) => {
    const recipeId = req.params.id;
    if (!req.headers.authorization) {
      res.status(404).send("unauthorized user");
    } else {
      // access token 확인
      const token = req.headers.authorization;

      if (token) {
        const token_body = token.split(" ")[1];
        jwt.verify(
          token_body,
          process.env.ACCESS_SECRET,
          async (err, decoded) => {
            if (err) {
              res.status(404).send("invalid access token");
            } else {
              await User_Recipe_join.update(
                {
                  checked: true,
                },
                {
                  where: {
                    userId: decoded.id,
                    recipeId: recipeId,
                  },
                }
              );
              res.status(200).send("checked reciped");
            }
          }
        );
      } else {
        res.status(404).send("unauthorized user");
      }
    }
  },
  upload: (req, res) => {
    // 새로운 레시피를 등록할 때 쓰는 라우팅
    res.status(200).send("레시피 등록 성공");
  },
};
