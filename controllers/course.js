const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = {
  info: (req, res) => {
    // get // 모든 코스에 대한 정보를 보낸다
    res.status(200).send('모든 코스 정보 겟');
  },
  specificInfo: (req, res) => {
    // get // 해당 코스에 대한 정보를 보낸다
    // 1 : 한식
    // 2 : 양식
    // 3 : 비건
    // 4 : 디저트
    // 5 : 혼술 안주
    res.status(200).send('특정 코스 정보 겟');
  },
};
