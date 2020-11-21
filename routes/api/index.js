const router = require("express").Router();
const path = require("path")
const vision = require('@google-cloud/vision');
const formidable = require('formidable');
require('dotenv').config()
// REF DOC FOR GOOGLE VISION API: https://googleapis.dev/nodejs/vision/1.8.0/module-@google-cloud_vision.html
// https://cloud.google.com/vision/docs/features-list

router.post('/upload-image', function(req, res) {

  let filenames = [];   let altarr = []; let detections = {}; let counter = 0;

  // FORMIDABLE: new form instance
  const form = formidable({ multiples: true });
  form.parse(req)

  let callVision = async (filename) => {
    let detect;

    let getDetection = new Promise((detectdata) => {

      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

      client.textDetection('routes/api/uploads/' + filename)
      .then(results => {

        let newdetect = [filename, results]
        counter++;
        detectdata(newdetect)

        // let detectsAlt = results[0].textAnnotations[0].description; console.log("ALT DETECTED: " + detectsAlt)
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })
    })

    detect = await getDetection
    let key = detect[0]; let value = detect[1]
    detections[key] = value;

    if (counter == filenames.length){
      res.json({"detections" : detections})
    }
  }

  // FORMIDABLE: fileupload begin
  form.on("fileBegin", (name, file) => {
      file.path = __dirname + '/uploads/' + file.name
  })

  // FORMIDABLE: instance of file
  form.on("file", (name, file) => {
    filenames.push(file.name); console.log("UPLOADING FILE: " + file.name);
    callVision(file.name)
  })

  form.on('end', () => {
    console.log('!!!!FORM HANDLING DONE!!!!!');
  });
});

router.use((req, res) => {
    console.log("api routes have been hit")
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;