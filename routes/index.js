const router = require("express").Router();
const apiRoutes = require("./api")
const path = require("path")
const formidable = require('formidable');

// If path specifies api, use apiRoutes
router.use("/api", apiRoutes)

// serve react files at root route
router.get('/', function(req, res) {
    console.log("get route hit")
    res.sendFile(path.join(__dirname, '../client/build'));
});

router.use((req, res) => {
    console.log("main catchall * route hit")
    res.sendFile(path.join(__dirname, '../client/build'))
})

module.exports = router