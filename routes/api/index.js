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

let detections = {}; let counter = 0; let detect = []; 

let callVisionText = async (filename, url) => {

  let getTextDetect = new Promise((detectdata) => {

    const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

    client.textDetection(url)
    .then(results => {
      
      let rawDetect = results[0].textAnnotations
      let focusDetect = results[0].textAnnotations[0].description;

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

}

// API POST REQUEST: multer handle single file upload
router.post('/upload-image/single', upload.single("file"), function(req, res) {

  let file = req.file

  let s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  })

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
      console.log("url: " + data.Location)
      let detect = callVisionText(data.key, data.Location)
      res.send([data, detect])
    }
  })
});

// API POST REQUEST: multer handle multiple file upload
router.post('/upload-image/multiple', upload.array("file", 12), function(req, res) { //upload.array("file", 12) - "file" because formdata.append(file, ...)

  let file = req.files;
  console.log(file.length)

  // let s3 = new AWS.S3({
  //   accessKeyId: AWS_ACCESS_KEY_ID,
  //   secretAccessKey: AWS_SECRET_ACCESS_KEY,
  //   region: AWS_REGION
  // })

  // let params = {
  //   Bucket: S3_BUCKET,
  //   Key: file.originalname,
  //   Body: file.buffer,
  //   ContentType: file.mimetype,
  //   ACL: "public-read"
  // }

  // s3.upload(params, function(err, data){
  //   if (err) {
  //     res.status(500).json({error: true, Message: err})
  //   } else {
  //     console.log("UPLOAD SUCCESS FOR " + data.key)
  //     console.log("url: " + data.Location)
  //     let detect = callVisionText(data.key, data.Location)
  //     res.send([data, detect])
  //   }
  // })
});

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;