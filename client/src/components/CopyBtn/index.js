import React from 'react';
import './style.css';

import {CopyToClipboard} from 'react-copy-to-clipboard';

function CopyBtn(props){

    return(
        <div id="copy-btn-wrapper">
            <CopyToClipboard text={props.text}><button>Copy to clipboard with button</button></CopyToClipboard>
        </div>
    )
}

export default CopyBtn;