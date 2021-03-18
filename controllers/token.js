const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = {
  accessToken: (req, res) => {
    const token = req.headers['authorization'];

    if (token) {
      const token_body = token.split(' ')[1];
      jwt.verify(token_body, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
          res.status(400).json({
            data: null,
            message: 'invalid access token',
          });
        } else {
          res.status(200).json({
            data: {
              userInfo: {
                id: decoded.id,
                userName: decoded.userName,
                email: decoded.email,
                createdAt: decoded.createdAt,
                updatedAt: decoded.updatedAt,
              },
              // iat: decoded.iat,
            },
            message: 'ok',
          });
        }
      });
    } else {
      res.status(400).json({
        data: null,
        message: 'invalid access token',
      });
    }
  },
  refreshToken: (req, res) => {
    const refresh = req.cookies.refreshToken;
    if (refresh) {
      if (refresh === 'invalidtoken') {
        res.status(400).json({
          data: null,
          message: 'invalid refresh token, please log in again',
        });
      } else {
        jwt.verify(refresh, process.env.REFRESH_SECRET, (err, decoded) => {
          if (err) {
            // console.log("ERRRRRRRRRRRRR", err);
            res.status(400).json({
              data: null,
              message: 'invalid refresh token',
            });
          } else {
            const access_token = jwt.sign({}, process.env.ACCESS_SECRET);
            res.status(200).json({
              data: {
                accessToken: access_token,
                userInfo: {
                  id: decoded.id,
                  userName: decoded.userName,
                  email: decoded.email,
                  createdAt: decoded.createdAt,
                  updatedAt: decoded.updatedAt,
                },
                // iat: decoded.iat,
              },
              message: 'ok',
            });
          }
        });
      }
    } else {
      res.status(400).json({
        data: null,
        message: 'refresh token not provided',
      });
    }
  },
};
