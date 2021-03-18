const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = {
  accessToken: (req, res) => {
    res.status(200).send('accessToken 발급 성공');
  },
  refreshToken: (req, res) => {
    res.status(200).send('refreshToken 발급 성공');
  },
};
