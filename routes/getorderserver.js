var router = require('express').Router();
const axios = require("axios");


router.get('/orderid/:orderid', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
        xmlns:momex="http://www.metrex.net/momex#"
        type="GetOrders"
        local="true">
        <momex:authenticate momex:username="xmlconnect_2"
        momex:password="GAw@FrZ@e9Q@NNZ" />
        <orders>
            <order momex:id="${req.params.orderid}"/>
            ...
        </orders>
    </transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
