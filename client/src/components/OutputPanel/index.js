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

    renderCode = () => {

        let output = this.props.detectFocus

        Object.entries(output).map(([key, val], index) => {
            return(
                <div>
                    key: {key}
                    value: {val}
                </div>
            )
        })
    }

    render(){

        console.log("OUTPUT RENDER: " + this.props.renderOutput)
        let output; let files; let element; let values;

        if (this.props.renderOutput) {

            if (this.state.format == "focus"){
                
                output = JSON.stringify(this.props.detectFocus, null, 2)
                console.log("output: " + JSON.stringify(output))

            } else if (this.state.format == "raw"){
                output = JSON.stringify(this.props.detectRaw, null, 2)
                console.log("output: " + JSON.stringify(output))
            }
        }

        return(        
            <div id="output-panel-container">

                <div id="output-menubar">
                    <button onClick={this.setFormat} value="focus">alt tag</button>
                    <button onClick={this.setFormat} value="raw">raw detection</button>
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