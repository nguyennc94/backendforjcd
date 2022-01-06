const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5001;
const app = express();
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const axios = require("axios");

app.use(cors());
// const corsOptions = {
//     origin: "https://elated-jang-6dcf18.netlify.app"
// };

app.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send("Welcome")

  });



app.get('/users/:users/password/:password', async (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      let body = `<?xml version="1.0"?>
      <transaction xmlns="http://www.metrex.net/momex/transaction#"
                   xmlns:momex="http://www.metrex.net/momex#"
                   type="AuthenticateUser"
                   local="true">
          <momex:authenticate momex:username="xmlconnect_9" momex:password="EZZ!C7F!68Y!9w3"/>
          <users>
            <user>
              <username>${req.params.users}</username>
              <password>${req.params.password}</password>
            </user>
          </users>
      </transaction>
    `;

        const response = await axios.post("https://jpp.pharmacywire.com/momex/NavCode/xmlconnect",body);
        const a = response.data
        console.log(response)
        const jsonResponse = JSON.stringify(a);
        res.send(jsonResponse);
    });





//api endpoints
// app.use('/login', require('./routes/loginserver'));
// // app.use('/catalog', require('./routes/catalogserver'));
// app.use('/header', require('./routes/headerserver'));
// app.use('/register', require('./routes/registerserver'));
// app.use('/addshippingaddress', require('./routes/addshippingaddressserver'));
// app.use('/prescription', require('./routes/searchserver'));
// app.use('/forgotpassword', require('./routes/forgotpasswordserver'));
// app.use('/deleteshipping', require('./routes/deleteaddressserver'));
// app.use('/updateinfo', require('./routes/updatepatientinfoserver'));
// app.use('/editshippingaddress', require('./routes/editshippingaddressserver'));
// app.use('/getshippingaddress', require('./routes/getshippingaddressserver'));
// app.use('/submitorder', require('./routes/submitorderserver'));
// app.use('/verifycoupon', require('./routes/verifycouponserver'));
// app.use('/updateinfoprofile', require('./routes/updateinfoprofileserver'));
// app.use('/changepassword', require('./routes/setpasswordserver'));
// app.use('/getpatientorder', require('./routes/getpatientorderserver'));
// app.use('/getorder', require('./routes/getorderserver'));
// app.use('/uploadgallery', require('./routes/uploadgalleryserver'));
// app.use('/uploadcamera', require('./routes/uploadcameraserver') )
// app.use('/userstatus', require('./routes/userstatusserver') )
// app.use('/resetpassword', require('./routes/resetpasswordserver') )
// app.use('/catalog1', require('./routes/catalogserver1'));
// app.use('/callcatalog', require('./routes/callcatalogserver'));


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});


