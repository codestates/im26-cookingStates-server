const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const axios = require("axios");

module.exports = {
  google: (req, res) => {
    console.log("google-req-body: ", req.body);

    axios
      .post("https://accounts.google.com/o/oauth2/token", {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.body.authorizationCode,
        redirect_uri: "http://localhost:4000/oauth/google/callback",
        grant_type: "authorization_code",
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    // axios
    //   .post(
    //     "https://accounts.google.com/o/oauth2/auth",
    //     {
    //       client_id: clientID,
    //       client_secret: clientSecret,
    //       code: req.body.authorizationCode,
    //       redirect_uri: "http://localhost:4000/oauth/google/callback",
    //       // redirect_uri: "https://cookingstates.cf/oauth/google/callback",
    //     },
    //     {
    //       withCredentials: true,
    //       headers: {
    //         accept: "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("google-response-data", response.data);
    //     res.status(200).json({ accessToken: response.data.access_token });
    //   })
    //   .catch((err) => console.log(err));
  },
  google_callback: (req, res) => {
    // 구글으로부터 POST 요청을 받는 곳
    // req.body.access_token
    console.log("callback-req-body: ", req);

    // {
    //   "access_token" : "ya29.AHES6ZTtm7SuokEB-RGtbBty9IIlNiP9-eNMMQKtXdMP3sfjL1Fc",
    //   "token_type" : "Bearer",
    //   "expires_in" : 3600,
    //   "refresh_token" : "1/HKSmLFXzqP0leUihZp2xUt3-5wkU7Gmu2Os_eBnzw74"
    // }

    // 토큰확인
    axios
      .post("https://accounts.google.com/o/oauth2/token", {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.body.authorizationCode,
        redirect_uri: "http://localhost:4000/oauth/google/callback",
        grant_type: "authorization_code",
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  },
};
