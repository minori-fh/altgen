const router = require("express").Router();
const apiRoutes = require("./api")
const path = require("path")

// If path specifies api, use apiRoutes
router.use("/api", apiRoutes)

// serve react files at root route
router.get('/', function(req, res) {
    console.log("get route hit")
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

router.use((req, res) => {
    console.log("main catchall * route hit")
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = router