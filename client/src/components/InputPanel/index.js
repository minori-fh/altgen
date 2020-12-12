import React, { Component } from 'react';
import './style.css';

const FormData = require('form-data');
const axios = require('axios');

class InputPanel extends Component {

    constructor(props){
        super(props)
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
            console.log("submitting " + this.state.files.length + " files")

            // create FormData
            let formdata = new FormData(); let files = this.state.files; 
            Array.from(files).forEach((file) => {formdata.append("file", file)}) // append files to formdata

            // create postUrl depending on file count
            let url;

            if (this.state.files.length > 1){
                url = "https://gen-alt.herokuapp.com/api/upload-image/multiple"
            } else if (this.state.files.length == 1){
                url = "https://gen-alt.herokuapp.com/api/upload-image/single"
            }

            axios({
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, 
                data: formdata
            }).then((res) => {
                console.log("POST REQUEST RESPONSE " +  res.data)

                this.props.sendDetect(res.data)
                this.setState({filenames: Object.keys(res.data), uploadComplete: true, error: "none"})
            })   
        } else {
            this.setState({error: "Please choose file(s)", uploadComplete: false})
        }

    }

    onChange = (event) => {
        console.log("onChange for " + event.target.files.length)
        this.setState({files: event.target.files})
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