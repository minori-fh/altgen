import React, { Component } from 'react';
import './style.css';

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

class InputPanel extends Component {

    constructor(props){
        super(props)
        this.detectType = "text" // not part of state since we do not want refresh
        this.state = {
            files: null,
        }
    }

    // onDragEnter = (e) => {
    //     console.log("onDragEnter hit")
    //     e.preventDefault() // prevent default action: opening dragged files
    //     e.stopPropagation() // prevent progating to other components
    //     // this.dragCounter++; console.log(this.dragCounter)
    //     // if (e.dataTransfer.items && e.dataTransfer.items.length > 0){ this.setState({dragging: true}) }

    //     // setTimeout(console.log(this.state.dragging), 2000)
    // }
    
    // onDragLeave = (e) => {
    //     console.log("onDragLeave hit")
    //     e.preventDefault()
    //     e.stopPropagation()
    //     // this.dragCounter--; console.log(this.dragCounter)
    //     // if (this.dragCounter == 0){ this.setState({dragging: false}) }
    //     // setTimeout(console.log(this.state.dragging), 2000)
    // }

    // onDrop = (e) => {
    //     console.log("onDrop hit")
    //     e.preventDefault()
    //     e.stopPropagation()

    //     console.log("before conditional; " + e.dataTransfer.files)

    //     // check to see if dragged item is a file
    //     if (e.dataTransfer.files.length > 0){

    //         let currentFiles = this.draggedfiles
    //         let newFiles = e.dataTransfer.files
    //         this.draggedfiles = Object.values(newFiles) // array of files

    //         console.log("length of filelist: ", e.dataTransfer.files.length)
    //         console.log("currentFiles: ", currentFiles)
    //         console.log("newFiles: ", newFiles)
    //     }
    // }

    // onDragOver = (e) => {
    //     e.preventDefault() // need to prevent default for this event but this event listener is not necessary for functionality
    //     e.stopPropagation()
    // }

    // handleUpload = () => {
    //     console.log("handleupload reached: " + this.draggedfiles)

    //     const formData = new FormData();

    //     this.draggedfiles.forEach((file) => {formData.append('file', file); console.log("handling upload of dragged file: " + file.name)})

    //     console.log(formData)

    //     axios({
    //         method: 'post',
    //         url: '/api/upload-dragged-image',
    //         data: {hello: "thisfinallyworked"},
    //         headers: {'Content-Type': 'multipart/form-data' }
    //     })
    //     .then(function (response) {
    //         //handle success
    //         console.log(response);
    //     })
    //     .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //     });
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("HANDLESUBMIT; detectType: ", this.detectType)

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
            console.log(res.data.detectionsRaw)
            this.props.sendDetect(res.data.detectionsRaw)
        })

    }

    onChange = (event) => {
        console.log("number of files: " + event.target.files.length)
        this.setState({files: event.target.files})
    }

    setDetectType = (event) => {
        console.log("DETECT TYPE CHOSEN: "  + event.target.value)
        this.detectType = event.target.value
    }

    render(){
        return(
        <div id="input-panel-container">
            {/* <div id="input-menubar">
                <select onChange={this.setDetectType}>
                    <option value="text">text</option>
                    <option value="label">label</option>
                    <option value="logo">logo</option>
                    <option value="landmark">landmark</option>
                    <option value="face">face</option>
                </select>
            </div> */}

            {/* <form id="form" action="/api/upload-image" enctype="multipart/form-data" method="post"
                                            onDrop={this.onDrop} 
                                            onDragOver={this.onDragOver} 
                                            onDragEnter={this.onDragEnter} 
                                            onDragLeave={this.onDragLeave} 
            > */}
            <form onSubmit={this.handleSubmit} id="form" action="/api/upload-image" enctype="multipart/form-data" method="post">
            <select type="field" name="detectType" onChange={this.setDetectType}>
                    <option value="text">text recognition</option>
                    <option value="imageprop">image properties</option>
                    <option value="objectlocalize">object localization</option>
                </select>

                <input id="input" type="file" accept="image/*" name="photo" multiple="multiple" onChange={this.onChange}/>
                <input id="upload-btn" class="btn" type="submit" value="upload" />
            </form>
            {/* <input id="upload-btn" type="submit" value="DRAG UPLOAD" onClick={this.handleUpload} /> */}
        </div>
        )
    }
}

export default InputPanel;