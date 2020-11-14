const router = require("express").Router();
const path = require("path")
const vision = require('@google-cloud/vision');

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads'});

const fileUpload = require('express-fileupload');
const formidable = require('formidable');
var fs = require('fs');

require('dotenv').config()


// REF DOC FOR GOOGLE VISION API: https://googleapis.dev/nodejs/vision/1.8.0/module-@google-cloud_vision.html

router.post('/upload-image', function(req, res) {

  console.log("api routing / upload-image route hit")

  // FORMIDABLE: new form instance
  const form = new formidable.IncomingForm()

  form.parse(req)

  form.on("fileBegin", (name, file) => {
      file.path = __dirname + '/uploads/' + file.name
      console.log("fileBegin file path: " + file.path)
  })

  form.on("file", (name, file) => {
      fileName = file.name; console.log("uploaded file: " + file.name)

      // GOOGLE VISION API: text detection instance
      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});
      // const client = new vision.ImageAnnotatorClient({ client_email: process.env.CLIENT_EMAIL, private_key: process.env.VISION_API_KEY_JSON.PRIVATE_KEY});

      // Performs label detection on the image file
      client.textDetection('routes/api/uploads/' + file.name)
      .then(results => {
        const detections = results[0].textAnnotations;
        console.log('Text:');
        detections.forEach(text => console.log(text));
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })

      res.send("fileName: " + file.name)
  })

});

router.use((req, res) => {
    console.log("api routes have been hit")
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;