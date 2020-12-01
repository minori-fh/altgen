import React, { Component } from 'react';
import './style.css';

import PhotoView from '../PhotoView'
import CopyBtn from '../CopyBtn'

class OutputPanel extends Component {

    constructor(props){
        super()
        this.state = {
            // format: "focus",
            view: "json"
        }
    }

    setView = (event) => {
        console.log("SETTING STATE view: " + event.target.value)
        this.setState({view: event.target.value})
    }

    // setFormat = (event) => {
    //     console.log("SETTING STATE format: " + event.target.value)
    //     this.setState({format: event.target.value})
    // }
 
    render(){

        console.log("outputrender: " + this.props.renderOutput)
        let output; let code;

        if (this.props.renderOutput) {
            if (this.state.view == "json"){
                    code = JSON.stringify(this.props.detectFocus, null, 2) 
                    output = 
                    <div>
                        <div>{code}</div>
                        <CopyBtn text={code}/>
                    </div>
            } else if (this.state.view == "photo"){
                output = <PhotoView filenames={this.props.filenames} urls={this.props.urls} detectFocus={this.props.detectFocus} />
            }
        }

        let jsonBtnColor; let photoBtnColor;

        if (this.state.view == "json") {
            jsonBtnColor = "#2f179c"
            photoBtnColor = "#808080"
            console.log("is this hitting")
        } else if (this.state.view == "photo") {
            photoBtnColor = "#2f179c"
            jsonBtnColor = "#808080"
            console.log("is this hitting")
        }

        return(        
            <div id="output-panel-container">
                <div className="panel-menubar">
                <p>Alt Tags</p>
                </div>
                <div id="view-menubar">
                    <button style={{color: this.state.view == "photo"? '#2f179c': '#808080'}} class="btn-view" onClick={this.setView} value="photo">photo</button>
                    <button style={{color: this.state.view == "json"? '#2f179c': '#808080'}} class="btn-view" onClick={this.setView} value="json">JSON</button>
                </div>
                <div class ="codebox">
                    {this.props.renderOutput ? 
                        <div>
                            <pre>{output}</pre>
                        </div>
                        :
                        <p>no alt tags detected</p>
                    }
                </div>
            </div>
        )
    }
}

export default OutputPanel;