import React from "react";
import { useState, useEffect } from "react";

// NOTE THIS MIGHT NEED TO BE RE-DONE AND RENAMED (OR JUST REMADE) ONCE WE HAVE USERS


export const ReportStatusContext = React.createContext();


const ReportStatusProvider = ({ children }) => {

    const[posterStatus,setPosterStatus] = useState("still looking")

    return (
        <ReportStatusContext.Provider value={{ posterStatus,setPosterStatus }} >
            {children}
        </ReportStatusContext.Provider>
    )

}

export default ReportStatusProvider;