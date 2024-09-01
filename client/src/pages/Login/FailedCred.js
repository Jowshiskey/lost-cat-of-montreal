import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";







const FailedCred =( { setLoginStep })=>{

//toggle reset password
    const [resetPasswordEmail, setResetPasswordEmail] = useState(false);
//send email password reset
    const handlePasswordResetRequest=(event)=>{
        event.preventDefault();
        setResetPasswordEmail(false);
        setLoginStep("emailResetComplete");
    }

    return (
        <div className="failed_cred_main_div">
            <p className="text">Username dosent Exist or wrong password</p>
            <button className="back_to_login_btn" onClick={(e=>{setLoginStep("enterCred")})}>Try again, go back to log-in.</button>
            <p className="text">forgot your password ?</p>
            {resetPasswordEmail===false && <button className="reset_pw_btn" onClick={(e=>{setResetPasswordEmail(true)})}>send password reset to email Adress.</button>}
            {resetPasswordEmail===true && 
            <div>
                <form  className="email_reset_div" name="form_email_request_forget_password" onSubmit={handlePasswordResetRequest}>
                    <input className="email_reset_input"type="email" name="email" placeholder="enter your email" required></input>
                    <button className="reset_pw_submit_btn">send reset password email</button>
                </form>
            </div>}
            <p className="text">Create a new account ?</p>
            <NavLink to="/signUp"><button className="back_to_signUp_btn">Sign-Up</button></NavLink>
        </div>
    )
};

export default FailedCred;