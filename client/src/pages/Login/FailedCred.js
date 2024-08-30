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
        <div>
            <p>Username dosent Exist or wrong password</p>
            <button onClick={(e=>{setLoginStep("enterCred")})}>Try again, go back to log-in.</button>
            <p>forgot your password ?</p>
            {resetPasswordEmail===false && <button onClick={(e=>{setResetPasswordEmail(true)})}>send password reset to email Adress.</button>}
            {resetPasswordEmail===true && 
            <div>
                <form name="form_email_request_forget_password" onSubmit={handlePasswordResetRequest}>
                    <input type="email" name="email" placeholder="enter your email" required></input>
                    <button >send reset password email</button>
                </form>
            </div>}
            <p>Create a new account ?</p>
            <NavLink to="/signUp"><button>Sign-Up</button></NavLink>
        </div>
    )
};

export default FailedCred;