const router = require("express").Router();
const path = require("path")
const vision = require('@google-cloud/vision');
const formidable = require('formidable');
const fs = require('fs')
require('dotenv').config()
// REF DOC FOR GOOGLE VISION API: https://googleapis.dev/nodejs/vision/1.8.0/module-@google-cloud_vision.html
// https://cloud.google.com/vision/docs/features-list

router.post('/upload-image', function(req, res) {

  // FORMIDABLE: new form instance
  const form = formidable({ multiples: true });
  form.parse(req)

  let detectType; let filenames = []; let detections = {}; let counter = 0;

  let callVisionText = async (filename) => {
    let getTextDetect = new Promise((detectdata) => {

      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

      client.textDetection('routes/api/uploads/' + filename)
      .then(results => {
        
        let focusDetect = results[0].textAnnotations[0].description;
        let rawDetect = results[0].textAnnotations

        let newdetect = [filename, focusDetect, rawDetect]

        counter++;
        console.log(newdetect)
        console.log("COUNTER TEXT: " +  counter)
        detectdata(newdetect)
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })
    })

    detect = await getTextDetect
    let key = detect[0]; let focused = detect[1]; let raw = detect[2];
    detections[key] = {"focused":focused, "raw": raw} 
    checkCompletion()
  }

  let callVisionImage = async (filename) => {
    let getImagePropDetect = new Promise((detectdata) => {
      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

      client.imageProperties('routes/api/uploads/' + filename)
      .then(results => {

        let focusDetect = results[0].imagePropertiesAnnotation.dominantColors.colors;
        let rawDetect = results[0].imagePropertiesAnnotation

        let newdetect = [filename, focusDetect, rawDetect]

        counter++;
        console.log(newdetect)
        console.log("COUNTER IMG: " +  counter)
        detectdata(newdetect)
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })
    })

    detect = await getImagePropDetect
    let key = detect[0]; let focused = detect[1]; let raw = detect[2];
    detections[key] = {"focused":focused, "raw": raw} 
    checkCompletion()
  }

  let callVisionObject = async (filename) => {
    let getObjectLocalizeDetect = new Promise((detectdata) => {

      const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});
      const request = {
        image: {content: fs.readFileSync('routes/api/uploads/' + filename)},
      };

      client.objectLocalization(request)
      .then(results => {

        let focusDetect = results[0].localizedObjectAnnotations;
        let rawDetect = " "

        let newdetect = [filename, focusDetect, rawDetect]

        counter++;
        console.log(newdetect)
        console.log("COUNTER OBJ: " +  counter)
        detectdata(newdetect)
      })
      .catch(err => {
        console.error("ERROR: ", err)
      })
    })

    detect = await getObjectLocalizeDetect
    let key = detect[0]; let focused = detect[1]; let raw = detect[2];
    detections[key] = {"focused" : focused, "raw" : raw} 
    checkCompletion()
  }

  // RESPONSE: send response after detections for all files are complete
  let checkCompletion = () => {
    if (counter == filenames.length){
      console.log("sending this to client: " + filenames)
      res.json({"filenames": filenames, "detections" : detections})
    }
  }

  // FORMIDABLE: fileupload begin
  form.on("fileBegin", (name, file) => {
      file.path = __dirname + '/uploads/' + file.name
  })

  // FORMIDABLE: instance of file
  form.on("file", (name, file) => {
    filenames.push(file.name); console.log("UPLOADING FILE: " + file.name);

    if (detectType == "text"){
      callVisionText(file.name)
    } else if (detectType == "imageprop"){
      callVisionImage(file.name)
    } else if (detectType == "objectlocalize"){
      callVisionObject(file.name)
    }
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
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;