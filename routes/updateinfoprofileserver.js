var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id/firstname/:firstname/lastname/:lastname/phonenumber/:phonenumber/areacode/:areacode/email/:email/year/:year/month/:month/day/:day/gender/:gender/feet/:feet/inches/:inches/weight/:weight/package/:package/refill/:refill/faxnumber/:faxnumber/areacodeday/:areacodeday', async (req, res) => {
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
        <momex:authenticate momex:username="xmlconnect_25"
                            momex:password="984@qSv@rps@R9F" />
        <pw:patient momex:id="${req.params.id}">
            <momex:firstname>${req.params.firstname}</momex:firstname>
    <momex:lastname>${req.params.lastname}</momex:lastname>
            <momex:phone>${req.params.phonenumber}</momex:phone>
    <momex:areacode>${req.params.areacode}</momex:areacode>
            <momex:username>${req.params.email}</momex:username>
            <momex:dateofbirth>${req.params.year}-${req.params.month}-${req.params.day}</momex:dateofbirth>
            <momex:sex>${req.params.gender}</momex:sex>
            <mt:height mt:feet="${req.params.feet}" mt:inches="${req.params.inches}"/>
            <mt:weight mt:unit="lbs">${req.params.weight}</mt:weight>
            <pw:child-resistant-packaging>${req.params.package}</pw:child-resistant-packaging>
            <pw:call-for-refills>${req.params.refill}</pw:call-for-refills>
            <momex:fax>${req.params.faxnumber}</momex:fax>
    <momex:areacode-fax>${req.params.areacodeday}</momex:areacode-fax>

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
