import React, { Component } from 'react';
import './style.css';

const FormData = require('form-data');
const axios = require('axios');

class InputPanel extends Component {

    constructor(props){
        super(props)
        this.url = {}
        this.state = {
            files: null,
            filenames: [],
            uploadComplete: false,
            error: "none",
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.files != null && this.state.files.length > 0){
            console.log("uploading " + this.state.files.length + " files")
            // create FormData
            let formdata = new FormData();
            let files = this.state.files; 

            Array.from(files).forEach((file) => {formdata.append("file", file)}) // append files to formdata

            axios({
                url: 'http://localhost:8080/api/upload-image',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, 
                data: formdata
            }).then((res) => {
                console.log("RES DETECTED FOR: " + res.data.filenames)
                this.props.sendDetect(res.data, this.urls)
                this.setState({filenames: res.data.filenames, uploadComplete: true, error: "none"})
            })   

        } else {
            this.setState({error: "Please choose file(s)", uploadComplete: false})
        }

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

        let uploadedfiles = this.state.filenames.map((filename) => (<p>{filename}</p>))

        let msg; let color;

        if (this.state.error != "none"){
            msg = this.state.error; color = "#bb0f09"
        } else if (this.state.uploadComplete == true){
            msg = "Upload success"; color = "#1c7913"
        }

        return(
        <div id="input-panel-container">
            <div  id="input-body-wrapper">
                <div className="panel-menubar">
                    <p>Upload Images</p>
                </div>
                <form onSubmit={this.handleSubmit} id="form" action="/api/upload-image" enctype="multipart/form-data" method="post">
                    <input id="input" type="file" accept="image/*" name="photo" multiple="multiple" onChange={this.onChange}/>
                    <input id="upload-btn" class="btn" type="submit" value="upload" />
                </form>
                <div id="uploaded-files">
                    {uploadedfiles}
                </div>
            </div>
            <div id="err-msg">
                <p style={{color: color}}>{msg}</p>

            </div>
        </div>
        )
    }
}

export default InputPanel;