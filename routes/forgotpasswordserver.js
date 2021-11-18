var router = require('express').Router();
const axios = require("axios");


router.get('/email/:email', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <tr:transaction xmlns:tr="http://www.metrex.net/momex/transaction#"
          xmlns:momex="http://www.metrex.net/momex#"
                            xmlns:mt="http://www.metrex.net/momex/terms#"
          xmlns:pw="http://www.pharmacywire.com/"
                            xmlns:pwire5="http://www.pharmacywire.com/v5" tr:local="true" tr:type="ResetPassword" tr:flush-output="true">
      <momex:authenticate momex:username="xmlconnect_2"
                              momex:password="GAw@FrZ@e9Q@NNZ"/>
      <pwire5:customer pwire5:id="68400"/>
    </tr:transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
