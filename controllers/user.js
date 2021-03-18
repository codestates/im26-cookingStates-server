const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    // post
    // const {email, password} = req.body
    //* 1. if - 일치하는 정보를 가진 유저가 있는지 확인
    //? 없으면 'Invalid user'
    //? 비밀번호 확인
    //? 없으면 'Wrong password'
    //* 2. if - access token 확인 (req.headers.authorization)
    //? access & refresh token을 만들어 준다.

    res.status(200).send('로그인 성공');
  },
  logout: (req, res) => {
    // get  // access token 확인

    //* 1. 토큰 없을때
    //? 'you're currently not logined'
    //* 2. 토큰 있을때
    //? req.headers.authorization에 담긴 토큰이 서버에서 생성한 JWT인지 확인
    //? 서버에서 생성한 유효한 토큰일 경우
    //? 토큰 추출 & 토큰 확인 & 디코딩한 값(email)과 일치하는 유저가 있는지 확인
    //? 토큰 access & refresh 두개 다 지우기
    //? 응답
    //* 2-2. 유효하지 않은 토큰일 경우

    res.status(200).send('로그아웃 성공');
  },
  register: (req, res) => {
    // post
    // const {email, password, name, score, bio} = req.body
    // mysql에 저장
    res.status(200).send('가입 성공');
  },
  info: (req, res) => {
    // get  // access token 확인

    res.status(200).send('마이페이지 성공');
  },
  update: (req, res) => {
    // post
    // const {email, password, name, score, bio} = req.body
    res.status(200).send('회원정보수정 성공');
  },
  unregister: (req, res) => {
    // post
    // req.body.email
    res.status(200).send('회원탈퇴 성공');
  },
};
