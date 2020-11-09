import React, { Component } from 'react';
import './style.css';

class InputPanel extends Component {

    constructor(props){
        super(props)
        this.files = []
        this.state = {
            dragging: false,
        }
    }

    onDragEnter = (e) => {
        console.log("onDragEnter hit")
        e.preventDefault() // prevent default action: opening dragged files
        e.stopPropagation() // prevent progating to other components
    }
    
    onDragLeave = (e) => {
        console.log("onDragLeave hit")
        e.preventDefault()
        e.stopPropagation()
    }

    onDragOver = (e) => {
        console.log("onDragOver hit")
        e.preventDefault()
        e.stopPropagation()
    }

    onDrop = (e) => {
        console.log("onDrop hit")
        e.preventDefault()
        e.stopPropagation()

        // check to see if dragged item is a file
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){

            let thisFile = e.dataTransfer.files[0].name
            let currentFiles = this.files
            console.log("current file arr: ", currentFiles)
            console.log("new file: ", thisFile)

            currentFiles.push(thisFile)  
            this.files = currentFiles;
            console.log("new file arr: ", this.files)
        }
    }

    handleUpload = () => {
        console.log(this.files)
        if (this.state.dragging == false && this.files.length > 0){
            this.props.altgen(this.files)
        }
    }

    render(){
        return(
        <div className="input-panel-container">
            <div id="form">
                <div id="input" onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
                    <p>Choose files <span>or drag to upload</span></p>
                </div>
            </div>
            <button id="upload-btn" type="submit" onClick={this.handleUpload}>Upload</button>
        </div>
        )
    }
}

export default InputPanel;