var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id/shippingaddressid/:shippingaddressid/editshippingstreetaddress/:editshippingstreetaddress/editshippingapt/:editshippingapt/editshippingcity/:editshippingcity/editshippingregion/:editshippingregion/editshippingcountry/:editshippingcountry/editshippingpostal/:editshippingpostal/editshippingalterphone/:editshippingalterphone/editshippingarea/:editshippingarea', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
            xmlns:momex="http://www.metrex.net/momex#"
                  xmlns:pw="http://www.pharmacywire.com/"
            type="EditShippingAddress"
                  local="true">

        <momex:authenticate momex:username="xmlconnect_2"
                               momex:password="GAw@FrZ@e9Q@NNZ"/>
           <pw:patient momex:id="${req.params.id}"/>
           <shippingaddress momex:id="${req.params.shippingaddressid}">
            <momex:address1>${req.params.editshippingstreetaddress}-${req.params.editshippingapt}</momex:address1>
            <momex:address2/>
            <momex:address3/>
            <momex:city>${req.params.editshippingcity}</momex:city>
            <momex:province>${req.params.editshippingregion}</momex:province>
            <momex:country>${req.params.editshippingcountry}</momex:country>
            <momex:postalcode>${req.params.editshippingpostal}</momex:postalcode>
            <momex:phone>${req.params.editshippingalterphone}</momex:phone>
            <momex:areacode>${req.params.editshippingarea}</momex:areacode>
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
