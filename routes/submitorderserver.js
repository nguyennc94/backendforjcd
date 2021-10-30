var router = require('express').Router();
const axios = require("axios");


router.get(`/id/:id/items/:items/coupon/:coupon/addressscript/:addressscript/deliverymethod/:deliverymethod/payment/:payment`, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let testCoupon;
    if(req.params.coupon == " "){
      testCoupon=" ";
    }
    else{
      testCoupon =  `<item momex:coupon-code="${req.params.coupon}"></item>`
    }
    let body = `<?xml version="1.0"?>
    <transaction	xmlns="http://www.metrex.net/momex/transaction#"
              xmlns:momex="http://www.metrex.net/momex#"
              xmlns:pw="http://www.pharmacywire.com/"
              type="SubmitOrder"
              local="true">
          <momex:authenticate momex:username="xmlconnect_2" momex:password="GAw@FrZ@e9Q@NNZ" />
      <pw:patient momex:id="${req.params.id}"/>
      <order>
        <items>
           ${req.params.items}

           ${testCoupon}
        </items>
        ${req.params.addressscript}
        <shippingfee>${req.params.deliverymethod}</shippingfee>


    ${req.params.payment}
      </order>




    </transaction>
           `

      console.log(body)

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
