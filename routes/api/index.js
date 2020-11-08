const router = require("express").Router();
const path = require("path")

// THE BELOW: is for more organization/ sub-directories to further organize api directory
    // import apiARoutes from "./apiARoutes"
    // import apiBRoutes from "./apiBRoutes"

    // router.use("/apiA", apiARoutes)

    // router.use("/apiB", apiBRoutes)

router.use((req, res) => {
    console.log("api routes have been hit")
    res.sendFile(path.join(__dirname, "../../client/build/index.html" ))
})

module.exports = router;