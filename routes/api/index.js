const router = require("express").Router();
const path = require("path")
const vision = require('@google-cloud/vision');
const multer = require("multer");
const fs = require('fs')
const AWS = require('aws-sdk');

require('dotenv').config()

// MULTER STORAGE configurations
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

// AWS S3 configurations
const S3_BUCKET = process.env.AWS_S3_BUCKET.toString()
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID.toString()
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY.toString()
const AWS_REGION = process.env.AWS_REGION.toString()

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
})

async function callVisionText(filename, url) {
  // Google vision detection
  fs.writeFileSync(path.join('gcloud-credentials.json'), process.env.SERVICE_ACCOUNT_JSON.toString());
  const client = new vision.ImageAnnotatorClient();
  let results = await client.textDetection(url);  let newdetect = {}
  console.log("THIS IS RESULTS: " + results[0].textAnnotations[0])
  console.log("THIS IS TYPEOFRESULTS: " + typeof results[0].textAnnotations[0])

  if (results[0].textAnnotations[0] === undefined){
        // Parse detection
        let focusDetect = "text detection undefined"
        newdetect[filename] = {"focusDetect" : focusDetect}
        return(newdetect)
  } else {
    // Parse detection
    let rawDetect = results[0].textAnnotations
    let focusDetect = results[0].textAnnotations[0].description
    newdetect[filename] = {"focusDetect" : focusDetect}
    return(newdetect)
  }
}

// API POST REQUEST: multer handle single file upload
router.post('/upload-image/single', upload.single("file"), function(req, res) {
  let file = req.file; let result = {}; 

  let params = {
    Bucket: S3_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  }

  s3.upload(params, function(err, data){
    if (err) {
      res.status(500).json({error: true, Message: err})
    } else {
      console.log("UPLOAD SUCCESS FOR " + data.key)
      callVisionText(data.key, data.Location).then((visiondetect) => {
        let detect = visiondetect
        result[data.key] = [data, detect]
        console.log(result)
        res.send(result)
      })
    }
  })
});

// API POST REQUEST: multer handle multiple file upload
router.post('/upload-image/multiple', upload.array("file", 12), function(req, res) { //upload.array("file", 12) - "file" because formdata.append(file, ...)
  let photos = req.files; let result = {};
  console.log("MULTIPLE: Uploading " + photos.length + " files");

  let checkCompletion = () => {
    let files = Object.keys(result); let submitcount = req.files.length; let resultcount = files.length;
    if (submitcount == resultcount){console.log(result); res.send(result)}
  }

  for (let i = 0; i < photos.length; i++){

    let file = photos[i]

    let params = {
      Bucket: S3_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    }
  
    s3.upload(params, function(err, data){
      if (err) {
        res.status(500).json({error: true, Message: err})
      } else {
        console.log("UPLOAD SUCCESS FOR " + data.key)
        callVisionText(data.key, data.Location).then((visiondetect) => {
          let detect = visiondetect
          result[data.key] = [data, detect]
          checkCompletion()
        })
      }
    })
  }
});

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;