import React from "react";
import { useState, useEffect } from "react";

// NOTE THIS MIGHT NEED TO BE RE-DONE AND RENAMED (OR JUST REMADE) ONCE WE HAVE USERS


export const UserContext = React.createContext();


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userPhoneNumber, setUserPhoneNumber] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser, userEmail, setUserEmail }} >
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider;