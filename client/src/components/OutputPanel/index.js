import React from 'react';
import './style.css';

function OutputPanel(props){

    // features: alt/text (default), label, face, landmark, etc.

    // view: raw, focused


    return(        
        <div id="output-panel-container">
            <div id="output-menubar">
                <div className="output-view">focused</div>
                <div className="output-view">raw</div>
            </div>
            <div id="codebox">{props.visiondetects}</div>
        </div>
    )
}

export default OutputPanel;