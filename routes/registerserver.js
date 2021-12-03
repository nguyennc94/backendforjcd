var router = require('express').Router();
const axios = require("axios");


router.get('/email/:email/fname/:fname/lname/:lname/year/:year/month/:month/day/:day/phone/:phone/areacode/:areacode/billingphone/:billingphone/area1/:area1/faxnumber/:faxnumber/areacodeday/:areacodeday/gender/:gender/feet/:feet/weight/:weight/refill/:refill/password/:password/streetaddress1/:streetaddress1/apt1/:apt1/city1/:city1/region1/:region1/country1/:country1/postal1/:postal1', async (req, res) => {
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
        type="CreatePatient"
        local="true">
      <momex:authenticate momex:username="xmlconnect_9"
                  momex:password="EZZ!C7F!68Y!9w3" />
      <pw:patient momex:affiliate-id="" momex:agent-id="">
        <momex:username>${req.params.email}</momex:username>
        <momex:firstname>${req.params.fname}</momex:firstname>
        <momex:lastname>${req.params.lname}</momex:lastname>
        <momex:dateofbirth>${req.params.year}-${req.params.month}-${req.params.day}</momex:dateofbirth>
        <momex:phone>${req.params.phone}</momex:phone>
        <momex:areacode>${req.params.areacode}</momex:areacode>
        <momex:phone-day>${req.params.billingphone}</momex:phone-day>
        <momex:areacode-day>${req.params.area1}</momex:areacode-day>
        <momex:fax>${req.params.faxnumber}</momex:fax>
        <momex:areacode-fax>${req.params.areacodeday}</momex:areacode-fax>
        <momex:email>${req.params.email}</momex:email>
        <momex:sex>${req.params.gender}</momex:sex>
        <mt:height mt:feet="${req.params.feet}" mt:inches="${req.params.inches}"/>
        <mt:weight mt:unit="lbs">${req.params.weight}</mt:weight>
        <pw:child-resistant-packaging>No</pw:child-resistant-packaging>
        <pw:call-for-refills>${req.params.refill}</pw:call-for-refills>
        <momex:preferred-vendor momex:id=""/>
        <momex:password>${req.params.password}</momex:password>
        <momex:address>
          <momex:address1>${req.params.streetaddress1}-${req.params.apt1}</momex:address1>
          <momex:address2/>
          <momex:address3/>
          <momex:city>${req.params.city1}</momex:city>
          <momex:province>${req.params.region1}</momex:province>
          <momex:country>${req.params.country1}</momex:country>
          <momex:postalcode>${req.params.postal1}</momex:postalcode>
        </momex:address>
         <pw:referral-program></pw:referral-program>
        <pw:referrer-phone-number></pw:referrer-phone-number>
        <pw:secondary-contact></pw:secondary-contact>
        <pw:secondary-contact-phone></pw:secondary-contact-phone>
      </pw:patient>
    </transaction>
  `;

      const response = await axios.post("https://jpp.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
