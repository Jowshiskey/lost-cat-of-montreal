import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useRef } from "react";
import { FileAreportContext } from '../../Context/FileAreportContext.js';
import html2canvas from "html2canvas";



const Poster =()=>{

    const { previewMode, setPreviewMode, setPreviewPhoto, previewPhoto, dataURL,setDataURL,fileFormSubmitInfo } = React.useContext(FileAreportContext);
    const navigate = useNavigate(); 
    const ToCaptureRef = useRef();

    const captureScreenshot = async()=>{
        const canvasPromise = html2canvas(ToCaptureRef.current, {
            useCORS: true
        });
        canvasPromise.then((canvas)=> {
            setDataURL(canvas.toDataURL("image/png"));
        });
        setPreviewMode(true);
        navigate("/previewPoster");
    }
    // return (
        
    // )
};

export default Poster;