const express = require("express");
const jwt = require("jsonwebtoken");
const { mongoose, RecipeModel, CustomRecipeModel } = require("../db/mongo");
const { User_Recipe_join } = require("../models");
const AWS = require("aws-sdk");

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
    const recipeId = req.params.id;
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
        const isChecked = req.body.isChecked;
        jwt.verify(
          token_body,
          process.env.ACCESS_SECRET,
          async (err, decoded) => {
            if (err) {
              res.status(404).send("invalid access token");
            } else {
              await User_Recipe_join.update(
                {
                  checked: isChecked,
                },
                {
                  where: {
                    userId: decoded.id,
                    recipeId: recipeId,
                  },
                }
              );
              res.status(200).send("applied");
            }
          }
        );
      } else {
        res.status(404).send("unauthorized user");
      }
    }
  },
  upload: (req, res) => {
    const default_image_url =
      "https://s3.ap-northeast-2.amazonaws.com/image.cookingstates.cf/default.png";

    const body = JSON.parse(req.body.data);

    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: "ap-northeast-2",
    });

    const body_image_data = Buffer.from(req.file.buffer, "binary");

    const param = {
      Bucket: "image.cookingstates.cf",
      Key: `${req.file.originalname}`,
      ACL: "public-read",
      Body: body_image_data,
      ContentType: req.file.mimetype,
    };

    s3.upload(param, (err, data) => {
      //callback function
      if (err) {
        console.log("image upload err : " + err);
        res.status(200).send("레시피 등록 실패");
        return;
      }
      const maked = new CustomRecipeModel({
        id: `${body.email}_${body.title}`,
        author: body.author,
        title: body.title,
        difficulty: body.difficulty,
        type: body.type,
        image: data.Location,
        manual: body.manual,
        email: body.email,
      });
      maked.save((err, result) => {
        if (err) {
          res.status(200).send("레시피 등록 실패");
        } else {
          // console.log("result : ", result);
          res.status(200).json(data);
        }
      });
    });
  },

  custom: (req, res) => {
    CustomRecipeModel.find({}, (err, result) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200).json(result);
      }
    });
  },
};
