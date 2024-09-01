import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext.js";

const UserProfile = () => {

    const user = React.useContext(UserContext).user;

// update password
    const [changePasswordToggle,setChangePasswordToggle]=useState(false)
    const [changePasswordState,setChangePasswordState]=useState(false)
    const [changePasswordStep,setChangePasswordStep]=useState("request")
    const [changePasswordInfo,setChangePasswordInfo]=useState({})
    const handlePasswordUpdate=(event)=>{
        event.preventDefault();
        if(formUpdatePw.oldPassword.value===formUpdatePw.newPassword.value){
            return console.log("new password needs to be different from old one");
        }
        if(formUpdatePw.newPassword.value===formUpdatePw.confirmNewPassword.value){
            console.log("new password and confirm new password matches")
        const assemblePasswordUpdateInfo = {
            email : user.email,
            password1 : formUpdatePw.oldPassword.value,
            password2 : formUpdatePw.newPassword.value,
            password3 : formUpdatePw.confirmNewPassword.value,
            };
        setChangePasswordInfo(assemblePasswordUpdateInfo);
        setChangePasswordState(true);
        setChangePasswordToggle(false);
        setChangePasswordStep("updated")
        } else {
            console.log("new password and confirm new password need to matches");
        }
    }
    // useEffect(() =>{
    //     if(changePasswordState){ 
    //         fetch("/user/password-change", {
    //             method: "POST",
    //             body: JSON.stringify(changePasswordInfo),
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //         .then((response) => response.json())
    //         .then((parsed) => {
    //             if(parsed.status === 200){
    //                 console.log(parsed);
    //                 setLoginState(false);
    //                 setLoginInfo({});
    //                 setUser(parsed);
    //                 setLoginStep("completeCred");
    //                 navigate("/userProfile");
    //             } else {
    //                 console.log(parsed.message);
    //                 setLoginState(false);
    //                 setLoginInfo({});
    //                 setLoginStep("failCred");
    //             }
    //         }, []);
    //     }
    // })

// update profile info


if(user!==null){
    return (
        <div className="user_profile_main_div">
            <p>this is user profile</p>
            <h2 className="h2text">Screen Name</h2>
            <p className="text">Your public profile name. This name will appear on poster and comment you create.</p>
            <label></label>
            <input type="text" name="userProfileName" defaultValue={user.name}></input>
            <h2 className="h2text">Notification Email</h2>
            <p className="text">The email address where you want to receive account-related notifications such as Alerts.</p>
            <label></label>
            <input type="text" name="userProfileEmail" defaultValue={user.email}></input>
            <h2 className="h2text">Phone Number</h2>
            <p className="text">Phone Number to reach you. This phone number will be public and appear on poster you create.</p>
            <label></label>
            <input type="text" name="userProfilePhoneNumber" placeholder="xxx xxx-xxxx" defaultValue={user.phone}></input>
            <p></p>
            <button className="reset_pw_btn">Update Profile Info</button>    
            
            <div className="email_reset_div">
            <p className="text">Need to Change password ?</p>
            {changePasswordToggle===false && <button className="reset_pw_btn" onClick={(e=>{setChangePasswordToggle(true),setChangePasswordStep("request")})}>Change Password</button>}
            {changePasswordStep==="request" && changePasswordToggle===true && 
            <div>
                <form className="formUpdatePw" name="formUpdatePw"onSubmit={handlePasswordUpdate}>
                    <input type="password" name="oldPassword" placeholder="enter your old password" required></input>
                    <input type="password" name="newPassword" placeholder="enter your new password" required></input>
                    <input type="password" name="confirmNewPassword" placeholder="confirm your new password" required></input>
                    <button className="reset_pw_submit_btn" type="submit">send reset password email</button>
                </form>
            </div>
            }
            {changePasswordStep==="updated" && <p>Password update SUCCESFULL</p>}
            </div>
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