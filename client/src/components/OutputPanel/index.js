import React, { Component } from 'react';
import './style.css';

import PhotoView from '../PhotoView'

class OutputPanel extends Component {

    constructor(props){
        super()
        this.state = {
            format: "focus",
            view: "json"
        }
    }
    
    setFormat = (event) => {
        console.log("SETTING STATE format: " + event.target.value)
        this.setState({format: event.target.value})
    }

    setView = (event) => {
        console.log("SETTING STATE view: " + event.target.value)
        this.setState({view: event.target.value})
    }

    render(){

        console.log("PASSING PROP outputrender: " + this.props.renderOutput)
        let output; 

        if (this.props.renderOutput) {

            if (this.state.view == "json"){

                if (this.state.format == "focus"){
                    output = JSON.stringify(this.props.detectFocus, null, 2)
                } else if (this.state.format == "raw"){
                    output = JSON.stringify(this.props.detectRaw, null, 2)
                }

            } else if (this.state.view == "photo"){
                console.log("HELLO?! " + this.props.detectFocus)
                output = <PhotoView filenames={this.props.filenames} urls={this.props.urls} detectFocus={this.props.detectFocus} />
            }
        }

        return(        
            <div id="output-panel-container">
                <div id="view-menubar">
                    <button class="btn-view" onClick={this.setView} value="photo">PHOTO</button>
                    <button class="btn-view" onClick={this.setView} value="json">JSON</button>
                </div>

                <div id="output-menubar">
                    <button class="btn-jsonview" onClick={this.setFormat} value="focus">alt tag</button>
                    <button class="btn-jsonview" onClick={this.setFormat} value="raw">raw</button>
                </div>
        
                <div class ="codebox">
                    {this.props.renderOutput ? 

                        
                        
                        <pre>{output}</pre>

                        :

                        <p>no data detected</p>
                    }
                </div>
            </div>
        )
    }
}

export default OutputPanel;