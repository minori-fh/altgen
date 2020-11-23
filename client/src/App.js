import React, { Component } from 'react';
import './App.css';
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel';


class App extends Component {

  constructor(props){
    super()
    this.state = {
      filenames: [],
      detectRaw: null,
      detectFormat: null,
      renderOutput: false,
    }
  }

  handleDetect = (filenames, detections) => {

    let detects = detections; console.log("APP JS LEVEL: " + filenames); console.log("APP JS LEVEL: " + detections)

    let files = Object.keys(detects)
    let detectRaw = {}
    let detectFormat = {}

    files.forEach((file) => {
        let detect = detects[file]
        detectRaw[file] = detect.raw
        detectFormat[file] = detect.focused
    })

    this.setState({filenames: filenames, detectRaw: detectRaw, detectFormat: detectFormat, renderOutput: true})
  }

  render(){
    return(
      <div id="main-container">
        <InputPanel sendDetect={this.handleDetect}/>
        <OutputPanel filenames={this.state.filenames} detectRaw={this.state.detectRaw} detectFormat={this.state.detectFormat} renderOutput={this.state.renderOutput}/>
      </div>
    )
  }
}

export default App;
