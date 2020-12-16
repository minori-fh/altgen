# AltGen :abc:

## Description of Site
"AltGen" is a Node.js application that utilizes Google's Cloud Vision API to perform text detection on images and stores the images in Amazon's S3 object storage service.

The site was built for the purpose of demonstrating the usage of Vision API to create alt text for front-end purposes. 

## Pictures of Site
[Click here to visit site](https://gen-alt.herokuapp.com/)

**Upload Image:**
![Input panel]

**Text detection - JSON view:**
![Output Panel: JSON view]

**Text detection - PHOTO view:** 
![Output Panel: PHOTO view]

## Getting Started
These instructions will help get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites 
What you will need to install before downloading and running this application:

1. [NODE](https://nodejs.org/en/download/)
2. [NPM](https://docs.npmjs.com/cli/install)

Once the above are installed, download the repository and install server dependencies:
```
# open a new shell and navigate to AltGen directory
$ npm i
# this will install all the dependencies for the server portion of this application
```

Start the server:
```
# once server dependencies are installed, navigate to the AdoptAFurryFriend directory and start the server
$ node server.js
```

Before starting the client, add a proxy in the client's package.json file:
```
  "proxy": "http://localhost:8080",
```

Navigate to the client directory, install dependencies and start react client:
```
# open a new shell and navigate to AltGen client directory
$ npm i
$ npm start
```
## Ideas for Future Improvement(s)
Incorporate a database and connection with Google Drive to allow users to upload images from the Drive and perform CRUD on images/detections. 

## Built with: 
1. [Cloud Vision API](https://cloud.google.com/vision)
2. [Amazon AWS S3](https://aws.amazon.com/s3/)
3. [Express](https://expressjs.com/)
4. [React](https://reactjs.org/docs/getting-started.html)
5. [HTML](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
6. [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
7. [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
8. [Node*](https://nodejs.org/en/download/)

## *Node Packages Used
1. [Multer](https://www.npmjs.com/package/multer)
2. [Axios](https://www.npmjs.com/package/axios)
3. [Google Cloud Vision API](https://www.npmjs.com/package/@google-cloud/vision)
4. [AWS SDK](https://www.npmjs.com/package/aws-sdk)
5. [Path](https://nodejs.org/api/path.html)

## Author(s): 
1. [Minori Hashimoto](https://github.com/minori-fh)

