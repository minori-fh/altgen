import React, { Component } from 'react';
import './style.css';

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

class InputPanel extends Component {

    constructor(props){
        super(props)
        this.detectType = "text" // not part of state since we do not want refresh
        this.url = {}
        this.state = {
            files: null,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // create FormData
        let formdata = new FormData();
        let files = this.state.files; let detectType = this.detectType;

        formdata.append("field", detectType) // append detectType to formdata
        Array.from(files).forEach((file) => {formdata.append("file", file)}) // append files to formdata

        axios({
            url: '/api/upload-image',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formdata
        }).then((res) => {
            this.props.sendDetect(res.data, this.urls)
        })
    }

    onChange = (event) => {
        console.log("FILES IN INPUT: " + event.target.files)

        let urls = {}; let files = event.target.files;

        for (let i = 0; i < files.length; i++ ){

            let currentFile = files[i]; let filename = currentFile.name; let url = URL.createObjectURL(files[i])
            urls[filename] = url
        }

        this.urls = urls
        this.setState({files: files})
    }

    setDetectType = (event) => {
        console.log("DETECT TYPE CHOSEN: "  + event.target.value)
        this.detectType = event.target.value
    }

    render(){
        return(
        <div id="input-panel-container">
            <div className="panel-menubar">
                <p>Upload Images</p>
            </div>
            <form onSubmit={this.handleSubmit} id="form" action="/api/upload-image" enctype="multipart/form-data" method="post">
            {/* <select type="field" name="detectType" onChange={this.setDetectType}>
                    <option value="text">text recognition</option>
                    <option value="imageprop">image properties</option>
                    <option value="objectlocalize">object localization</option>
                </select> */}

                <input id="input" type="file" accept="image/*" name="photo" multiple="multiple" onChange={this.onChange}/>
                <input id="upload-btn" class="btn" type="submit" value="upload" />
            </form>
        </div>
        )
    }
}

export default InputPanel;