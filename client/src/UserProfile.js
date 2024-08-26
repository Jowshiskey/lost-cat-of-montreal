import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "./Context/UserContext.js";

const UserProfile = () => {
    
    const user = React.useContext(UserContext).user;
    const userEmail = React.useContext(UserContext).userEmail;

if(user!==null){
    return (
        <div>
            <p>this is user profile</p>
            <p>{userEmail}</p>
            <p>phonenumber</p>
            <p>name</p>
            <p>adresse</p>
            <p>change pw</p>

        </div>
    )
} else {
    return (
        <div>
            <p>Please login your account to access your UserProfile</p>
        </div>
)
}
    
};

export default UserProfile;