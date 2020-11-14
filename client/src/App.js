import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import InputPanel from './components/InputPanel'
const FormData = require('form-data');


class App extends Component {

  constructor(props){
    super()
    this.state = {
      dragging: false,
      fies: [],
    }
  }

  // uploadFile = (file) => {

  //   let formdata = new FormData()
  //   formdata.append("file", file)
  //   console.log("this is file: ", file)
  //   console.log("this is formdata: ", formdata)

  //   axios.post("/api/upload", formdata)  
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // }

  // altgen = (files) => {
  //   console.log("//RECEIVED input.js --> app.js: ", files)

  //   let formdata = new FormData()
  //   formdata.append("file", files)
  //   console.log("this is file: ", files)
  //   console.log("this is formdata: ", formdata)

  //   axios.post("/api/upload", formdata)  
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     }); 

  //   // files.forEach(this.uploadFile)
  // }

  render(){
    return(
      <div id="main-container">
        <InputPanel altgen={this.altgen}/>
      </div>
    )
  }
}

export default App;
