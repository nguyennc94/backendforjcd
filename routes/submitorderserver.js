var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
           xmlns:momex="http://www.metrex.net/momex#"
           xmlns:pw="http://www.pharmacywire.com/"
           type="SubmitOrder" local="true">
           <momex:authenticate momex:username="xmlconnect_25" momex:password="984@qSv@rps@R9F" />

           <pw:patient momex:id="${req.params.id}"/>
          <order>

          <item momex:id="DP-12881">
          <quantity>1</quantity>
          <price>54.4</price>
          </item>
            <shippingaddress momex:id="4991"/>
            <shippingfee>0</shippingfee>
            <payment type="draft">
              <amount>54.4</amount>
              <draftnumber></draftnumber>
              <firstname>null</firstname>
              <middlename>M</middlename>
              <lastname>null</lastname>
              <institution></institution>
            </payment>
          </order
    </transaction>
  `;

  console.log(body)

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
