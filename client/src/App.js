import React, { Component } from 'react';
import './App.css';
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel';


class App extends Component {

  constructor(props){
    super()
    this.state = {
      filenames: [],
      urls: {},
      detectRaw: null,
      detectFocus: null,
      renderOutput: false,
    }
  }

  handleDetect = (res, imgdata) => {
    let filenames = res.filenames; let urls = imgdata; let detections = res.detections;

    console.log("DETECTIONS IN APP.JS FOR: " + filenames);

    // for each uploaded file
    let detectRaw = {}
    let detectFocus = {}

    filenames.map((file, index) => {
      // add to detectRaw object
      detectRaw[file] = detections[file].raw

      // add to detectFocus object
      let rawstr = detections[file].focused; 
      let altstr = rawstr.replace(/\n/g, " ");

      detectFocus[file] = altstr;
      console.log(file + " : " + altstr)
    })
    
    console.log("DETECTFOCUS HERE: " + Object.values(detectFocus))
    this.setState({filenames: filenames, urls: urls, detectRaw: detectRaw, detectFocus: detectFocus, renderOutput: true})
  }

  render(){
    return(
      <div id="main-container">

        <div id="intro">
          <p><b>Generate text detection(s) for image(s)</b> using Google's <a href="https://cloud.google.com/vision">Cloud Vision API</a>.</p><br/>
          <p style={{color: "rgb(47, 23, 156)"}}><b>Upload images to get started.</b></p>
        </div>
        <div id="panels">
          <InputPanel sendDetect={this.handleDetect}/>
          <OutputPanel filenames={this.state.filenames} urls={this.state.urls} detectRaw={this.state.detectRaw} detectFocus={this.state.detectFocus} renderOutput={this.state.renderOutput}/>
        </div>
      </div>
    )
  }
}

export default App;
