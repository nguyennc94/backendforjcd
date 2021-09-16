var router = require('express').Router();
const axios = require("axios");
const multer = require("multer")
const upload = multer()

router.post('/',upload.single("file"),async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    // console.log(req.file)
    var base64data = Buffer.from(req.file.buffer).toString('base64');
    console.log(base64data)
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
            xmlns:momex="http://www.metrex.net/momex#"
                     xmlns:pw="http://www.pharmacywire.com/"
            type="UploadDocument"
                     local="true">
        <momex:authenticate momex:username="xmlconnect_25"
                               momex:password="984@qSv@rps@R9F"/>
        <momex:document momex:mime-type='${req.file.mimetype}' momex:file-name='prescriptiondocument.png' pw:document-contains-rx="true" momex:mime-encoding="base64">${base64data}
                               </momex:document>
    </transaction>
  `;

      const response = await axios.post("https://jpp.test.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);

  });


  module.exports = router;