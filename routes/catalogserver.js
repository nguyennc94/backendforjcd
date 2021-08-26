var router = require('express').Router();
const axios = require("axios");
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

router.get('/drug/:drug', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

//   let body = `<?xml version="1.0"?> 

//   <transaction xmlns="http://www.metrex.net/momex/transaction#" 
  
//                xmlns:momex="http://www.metrex.net/momex#" 
  
//                xmlns:pw="http://www.pharmacywire.com/" 
  
//                type="Catalog" 
  
//                local="true"> 
  
//       <momex:authenticate momex:username="xmlconnect_25" 
    
//                               momex:password="984@qSv@rps@R9F"/> 
  
//       <momex:criteria> 
  
//           <pw:drug-package-option pw:include-zero-priced="true" 
  
//                  pw:include-inactive="false"/> 
  
//           <pw:drug-pics-search>${req.params.drug}</pw:drug-pics-search> 
  
   
//       </momex:criteria> 
  
//   </transaction> 
// `;

//   const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect", body);
//   const a = response.data
//   console.log(response)
//   const jsonResponse = JSON.stringify(a);
//   res.send(jsonResponse);


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
        await findOneListingByName(client,"PWdata")

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
  }

  main().catch(console.error);

  async function findOneListingByName(client, nameofListing){
    const result = await client.db("PW").collection("PWtest")
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
