import React, { Component } from 'react';
import './style.css';


class OutputPanel extends Component {

    constructor(props){
        super()
        this.state = {
            format: "focus",
        }
    }
    
    setFormat = (event) => {
        console.log("format chosen: " + event.target.value)
        this.setState({format: event.target.value})
    }

    render(){

        let output; 

        if (this.state.format == "focus"){
            output = JSON.stringify(this.props.detectFormat)
        } else if (this.state.format == "raw"){
            output = JSON.stringify(this.props.detectRaw)
        }

        return(        
            <div id="output-panel-container">
                <div id="output-menubar">
                    <button onClick={this.setFormat} value="focus">focused</button>
                    <button onClick={this.setFormat} value="raw">raw</button>
                </div>
                <div id="codebox">{output}</div>
            </div>
        )
    }
}

export default OutputPanel;