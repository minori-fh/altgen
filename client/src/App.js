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
      // detectRaw: null,
      detectFocus: null,
      renderOutput: false,
    }
  }

  handleDetect = (res) => {
    let filenames = Object.keys(res); let urls = {}; 
    console.log("DETECTIONS IN APP.JS FOR: " + filenames);

    // for each uploaded file
    // let detectRaw = {}
    let detectFocus = {}

    filenames.map((file, index) => {
      let filedata = res[file]
      let awsdata = filedata[0]; let visiondata = filedata[1];

      // add to detectFocus object
      let detects = visiondata[file]
      let rawstr = detects.focusDetect
      let altstr = rawstr.replace(/\n/g, " ");

      detectFocus[file] = altstr;
      console.log(file + " : " + altstr)

      // add to URL object
      urls[file] = awsdata.Location

      // add to detectRaw object
      // detectRaw[file] = visiondata[2]
    })
    console.log("HANDLEDETECT COMPLETE (alt): " + detectFocus); console.log("HANDLEDETECT COMPLETE (url): " + urls)
    this.setState({filenames: filenames, urls: urls, detectFocus: detectFocus, renderOutput: true})
  }

  render(){
    return(
      <div id="main-container">
        <div id="intro">
          <p>Generate text detection(s) for image(s) using Google's <a href="https://cloud.google.com/vision" target="_blank"><b>Cloud Vision API</b></a>.</p><br/>
          <p><b>Upload images to get started.</b></p>
        </div>
        <div id="panels">
          <InputPanel sendDetect={this.handleDetect}/>
          <OutputPanel filenames={this.state.filenames} urls={this.state.urls} detectFocus={this.state.detectFocus} renderOutput={this.state.renderOutput}/>
        </div>
      </div>
    )
  }
}

export default App;
