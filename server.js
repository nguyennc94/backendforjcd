const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5001;
const app = express();
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const axios = require("axios");

app.use(cors());
// const corsOptions = {
//     origin: "http://localhost:3000"
// };

app.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
