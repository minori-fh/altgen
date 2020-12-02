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
            error: "none"
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
                url: '/api/upload-image',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formdata
            }).then((res) => {
                console.log("HELLO?!" + res.data.detections)
                this.props.sendDetect(res.data, this.urls)
            })   

        } else {
            this.setState({error: "no files chosen"})
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
        return(
        <div id="input-panel-container">
            <div  id="input-body-wrapper">
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
            <div id="err-msg">
                <p style={{color: this.state.error == "none" ? "#808080": "#bb0f09"}}>Error: {this.state.error}</p>
            </div>
        </div>
        )
    }
}

export default InputPanel;