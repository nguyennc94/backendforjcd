var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id/couponcode/:couponcode/paymenttype/:paymenttype', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>

    <transaction xmlns="http://www.metrex.net/momex/transaction#"

    xmlns:momex="http://www.metrex.net/momex#"

    xmlns:pw="http://www.pharmacywire.com/"

    type="VerifyCoupons"

    local="true">

    <momex:authenticate momex:username="xmlconnect_25"

    momex:password="984@qSv@rps@R9F" />

    <pw:patient momex:id="${req.params.id}"/>

    <pw:coupons>

        <pw:coupon pw:coupon-code="${req.params.couponcode}"/>

    </pw:coupons>

    <payment type="${req.params.paymenttype}"/>

    </transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
