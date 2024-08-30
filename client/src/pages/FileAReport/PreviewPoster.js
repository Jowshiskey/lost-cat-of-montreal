import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useRef } from "react";
import { FileAreportContext } from '../../Context/FileAreportContext.js';
import html2canvas from "html2canvas";


const PreviewPoster =()=>{

    const navigate = useNavigate(); 
    const ToCaptureRef = useRef();
    const [dataURL,setDataURL] = useState(null);

const handlePrint=()=>{
    window.print();
    return false;
}

const { previewMode, setPreviewMode, setPreviewPhoto, previewPhoto } = React.useContext(FileAreportContext);
const handleExitPreview=()=>{
    setPreviewMode(false);
    navigate("/fileAReport");
}

    return (
        <div >
            <div className="render">
            <div className="capture" ref={ToCaptureRef}>
                <h1 className="capture_h1">Chat Perdu</h1>
                <h2 className="capture_h2">Help us to find our Cat</h2>
                <h1 className="capture_CatName">ZAZA </h1>
                <p className="capture_Info">Please reach out to user.name at : xxx-xxx-xxxx, if you have any information</p>
                <img src={previewPhoto} alt="cat_picture" className="capture_img"></img>
            </div>
            </div>
            <button onClick={handlePrint} >print</button>
            <button onClick={handleExitPreview}>Exit Preview</button>
        </div>
    )
};

export default PreviewPoster;