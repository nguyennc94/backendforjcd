var router = require('express').Router();
const axios = require("axios");


router.get('/email/:email/password/:password', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const mailjet = require ('node-mailjet')
    .connect('431c6e56e49ff3fd11c0b396955c9b98', '0f369f442c32cafe165033220cf9e2b6')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "reset.password@canadadrugstore.com",
            "Name": "Reset Password"
          },
          "To": [
            {
              "Email": `${req.params.email}`,
            }
          ],
          "TemplateID": 3759506,
          "TemplateLanguage": true,
          "Subject": "Jason's Canada Drugstore - New Password Requested",
          "Variables": {
        "password": `${req.params.password}`
      }
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
      res.send(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
  })

  module.exports = router;
