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

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

router.post('/upload-image', upload.single("file"), function(req, res) {

  let file = req.file;
  console.log(file)

  // for (let i = 0; i < filelistarr.length; i++){
  //   console.log(filelistarr[i])
  // }

  // const params = {
  //   Bucket: S3_BUCKET,
  //   Key: file.name,
  //   Body: fileStream
  // };

  // s3.upload(params, function(err, data) {
  //   if (err) {
  //       throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);
  // });


  // // FORMIDABLE: new form instance
  // const form = formidable({ multiples: true });
  // form.parse(req)

  // let filenames = []; let detections = {}; let counter = 0; let detect = []; 

  // let callVisionText = async (filename) => {
  //   let getTextDetect = new Promise((detectdata) => {

  //     const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

  //     client.textDetection('uploads/images' + filename)
  //     .then(results => {
        
  //       let rawDetect = results[0].textAnnotations
  //       let focusDetect = results[0].textAnnotations[0].description;

  //       let newdetect = [filename, focusDetect, rawDetect]

  //       counter++;
  //       console.log(newdetect)
  //       console.log("COUNTER TEXT: " +  counter)
  //       detectdata(newdetect)
  //     })
  //     .catch(err => {
  //       console.error("ERROR: ", err)
  //     })
  //   })

  //   detect = await getTextDetect
  //   let key = detect[0]; let focused = detect[1]; let raw = detect[2];
  //   detections[key] = {"focused":focused, "raw": raw} 
  //   checkCompletion()
  // }

  // // let callVisionImage = async (filename) => {
  // //   let getImagePropDetect = new Promise((detectdata) => {
  // //     const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});

  // //     client.imageProperties('routes/api/uploads/' + filename)
  // //     .then(results => {

  // //       let focusDetect = results[0].imagePropertiesAnnotation.dominantColors.colors;
  // //       let rawDetect = results[0].imagePropertiesAnnotation

  // //       let newdetect = [filename, focusDetect, rawDetect]

  // //       counter++;
  // //       console.log(newdetect)
  // //       console.log("COUNTER IMG: " +  counter)
  // //       detectdata(newdetect)
  // //     })
  // //     .catch(err => {
  // //       console.error("ERROR: ", err)
  // //     })
  // //   })

  // //   detect = await getImagePropDetect
  // //   let key = detect[0]; let focused = detect[1]; let raw = detect[2];
  // //   detections[key] = {"focused":focused, "raw": raw} 
  // //   checkCompletion()
  // // }

  // // let callVisionObject = async (filename) => {
  // //   let getObjectLocalizeDetect = new Promise((detectdata) => {

  // //     const client = new vision.ImageAnnotatorClient({ keyFilename: 'key.json'});
  // //     const request = {
  // //       image: {content: fs.readFileSync('routes/api/uploads/' + filename)},
  // //     };

  // //     client.objectLocalization(request)
  // //     .then(results => {

  // //       let focusDetect = results[0].localizedObjectAnnotations;
  // //       let rawDetect = " "

  // //       let newdetect = [filename, focusDetect, rawDetect]

  // //       counter++;
  // //       console.log(newdetect)
  // //       console.log("COUNTER OBJ: " +  counter)
  // //       detectdata(newdetect)
  // //     })
  // //     .catch(err => {
  // //       console.error("ERROR: ", err)
  // //     })
  // //   })

  // //   detect = await getObjectLocalizeDetect
  // //   let key = detect[0]; let focused = detect[1]; let raw = detect[2];
  // //   detections[key] = {"focused" : focused, "raw" : raw} 
  // //   checkCompletion()
  // // }

  // // RESPONSE: send response after detections for all files are complete
  
  // let checkCompletion = () => {
  //   console.log("counter: " + counter)
  //   console.log("filename length: " + filenames.length)
  //   if (counter == filenames.length){
  //     console.log("sending this to client: " + filenames)
  //     res.json({"filenames": filenames, "detections" : detections})
  //   }
  // }

  // // FORMIDABLE: fileupload begin
  // form.on("fileBegin", (name, file) => {
  //     file.path = 'uploads/images' + file.name
  // })

  // // FORMIDABLE: instance of file
  // form.on("file", (name, file) => {
  //   filenames.push(file.name); console.log("UPLOADING FILE: " + file.name);

  //   callVisionText(file.name)
  // })

  // // FORMIDABLE: fileupload end
  // form.on('end', () => {
  //   console.log('!!!!FORM HANDLING DONE!!!!!');
  // });
});

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;