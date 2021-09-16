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
    let body = `<?xml version="1.0"?>

    <transaction xmlns="http://www.metrex.net/momex/transaction#"

                 xmlns:momex="http://www.metrex.net/momex#"

                 xmlns:pw="http://www.pharmacywire.com/"

                 type="Catalog"

                 local="true">

                 <momex:authenticate momex:username="xmlconnect_25"

                 momex:password="984@qSv@rps@R9F"/>



    </transaction>
  `;

        const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
        const a = response.data
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);


      async function main(){
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
        const uri = "mongodb+srv://canadadrugstore:02061994@cluster0.issgz.mongodb.net/PW?retryWrites=true&w=majority";


        const client = new MongoClient(uri);

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            // Make the appropriate DB calls
            await createListing(client,{
              name: "PWdata",
              data: a
            })

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
      }

      main().catch(console.error);

      async function createListing( client, newListing){
        const result = await client.db("PW").collection("PWtest")
        .insertOne(newListing)

        console.log(`New listing create with id: ${result.insertedId}`)
      }
  });

//api endpoints
app.use('/login', require('./routes/loginserver'));
app.use('/catalog', require('./routes/catalogserver'));
app.use('/header', require('./routes/headerserver'));
app.use('/register', require('./routes/registerserver'));
app.use('/addshippingaddress', require('./routes/addshippingaddressserver'));
app.use('/prescription', require('./routes/searchserver'));
app.use('/forgotpassword', require('./routes/forgotpasswordserver'));
app.use('/deleteshipping', require('./routes/deleteaddressserver'));
app.use('/updateinfo', require('./routes/updatepatientinfoserver'));
app.use('/editshippingaddress', require('./routes/editshippingaddressserver'));
app.use('/getshippingaddress', require('./routes/getshippingaddressserver'));
app.use('/submitorder', require('./routes/submitorderserver'));
app.use('/verifycoupon', require('./routes/verifycouponserver'));
app.use('/updateinfoprofile', require('./routes/updateinfoprofileserver'));
app.use('/changepassword', require('./routes/setpasswordserver'));
app.use('/getpatientorder', require('./routes/getpatientorderserver'));
app.use('/getorder', require('./routes/getorderserver'));
app.use('/uploadgallery', require('./routes/uploadgalleryserver'));
app.use('/uploadcamera', require('./routes/uploadcameraserver') )

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
