import React from 'react';
import './style.css';

function OutputPanel(props){

    let output = "";
    let detects = props.visiondetects; console.log("IN OUTPUT COMP: " + output)
    let filenames = props.filenames; console.log("IN OUTPUT COMP: " + filenames)

    if (props.renderOutput == true){
        console.log("!!!!!!CREATING OUTPUT!!!!!!")
        console.log(Object.keys(detects))

        let display = {}

        let files = Object.keys(detects)

        files.forEach((file) => {
            let detect = detects[file]
            let finalDetect = detect.focused

            display[file] = finalDetect
        })

        output = JSON.stringify(display);    
    }

    return(        
        <div id="output-panel-container">
            <div id="output-menubar">
                <div className="output-view">focused</div>
                <div className="output-view">raw</div>
            </div>
            <div id="codebox">{output}</div>
        </div>
    )
}

export default OutputPanel;