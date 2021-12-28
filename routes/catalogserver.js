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


  async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://CanadaDrugstore:Health4Ever!@cluster0.4uuz2.mongodb.net/Catalog?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await findOneListingByName(client,"PWdata")

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
  }

  main().catch(console.error);

  async function findOneListingByName(client, nameofListing){
    const result = await client.db("Catalog").collection("Products")
    .findOne({name:nameofListing})
    if(result) {
      console.log(`Found a listing in the collection with the name ${nameofListing}`)
      const jsonResponse = JSON.stringify(result.data);
      res.send(jsonResponse);
    }
    else{
      console.log(`No Found a listing in the collection with the name ${nameofListing}`)
    }

  }

});


module.exports = router;
