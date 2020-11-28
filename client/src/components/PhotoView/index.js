import React from 'react';
import './style.css';

function PhotoView(props){

    let filenames = props.filenames; let urls = props.urls; let alt = props.detectFocus;

    console.log("files: " + filenames)
    console.log("urls: " + urls)
    console.log("alt: " + alt)

    let jumbotron = filenames.map((file, index) => {

        console.log(file, urls[file], alt[file])

        return(
        <div>
            <img className="img-jumbo" src={urls[file]}/>
            <div>{file}</div>
            <div>{alt[file]}</div>
        </div>)
    })

    return(
        <div>{jumbotron}</div>
    )
}

export default PhotoView;