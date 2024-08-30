import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const EmailResetComplete =( { setLoginStep })=>{

    return (
        <div>
            <p>Email reset Successfull, if your email is part of our database, you will receive a clickable link in a short notice</p>
            <button onClick={(e=>{setLoginStep("enterCred")})}>Go back to log-in.</button>
        </div>
    )
};

export default EmailResetComplete;