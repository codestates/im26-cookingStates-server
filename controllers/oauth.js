const axios = require("axios");

module.exports = {
  kakao: (req, res) => {
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
    const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const AUTHORIZATION_CODE = req.body.authorizationCode;
    const KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${AUTHORIZATION_CODE}`;

    axios
      .post(
        KAKAO_TOKEN_URL,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const { access_token, token_type, refresh_token } = response.data;
        return res
          .cookie("refreshToken", refresh_token, {
            domain: "localhost", // !ec2에서 바꾸기
            path: "/",
            secure: false, // !ec2에서 바꾸기
            httpOnly: true,
            sameSite: "none",
          })
          .status(200)
          .json({ access_token, token_type });
      })
      .catch((e) => console.log(e));
  },

  kakao_callback: (req, res) => {
    //console.log("~~~~~~~~~~~~~~~~~~~~`", req);
  },
};
