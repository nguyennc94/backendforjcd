var router = require('express').Router();
const axios = require("axios");


router.get('/search/:search', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://elated-jang-6dcf18.netlify.app");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>

    <transaction xmlns="http://www.metrex.net/momex/transaction#"

                 xmlns:momex="http://www.metrex.net/momex#"

                 xmlns:pw="http://www.pharmacywire.com/"

                 type="Catalog"

                 local="true">

        <momex:authenticate momex:username="xmlconnect_25"

                                momex:password="984@qSv@rps@R9F"/>

        <momex:criteria>

            <pw:drug-package-option pw:include-zero-priced="true"

                   pw:include-inactive="false"/>

            <pw:drug-pics-search>${req.params.search}</pw:drug-pics-search>


        </momex:criteria>

    </transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
