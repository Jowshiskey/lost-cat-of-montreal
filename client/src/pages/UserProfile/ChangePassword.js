import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useEffect} from "react";
import { UserContext } from "../../Context/UserContext";



const ChangePassword =()=>{

    const {user, setUser } = React.useContext(UserContext);
// update password
    const [changePasswordToggle,setChangePasswordToggle]=useState(false)
    const [changePasswordState,setChangePasswordState]=useState(false)
    const [changePasswordStep,setChangePasswordStep]=useState("idle")
    const [changePasswordInfo,setChangePasswordInfo]=useState({})
    console.log(changePasswordStep);
    const handlePasswordUpdate=(event)=>{
        event.preventDefault();
        if(formUpdatePw.oldPassword.value===formUpdatePw.newPassword.value){
            setChangePasswordStep("needdiffpw")
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
        setChangePasswordStep("processing")
        setChangePasswordToggle(false);
        } else {
            setChangePasswordStep("missmatch")
            return console.log("new password and confirm new password need to matches");
        }
    }

// useEffect(() =>{
//     if(changePasswordStep==="processing"){ 
//         fetch("/profilePasswordUpdate", {
//             method: "PATCH",
//             body: JSON.stringify(changePasswordInfo),
//             headers: { 'Content-Type': 'application/json' }
//         })
//         .then((response) => response.json())
//         .then((parsed) => {
//             if(parsed.status === 200){
//                 console.log(parsed);
//                 setChangePasswordStep("updated")
//             } else {
//                 console.log(parsed.message);
//                 setChangePasswordStep("failed")
//             }
//         }, []);
//     }
// })
return (
    <div className="email_reset_div">
            <p className="text">Need to Change password ?</p>
            {changePasswordToggle===false && <button className="reset_pw_btn" onClick={(e=>{setChangePasswordToggle(true),setChangePasswordStep("request")})}>Change Password</button>}
            {changePasswordStep==="request" && changePasswordToggle===true && 
            <div>
                <form className="formUpdatePw" name="formUpdatePw" onSubmit={handlePasswordUpdate} style={{display:"flex", flexDirection:"column"}}>
                    <input className="profile_input" type="password" name="oldPassword" placeholder="enter your old password" required></input>
                    <input className="profile_input" type="password" name="newPassword" placeholder="enter your new password" required></input>
                    <input  className="profile_input" type="password" name="confirmNewPassword" placeholder="confirm your new password" required></input>
                    <button className="reset_pw_submit_btn" type="submit">Update Password</button>
                </form>
            </div>
            }
            {changePasswordStep==="needdiffpw" && <p className="text" style={{color:"red"}}>New password needs to be different from Previous one.</p>}
            {changePasswordStep==="missmatch" && <p className="text" style={{color:"red"}}>MISSMATCH, New password and Confirm password need to be the same.</p>}
            {changePasswordStep==="updated" && <p className="text" style={{color:"lime"}}>Password, update SUCCESFULL.</p>}
            {changePasswordStep==="failed" && <p className="text" style={{color:"red"}}>Password FAILED to updated</p>}
        </div>
        )
};

export default ChangePassword;