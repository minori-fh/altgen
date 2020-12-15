import React from 'react';
import './style.css';

import {CopyToClipboard} from 'react-copy-to-clipboard';

function CopyBtn(props){

    return(
        <CopyToClipboard text={props.text}><button className="btn" id="copy-btn">copy text</button></CopyToClipboard>
    )
}

export default CopyBtn;