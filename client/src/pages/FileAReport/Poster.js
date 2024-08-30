import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useRef } from "react";
import { FileAreportContext } from '../../Context/FileAreportContext.js';
import html2canvas from "html2canvas";



const Poster =()=>{

    const { previewMode, setPreviewMode, setPreviewPhoto, previewPhoto } = React.useContext(FileAreportContext);

    const navigate = useNavigate(); 
    const ToCaptureRef = useRef();
    const [dataURL,setDataURL] = useState(null);

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
    return (
        <div >
            <p>this is the Poster Page</p>
            <div className="capture" ref={ToCaptureRef}>
                <h1 className="capture_h1">Chat Perdu</h1>
                <h2 className="capture_h2">Help us to find our Cat</h2>
                <h1 className="capture_CatName">ZAZA </h1>
                <p className="capture_Info">Please reach out to user.name at : xxx-xxx-xxxx, if you have any information</p>
                <img src={previewPhoto} alt="cat_picture" className="capture_img"></img>
                
            </div>
            <a className="download" download="poster.jpeg">
                <button onClick={captureScreenshot}>Preview Poster</button>
            </a>
            <div className="render">
            <img src={dataURL} download={dataURL} />
            </div>
        </div>
    )
};

export default Poster;