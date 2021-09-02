var router = require('express').Router();
const axios = require("axios");


router.get(`/id/:id/items/:items/coupon/:coupon`, async (req, res) => {
  ///addressscript/:addressscript/deliverymethod/:deliverymethod
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>

    <transaction	xmlns="http://www.metrex.net/momex/transaction#"

            xmlns:momex="http://www.metrex.net/momex#"

            xmlns:pw="http://www.pharmacywire.com/"

            type="SubmitOrder"

            local="true">

    <momex:authenticate momex:username="xmlconnect_25" momex:password="984@qSv@rps@R9F" />

    <pw:patient momex:id="${req.params.id}"/>

    <order>
    <items>
    ${req.params.items}
    <item momex:coupon-code="${couponCode}"></item>

    </items>

    ${addressscript}

    <shippingfee>${deliveryMethod}</shippingfee>

    <payment type="draft">

<amount>99.99</amount>

<draftnumber></draftnumber>

<firstname>Test</firstname>

<middlename>M</middlename>

<lastname>Tester</lastname>

<institution>First National</institution>

</payment>

    </order>

    </transaction>
           `

  console.log(req.params.items)

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
