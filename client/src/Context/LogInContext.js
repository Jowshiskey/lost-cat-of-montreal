import React from "react";
import { useState, useEffect } from "react";

// NOTE THIS MIGHT NEED TO BE RE-DONE AND RENAMED (OR JUST REMADE) ONCE WE HAVE USERS


export const LogInContext = React.createContext();


const LogInProvider = ({ children }) => {
    const [loginStep, setLoginStep] = useState("enterCred")

    return (
        <LogInContext.Provider value={{ loginStep,setLoginStep }} >
            {children}
        </LogInContext.Provider>
    )

}

export default LogInProvider;