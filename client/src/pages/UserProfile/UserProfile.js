import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext.js";


import ProfilePhoneNumber from "./ProfilePhoneNumber.js";
import ProfileEmailAddress from "./ProfileEmailAddress.js";
import ProfileName from "./ProfileName.js";
import ChangePassword from "./ChangePassword.js";
import DeleteAccount from "./DeleteAccount.js";


const UserProfile = () => {

    const {user, setUser } = React.useContext(UserContext);
    

    
    






if(user!==null){
    return (
        <div className="user_profile_main_div">
            <ProfileName />
            <ProfileEmailAddress />
            <ProfilePhoneNumber />
            <ChangePassword />
            <DeleteAccount />
        </div>
    )
} else {
    return (
        <div className="success_logout_div">
            <p className="text">SUCCESFULLY logout.</p>
            <p className="text">Please login your account to access your UserProfile</p>
            <NavLink to="/login">
                <button>log in</button>
            </NavLink>
        </div>
)
}
    
};

export default UserProfile;