import React from 'react';
import './style.css';

import CopyBtn from '../CopyBtn';

function PhotoView(props){

    let filenames = props.filenames; let urls = props.urls; let alt = props.detectFocus;

    console.log("files: " + filenames)
    console.log("urls: " + urls)
    console.log("alt: " + alt)

    let jumbotron = filenames.map((file, index) => {

        console.log(file, urls[file], alt[file])

        return(
        <div className="jumbo-wrapper">
            <div>{file}</div>
            <img className="img-jumbo" src={urls[file]}/>
            <CopyBtn text={alt[file]}/>
        </div>)
    })

    return(
        <div id="photoview-container">
            {jumbotron}
        </div>
    )
}


export default PhotoView;