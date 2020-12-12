import React, { Component } from 'react';
import './style.css';

import PhotoView from '../PhotoView'
import CopyBtn from '../CopyBtn'

class OutputPanel extends Component {

    constructor(props){
        super()
        this.state = {
            view: "json"
        }
    }

    setView = (event) => {
        console.log("SETTING STATE view: " + event.target.value)
        this.setState({view: event.target.value})
    }
 
    render(){

        console.log("outputrender: " + this.props.renderOutput)
        let output; let code;

        if (this.props.renderOutput) {
            if (this.state.view == "json"){
                    code = JSON.stringify(this.props.detectFocus, null, 2) 
                    output = 
                    <div className="json-wrapper">
                        <pre>{code}</pre>
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
        } else if (this.state.view == "photo") {
            photoBtnColor = "#2f179c"
            jsonBtnColor = "#808080"
        }

        return(        
            <div id="output-panel-container">
                <div className="panel-menubar">
                <p>Alt Tags</p>
                </div>
                <div id="view-menubar">
                    <button style={{color: this.state.view == "photo"? 'white': '#808080',
                                    backgroundColor: this.state.view == "photo"? '#2f179c': 'white',
                                    }} class="btn-view" onClick={this.setView} value="photo">photo</button>
                    <button style={{color: this.state.view == "json"? 'white': '#808080',
                                    backgroundColor: this.state.view == "json"? '#2f179c': 'white',
                                    }} class="btn-view" onClick={this.setView} value="json">JSON</button>
                </div>
                <div class ="codebox">
                    {this.props.renderOutput ? 
                        <div id="output-wrapper">
                            {output}
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