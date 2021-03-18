const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = {
  info: (req, res) => {
    // 모든 레시피에 대한 정보를 보낸다
    res.status(200).send('모든 레시피 정보 겟');
  },
  specificInfo: (req, res) => {
    // 해당 id 값의 레시피에 대한 정보를 보낸다
    res.status(200).send('특정 레시피 정보 겟');
  },
  upload: (req, res) => {
    // 새로운 레시피를 등록할 때 쓰는 라우팅
    res.status(200).send('레시피 등록 성공');
  },
};
