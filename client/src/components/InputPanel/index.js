import React, { Component } from 'react';
import './style.css';

class InputPanel extends Component {

    constructor(props){
        super(props)
        this.files = []
        this.dragCounter = 0
        this.state = {
            dragging: false,
        }
    }

    onDragEnter = (e) => {
        console.log("onDragEnter hit")
        e.preventDefault() // prevent default action: opening dragged files
        e.stopPropagation() // prevent progating to other components
        // this.dragCounter++; console.log(this.dragCounter)
        // if (e.dataTransfer.items && e.dataTransfer.items.length > 0){ this.setState({dragging: true}) }

        // setTimeout(console.log(this.state.dragging), 2000)
    }
    
    onDragLeave = (e) => {
        console.log("onDragLeave hit")
        e.preventDefault()
        e.stopPropagation()
        // this.dragCounter--; console.log(this.dragCounter)
        // if (this.dragCounter == 0){ this.setState({dragging: false}) }
        // setTimeout(console.log(this.state.dragging), 2000)
    }

    onDrop = (e) => {
        console.log("onDrop hit")
        e.preventDefault()
        e.stopPropagation()

        // check to see if dragged item is a file
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){

            let currentFiles = this.files
            let newFiles = e.dataTransfer.files
 
            this.files = newFiles;
            console.log("new file arr: ", this.files)
        }
    }

    onDragOver = (e) => {
        e.preventDefault() // need to prevent default for this event but this event listener is not necessary for functionality
        e.stopPropagation()
    }

    // handleUpload = () => {
    //     console.log("SENDING// input.js --> app.js: ", this.files)
    //     if (this.state.dragging == false && this.files.length > 0){
    //         this.props.altgen(this.files) 
    //     }
    // }

    render(){
        return(
        <div className="input-panel-container">
            <form id="form" action="/api/upload-image" enctype="multipart/form-data" method="POST">
                <input id="input" type="file" accept="image/*" name="photo"/>
                <input id="upload-btn" type="submit" value="upload" />
                {/* <input id="upload-btn" type="submit" value="upload" onClick={this.handleUpload} /> */}
            </form>
        </div>
        )
    }
}

export default InputPanel;