import React, { Component } from 'react';
import './App.css';
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel';


class App extends Component {

  constructor(props){
    super()
    this.state = {
      detects: null,
    }
  }

  handleDetect = (detectionsRaw) => {
    console.log("DETECTIONS AT APP.JS LEVEL " + detectionsRaw)
    this.setState({detects: JSON.stringify(detectionsRaw)})
  }

  render(){
    return(
      <div id="main-container">
        <InputPanel sendDetect={this.handleDetect}/>
        <OutputPanel visiondetects={this.state.detects}/>
      </div>
    )
  }
}

export default App;
