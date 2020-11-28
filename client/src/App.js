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
      detectFocus: null,
      renderOutput: false,
    }
  }

  handleDetect = (res) => {
    let filenames = res.filenames
    let detections = res.detections

    console.log(filenames + " reached at APP JS LEVEL");

    // for each uploaded file
    let detectRaw = {}
    let detectFocus = {}

    filenames.map((file, index) => {
      // add to detectRaw object
      detectRaw[file] = detections[file].raw
      // console.log(file + " : " + detections[file].raw)

      // add to detectFormat object
      detectFocus[file] = detections[file].focused
      console.log(file + " : " + detections[file].focused)
    })

    console.log("DETECT_RAW STATE SET: ///// " + detectRaw)
    console.log("DETECT_FOCUS STATE SET: ///// " + detectFocus)

    this.setState({filenames: filenames, detectRaw: detectRaw, detectFocus: detectFocus, renderOutput: true})
  }

  render(){
    return(
      <div id="main-container">
        <InputPanel sendDetect={this.handleDetect}/>
        <OutputPanel filenames={this.state.filenames} detectRaw={this.state.detectRaw} detectFocus={this.state.detectFocus} renderOutput={this.state.renderOutput}/>
      </div>
    )
  }
}

export default App;
