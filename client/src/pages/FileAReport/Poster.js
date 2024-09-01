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
    console.log( "tis is prewP"+ previewPhoto)
    return (
        <div >
            <p>this is the Poster Page</p>
        {previewPhoto ? 
            <div className="capture" ref={ToCaptureRef}>
                <h1 className="capture_h1">Lost Cat</h1>
                <h2 className="capture_h2">Help us to find our Cat</h2>
                <h1 className="capture_CatName">{fileFormSubmitInfo.catName} </h1>
                <p className="capture_Info">Please reach out to {fileFormSubmitInfo.profileName} at : {fileFormSubmitInfo.profilePhoneNumber}, if you have any information.</p>
                {fileFormSubmitInfo.catGender && <p className="capture_Info2"> {fileFormSubmitInfo.catName} {fileFormSubmitInfo.catMicroship} {fileFormSubmitInfo.catName} is a {fileFormSubmitInfo.catGender}</p>}
                <img src={previewPhoto} alt="🙀" className="capture_img" style={{fontSize:"300px"}}></img>
            </div>
            :
            <div>
                <p style={{fontSize:"100px"}}>🙀</p>
                <p className="text">You need to add a picture of your cat to create a poster</p>
            </div>
        }
            {previewPhoto && <a className="download" download="poster.jpeg"><button onClick={captureScreenshot}>Preview Poster</button> </a> }
            <NavLink to="/fileAReport"><button className="back_to_fileAReport">back to file a report</button></NavLink>
            
            <div className="render">
            
            </div>
        </div>
    )
};

export default Poster;