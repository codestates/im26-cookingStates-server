const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  login: async (req, res) => {
    // post
    const { email, password } = req.body;

    // 일치하는 정보를 가진 유저가 있는지 확인
    const userInfo = await User.findOne({ where: { email: email } });

    if (!userInfo) {
      // 없으면 'Invalid user'
      res.status(404).send("invalid user");
    } else if (userInfo.password !== password) {
      // 비밀번호가 다르면 'Wrong password'
      res.status(400).send("wrong password");
    } else {
      // access & refresh token을 만들어 준다.
      let data = { ...userInfo.dataValues };
      delete data.password;

      const accessToken = await jwt.sign(data, process.env.ACCESS_SECRET, {
        expiresIn: "60m",
      });
      const refreshToken = await jwt.sign(data, process.env.REFRESH_SECRET, {
        expiresIn: "10d",
      });

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
    const { email, password, userName, bio } = req.body;

    if (!email || !password || !userName) {
      // 하나라도 없을 때
      res.status(400).send("insufficient parameters supplied");
    }

    const userInfo = await User.findOne({ where: { email: email } });
    if (userInfo) {
      res.status(409).send("email already in use");
    } else {
      const newUserInfo = await User.create({
        email,
        password,
        userName,
        bio,
        score: 0,
        isPassed: false,
      });
      res.status(201).json(newUserInfo);
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
              res.status(200).json(userInfo);
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
      await User.update(
        { password, userName, score, bio },
        { where: { email: email } }
      );
      res.status(200).send("successfully updated");
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
          .send("successfully signed out!");
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
};
