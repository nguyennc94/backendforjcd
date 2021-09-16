var router = require('express').Router();
const axios = require("axios");


router.get(`/id/:id/items/:items/coupon/:coupon/addressscript/:addressscript/deliverymethod/:deliverymethod/payment/:payment`, async (req, res) => {
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
    <shippingfee>$25</shippingfee>
      <pw:patient momex:id="${req.params.id}"/>
      <order>
        <items>

				<item momex:id="DP-12864">
				<quantity>2</quantity>
				<price>13.47</price>


			  </item>
        </items>
        <shippingaddress momex:id="5067"/>
      <payment type="creditcard">
			<cardtype>Visa</cardtype>
			<cardnumber>4111111111111111</cardnumber>
			<cvv>111</cvv>
			<expirymonth>12</expirymonth>
			<expiryyear>2022</expiryyear>
			<firstname>Test</firstname>
			<middlename>M</middlename>
			<lastname>Customer</lastname>
			<address>999 Some St.</address>
			<city>Winnipeg</city>
			<state>Manitoba</state>
			<country>Canada</country>
			<postalcode>R3W4G4</postalcode>


		</payment>
      </order>


    </transaction>
           `

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
