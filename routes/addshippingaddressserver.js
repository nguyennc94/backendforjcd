var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id/streetaddress/:streetaddress/apt/:apt/city/:city/region/:region/country/:country/postal/:postal/alterphone/:alterphone/area/:area', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
        xmlns:momex="http://www.metrex.net/momex#"
        xmlns:pw="http://www.pharmacywire.com/"
        type="AddShippingAddress"
        local="true">
      <momex:authenticate momex:username="xmlconnect_2"
                momex:password="GAw@FrZ@e9Q@NNZ"/>
      <pw:patient momex:id="${req.params.id}"/>
      <shippingaddress>
        <momex:address1>${req.params.streetaddress}-${req.params.apt}</momex:address1>
        <momex:address2/>
        <momex:address3/>
        <momex:city>${req.params.city}</momex:city>
        <momex:province>${req.params.region}</momex:province>
        <momex:country>${req.params.country}</momex:country>
        <momex:postalcode>${req.params.postal}</momex:postalcode>
        <momex:phone>${req.params.alterphone}</momex:phone>
        <momex:areacode>${req.params.area}</momex:areacode>
      </shippingaddress>
    </transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
