import React, { Component } from 'react';
import './App.css';

import InputPanel from './components/InputPanel'

class App extends Component {

  constructor(props){
    super()
    this.state = {
      dragging: false,
      fies: [],
    }
  }

  altgen = (files) => {
    console.log("this is the arr of files: ", files)
  }


  render(){
    return(
      <div id="main-container">
        <InputPanel altgen={this.altgen}/>

      </div>
    )
  }
}

export default App;
