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

        console.log("PASSING PROP outputrender: " + this.props.renderOutput)
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

        return(        
            <div id="output-panel-container">
                <div id="view-menubar">
                    <button class="btn-view" onClick={this.setView} value="photo">PHOTO</button>
                    <button class="btn-view" onClick={this.setView} value="json">JSON</button>
                </div>

                {/* <div id="output-menubar">
                    <button class="btn-jsonview" onClick={this.setFormat} value="focus">alt tag</button>
                    <button class="btn-jsonview" onClick={this.setFormat} value="raw">raw</button>
                </div> */}
        
                <div class ="codebox">
                    {this.props.renderOutput ? 
                        <div>
                            <pre>{output}</pre>
                        </div>
                        :
                        <p>no data detected</p>
                    }
                </div>
            </div>
        )
    }
}

export default OutputPanel;