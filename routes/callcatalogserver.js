var router = require('express').Router();
const axios = require("axios");
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

router.get('/', async (req, res) => {
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

               <momex:authenticate momex:username="xmlconnect_9"

               momex:password="EZZ!C7F!68Y!9w3"/>



  </transaction>
`;

      const response = await axios.post("https://jpp.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
    const jsonResponse = JSON.stringify(a);
    res.send(jsonResponse);


    async function main(){
      /**
       * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
       * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
       */
      const uri = "mongodb+srv://canadadrugstore:Health4Ever!@cluster0.tdbsr.mongodb.net/JCDDatabase?retryWrites=true&w=majority";


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
      const result = await client.db("JCDDatabase").collection("PWJCDData")
      .insertOne(newListing)

      console.log(`New listing create with id: ${result.insertedId}`)
    }
});


module.exports = router;