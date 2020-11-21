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

  handleDetect = (detections) => {
    console.log("DETECTIONS AT APP.JS LEVEL " + detections)
    this.setState({detects: JSON.stringify(detections)})
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
