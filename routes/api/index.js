const router = require("express").Router();
const path = require("path")
const vision = require('@google-cloud/vision');
const formidable = require('formidable');
require('dotenv').config()
// REF DOC FOR GOOGLE VISION API: https://googleapis.dev/nodejs/vision/1.8.0/module-@google-cloud_vision.html
// https://cloud.google.com/vision/docs/features-list

router.post('/upload-image', function(req, res) {

  // FORMIDABLE: new form instance
  const form = formidable({ multiples: true });
  form.parse(req)

  let detectType; let filenames = []; let detections = {}; let counter = 0;

  let callVision = async (filename) => {

    // TEXT DETECTION PROMISE
    let getTextDetect = new Promise((detectdata) => {

      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

      client.textDetection('routes/api/uploads/' + filename)
      .then(results => {
        
        let focusDetect = results[0].textAnnotations[0].description;
        let rawDetect = results[0].textAnnotations

        let newdetect = [filename, focusDetect, rawDetect]

        counter++;
        console.log(newdetect)
        detectdata(newdetect)
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })
    })

    // IMAGE PROPERTY DETECTION PROMISE
    let getImagePropDetect = new Promise((detectdata) => {
      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

      client.imageProperties('routes/api/uploads/' + filename)
      .then(results => {

        let focusDetect = results[0].imagePropertiesAnnotation.dominantColors.colors;
        let rawDetect = results[0].imagePropertiesAnnotation

        let newdetect = [filename, focusDetect, rawDetect]

        counter++;
        console.log(newdetect)
        detectdata(newdetect)
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })
    })

  
    // OBJECT LOCALIZATION DETECTION PROMISE
    let getObjectLocalizeDetect = new Promise((detectdata) => {
      detectdata
    })

        // CALL DETECTION PROMISE
        let detect;

        if (detectType == "text"){ 
          detect = await getTextDetect; 
          let key = detect[0]; let focused = detect[1]; let raw = detect[2];
          detections[key] = {"focused":focused, "raw":raw} 
    
                  // SEND RESPONSE
                  if (counter == filenames.length){
                    res.json({"detectionsRaw" : detections})
                  }
    
        } else if (detectType == "imageprop"){
          detect = await getImagePropDetect; 
          let key = detect[0]; let focused = detect[1]; let raw = detect[2];
          detections[key] = {"focused":focused, "raw":raw} 
    
                  // SEND RESPONSE
                  if (counter == filenames.length){
                    res.json({"detectionsRaw" : detections})
                  }
    
        } else if (detectType == "objectlocal"){
    
        }
  }

  // FORMIDABLE: fileupload begin
  form.on("fileBegin", (name, file) => {
      file.path = __dirname + '/uploads/' + file.name
      console.log('!!!!FORM HANDLING BEGIN!!!!!');
  })

  // FORMIDABLE: instance of file
  form.on("file", (name, file) => {
    filenames.push(file.name); console.log("UPLOADING FILE: " + file.name);
    callVision(file.name)
  })

  // FORMIDABLE: instance of field
  form.on("field", (name, field) => {
    console.log("FIELD DETECTED: " + name + " is " + field);
    detectType = field
  })

  // FORMIDABLE: fileupload end
  form.on('end', () => {
    console.log('!!!!FORM HANDLING DONE!!!!!');
  });
});

router.use((req, res) => {
    console.log("api routes have been hit")
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;