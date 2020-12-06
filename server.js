const express = require("express")
const path = require("path")
const routes = require("./routes")
const cors = require("cors")

// express config.
const PORT = process.env.PORT || 8090

const app = express() // start express server
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.json({limit: '50mb'}))

app.use(cors())

// router
app.use(routes)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(__dirname + '/client/build')); // this folder will not exist until "npm run build" is run for the first time in the client
    
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build'));
    });
}
// listener
app.listen(PORT, ()=> {console.log(`🌎 SERVER IS LISTENING ON 🌎 http://localhost:${PORT} !`)})