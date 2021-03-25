const express = require("express");
const jwt = require("jsonwebtoken");
const { User, User_Course_join, User_Recipe_join } = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // 일치하는 정보를 가진 유저가 있는지 확인
      const userInfo = await User.findOne({ where: { email: email } });

      console.log(password, userInfo.password);

      bcrypt.compare(password, userInfo.password, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result) {
            // 일치할 때
            let data = { ...userInfo.dataValues };
            delete data.password;

            const accessToken = await jwt.sign(
              data,
              process.env.ACCESS_SECRET,
              {
                expiresIn: "60m",
              }
            );
            const refreshToken = await jwt.sign(
              data,
              process.env.REFRESH_SECRET,
              {
                expiresIn: "10d",
              }
            );

            res
              .cookie("refreshToken", refreshToken, {
                domain: "localhost", //! 수정하기
                path: "/",
                secure: false, //! 수정하기
                httpOnly: true,
                sameSite: "none",
              })
              .status(200)
              .json({ accessToken: accessToken });
          } else {
            // 일치하지 않을때
            res.status(400).send("wrong password");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  logout: async (req, res) => {
    // get  // access token 확인 // (req.headers.authorization)
    if (!req.headers.authorization) {
      // 토큰 없을때
      res.status(400).send("you're currently not logined");
    } else {
      // 토큰 있을때
      const userInfo = await User.findOne({ where: { email: req.body.email } });
      if (!userInfo) {
        res.status(400).send("you're currently not logined");
      } else {
        const accessToken = await jwt.sign({}, process.env.ACCESS_SECRET, {
          expiresIn: "1",
        });
        res
          .clearCookie("refreshToken")
          .status(200)
          .send("successfully signed out!");
      }
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, userName, bio, socialType } = req.body;
      let type = "U";

      if (socialType === "kakao") {
        type = "Sk";
      }

      if (!email || !password || !userName) {
        // 하나라도 없을 때
        res.status(400).send("insufficient parameters supplied");
      }

      const userInfo = await User.findOne({ where: { email: email } });

      if (userInfo) {
        res.status(409).send("email already in use");
      } else {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) {
            console.log(err);
          } else {
            // 암호화된 비밀번호 만드는데 성공했을 때
            const newUserInfo = await User.create({
              email,
              password: hash,
              userName,
              bio,
              score: 0,
              isPassed: false,
              type,
            });

            const inputId = newUserInfo.dataValues.id;
            //console.log("userInfo : ", newUserInfo);
            // console.log("인풋아이디 : ", inputId);

            await User_Course_join.bulkCreate([
              {
                userId: inputId,
                courseId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                userId: inputId,
                courseId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                userId: inputId,
                courseId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                userId: inputId,
                courseId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                userId: inputId,
                courseId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]);

            await User_Recipe_join.bulkCreate([
              {
                checked: false,
                userId: inputId,
                recipeId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 11,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 12,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 13,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 14,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 16,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 17,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 18,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 19,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 20,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 21,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 22,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 23,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 24,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                checked: false,
                userId: inputId,
                recipeId: 25,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]);
            //console.log("userInfo!!!! : ", newUserInfo);
            res.status(201).json(newUserInfo);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  info: async (req, res) => {
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
              const userInfo = await User.findOne({
                where: { id: decoded.id },
              });

              let userInfoResult = { ...userInfo.dataValues };
              delete userInfoResult.password;

              const recentCourse = await User_Course_join.findAll({
                where: { userId: userInfo.id },
              })
                .then((res) =>
                  res.reduce(
                    (acc, cur) =>
                      acc.updatedAt > cur.dataValues.updatedAt
                        ? acc
                        : cur.dataValues,
                    res[0].dataValues
                  )
                )
                .then((latest) => latest.courseId);

              const passedRecipesOfRecentCourse = await User_Recipe_join.findAll(
                {
                  where: { userId: userInfo.id },
                }
              ).then((res) => {
                // console.log("res[0].dataValues.recipeId", res[0].dataValues.recipeId);
                // console.log("recentCourse", recentCourse);
                const temp = [1, 2, 3, 4, 5];
                const group = temp.map((el) => el + (recentCourse * 5 - 5)); //! 위험한 알고리즘...

                let result = [];
                res.map((el) => {
                  if (
                    el.dataValues.checked &&
                    group.includes(el.dataValues.recipeId)
                  )
                    result.push(el.dataValues.recipeId);
                });
                return result;
              });
              //console.log(passedRecipesOfRecentCourse);

              const passedRecipes = await User_Recipe_join.findAll({
                where: { userId: userInfo.id },
              }).then((res) => {
                //console.log("res[0].dataValues", res[0].dataValues);
                let result = [];
                res.map((el) => {
                  //console.log("el.dataValues.checked", el.dataValues.checked);
                  if (el.dataValues.checked) {
                    result.push(el.dataValues.recipeId);
                  }
                  //console.log(result);
                });
                return result;
              });

              const passedCourses = await User_Course_join.findAll({
                where: { userId: userInfo.id },
              }).then((res) => {
                let result = [];
                res.map((el) => {
                  //console.log("el.dataValues.endDate", el.dataValues.endDate);
                  if (el.dataValues.endDate) {
                    result.push({
                      courseId: el.dataValues.courseId,
                      endDate: String(el.dataValues.endDate).slice(0, 15),
                    });
                  }
                });
                return result;
              });

              //console.log("passedCourses", passedCourses);

              userInfoResult.course = {
                recentCourse, // Number // updatedAt이 가장 최신인 것의 courseId
                passedRecipesOfRecentCourse, // [1, 2, 3..]
                passedRecipes,
                passedCourses, // [{courseId, endDate}, {}, {} ..] endDate의 값이 true인지 아닌지
              };
              // console.log(userInfoResult);
              res.status(200).json(userInfoResult);
            }
          }
        );
      } else {
        res.status(404).send("unauthorized user");
      }
    }
  },
  update: async (req, res) => {
    // post
    const { email, password, userName, score, bio } = req.body;

    if (!req.headers.authorization) {
      // 토큰 없을때
      res.status(400).send("unauthorized user");
    } else {
      // 토큰 있을때
      const userInfo = await User.findOne({ where: { email: email } });

      bcrypt.compare(password, userInfo.password, async (err, result) => {
        if (err) {
          res.status(400).send("wrong password");
        } else {
          if (result) {
            // 일치할 때
            await User.update(
              { password, userName, score, bio },
              { where: { email: email } }
            );
            res.status(200).send("successfully updated");
          }
        }
      });
    }
  },

  unregister: async (req, res) => {
    // req.body.email
    if (!req.headers.authorization) {
      // 토큰 없을때
      res.status(400).send("you're currently not logined");
    } else {
      // 토큰 있을때
      const userInfo = await User.findOne({ where: { email: req.body.email } });
      if (!userInfo) {
        res.status(400).send("you're currently not logined");
      } else {
        const accessToken = await jwt.sign({}, process.env.ACCESS_SECRET, {
          expiresIn: "1",
        });
        await User.destroy({
          where: {
            email: userInfo.email,
          },
        });
        res
          .clearCookie("refreshToken")
          .status(200)
          .send("successfully unregistered!");
      }
    }
  },
  checkemail: async (req, res) => {
    const userInfo = await User.findOne({ where: { email: req.body.email } });
    if (userInfo) {
      res.status(409).send("email already in use");
    } else {
      res.status(200).send("ok");
    }
  },
  all: async (req, res) => {
    if (!req.headers.authorization) {
      // 토큰 없을때
      res.status(400).send("you're currently not logined");
    } else {
      const token = req.headers.authorization;
      // 토큰 있을때
      const token_body = token.split(" ")[1];
      const userData = jwt.decode(token_body);
      if (userData.type === "A") {
        const userInfo = await User.findAll();
        res.json({ userInfo });
      }
      // jwt.verify(token_body, process.env.ACCESS_SECRET, (err, decoded) => {
      //   if (err) {
      //     console.log(err);
      //     res.status(404).send("invalid access token");
      //   } else {
      //     console.log(decoded);
      //   }
      // });
    }
  },
  permission: async (req, res) => {
    console.log(req.body);
    // console.log(req.headers);
    if (!req.headers.authorization) {
      // 토큰 없을때
      res.status(400).send("you're currently not logined");
    } else {
      const token = req.headers.authorization;
      // 토큰 있을때
      const token_body = token.split(" ")[1];
      const userData = jwt.decode(token_body);
      if (userData.type === "A") {
        await User.update(
          { type: req.body.type },
          { where: { email: req.body.email } }
        );
        res.status(200).send("권한 부여 완료");
      } else {
        res.status(401);
      }
    }
  },
};
