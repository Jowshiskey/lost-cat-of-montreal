import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const EmailResetComplete =( { setLoginStep })=>{

    return (
        <div className="email_reset_complete_div">
            <p className="text">Email reset Successfull, if your email is part of our database, you will receive a clickable link in a short notice</p>
            <button className="back_to_login_btn" onClick={(e=>{setLoginStep("enterCred")})}>Go back to log-in.</button>
        </div>
    )
};

export default EmailResetComplete;