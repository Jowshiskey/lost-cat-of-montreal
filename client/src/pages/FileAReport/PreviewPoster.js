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
    navigate("/fileAReport");
}
    return (
        <div >
            <div className="render">
            <div className="capture">
                <img src={dataURL} alt="cat_picture" className="poster_img"></img>
            </div>
            </div>
            <div className="preview_poster_opt_div">
                <button className="update_btn" onClick={handleExitPreview}>Exit Preview</button>
                <button className="update_btn" onClick={handlePrint} >Print</button>
                <button className="update_btn"><a href={dataURL} download>Download Poster</a></button>
            </div>
        </div>
    )
};

export default PreviewPoster;