import React from "react";
import { useState, useEffect } from "react";

// NOTE THIS MIGHT NEED TO BE RE-DONE AND RENAMED (OR JUST REMADE) ONCE WE HAVE USERS


export const FileAreportContext = React.createContext();


const FileAreportProvider = ({ children }) => {
    const [markerPos, setMarkerPos] = useState({ lat: 45.533290, lng: -73.621629 })
    const [previewMode, setPreviewMode] = useState(false)
    const [previewPhoto, setPreviewPhoto] = useState("");
    return (
        <FileAreportContext.Provider value={{ markerPos, setMarkerPos, 
        previewMode, setPreviewMode,
        previewPhoto, setPreviewPhoto }} >
            {children}
        </FileAreportContext.Provider>
    )

}

export default FileAreportProvider;