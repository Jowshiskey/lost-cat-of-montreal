import React from "react";
import { useState, useEffect } from "react";

// NOTE THIS MIGHT NEED TO BE RE-DONE AND RENAMED (OR JUST REMADE) ONCE WE HAVE USERS


export const FileAreportContext = React.createContext();


const FileAreportProvider = ({ children }) => {
    const [markerPos, setMarkerPos] = useState({ lat: 45.533290, lng: -73.621629 })
    const [previewMode, setPreviewMode] = useState(false)
    const [previewPhoto, setPreviewPhoto] = useState("");
    const [dataURL,setDataURL] = useState(null);
    const [fileFormSubmitInfo, setFileFormSubmitInfo]= useState({});

    return (
        <FileAreportContext.Provider value={{ markerPos, setMarkerPos, 
        previewMode, setPreviewMode,
        previewPhoto, setPreviewPhoto,
        dataURL,setDataURL,
        fileFormSubmitInfo, setFileFormSubmitInfo }} >
            {children}
        </FileAreportContext.Provider>
    )

}

export default FileAreportProvider;