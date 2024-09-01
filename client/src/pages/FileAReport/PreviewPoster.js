import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useRef } from "react";
import { FileAreportContext } from '../../Context/FileAreportContext.js';
import html2canvas from "html2canvas";


const PreviewPoster =()=>{

    const navigate = useNavigate();
    const { setPreviewMode, dataURL } = React.useContext(FileAreportContext);

const handlePrint=()=>{
    window.print();
    return false;
}


const handleExitPreview=()=>{
    setPreviewMode(false);
    navigate("/createPoster");
}
// onClick={handleDownload}
// const handleDownload=()=>{
//     setPreviewMode(false);
//     navigate("/report");
// }

    return (
        <div >
            <div className="render">
            <div className="capture">
                <img src={dataURL} alt="cat_picture" className="poster_img"></img>
            </div>
            </div>
            <button onClick={handlePrint} >Print</button>
            <button onClick={handleExitPreview}>Exit Preview</button>
            <button ><a href={dataURL} download>Save Poster</a></button>
        </div>
    )
};

export default PreviewPoster;