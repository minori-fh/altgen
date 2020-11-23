import React, { Component } from 'react';
import './App.css';
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel';


class App extends Component {

  constructor(props){
    super()
    this.state = {
      filenames: [],
      detects: null,
      renderOutput: false
    }
  }

  handleDetect = (filenames, detections) => {
    // console.log("// DETECTIONS AT CLIENT: " + detections + " FILENAMES: " + filenames)
    this.setState({filenames: filenames, detects: detections, renderOutput: true})
  }

  render(){
    return(
      <div id="main-container">
        <InputPanel sendDetect={this.handleDetect}/>
        <OutputPanel filenames={this.state.filenames} visiondetects={this.state.detects} renderOutput={this.state.renderOutput}/>
      </div>
    )
  }
}

export default App;
