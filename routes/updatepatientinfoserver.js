var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id/billingphone/:billingphone/area1/:area1/streetaddress1/:streetaddress1/apt1/:apt1/city1/:city1/region1/:region1/country1/:country1/postal1/:postal1', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
            xmlns:momex="http://www.metrex.net/momex#"
            xmlns:mt="http://www.metrex.net/momex/terms#"
            xmlns:pw="http://www.pharmacywire.com/"
            type="SetPatientInfo"
            local="true">
        <momex:authenticate momex:username="xmlconnect_2"
                            momex:password="GAw@FrZ@e9Q@NNZ" />
        <pw:patient momex:id="${req.params.id}">
            <momex:phone-day>${req.params.billingphone}</momex:phone-day>
      <momex:areacode-day>${req.params.area1}</momex:areacode-day>
            <momex:address>
            <momex:address1>${req.params.streetaddress1}-${req.params.apt1}</momex:address1>
            <momex:address2/>
            <momex:address3/>
            <momex:city>${req.params.city1}</momex:city>
            <momex:province>${req.params.region1}</momex:province>
            <momex:country>${req.params.country1}</momex:country>
            <momex:postalcode>${req.params.postal1}</momex:postalcode>

        </momex:address>
        </pw:patient>
    </transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
