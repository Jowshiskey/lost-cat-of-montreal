import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext.js";
import { LogInContext } from "../../Context/LogInContext.js";

import FailedCred from "./FailedCred.js";
import EmailResetComplete from "./EmailResetComplete.js";
import CompleteCred from "./CompleteCred.js";

const Login = () => {
    
    const navigate = useNavigate();
    const setUser = React.useContext(UserContext).setUser;
    const user = React.useContext(UserContext).user;
    const loginStep = React.useContext(LogInContext).loginStep;
    const setLoginStep = React.useContext(LogInContext).setLoginStep;
    const [loginInfo, setLoginInfo] = useState({});
    const [loginState, setLoginState] = useState(false)

    //log IN function
    const handleLogin =(event)=>{
        event.preventDefault();
        //pre fetch validation
        //assemble body for req
        const assembleLoginInfo = {
            email : login_form.email.value,
            password : login_form.password.value,
            }
        setLoginInfo(assembleLoginInfo);
        setLoginState(true);
        
    }
    useEffect(() =>{
        if(loginState){ 
            fetch("/user", {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    console.log(parsed);
                    setLoginState(false);
                    // setLoginInfo({});
                    setUser(parsed);
                    setLoginStep("completeCred");
                    navigate("/userProfile");
                } else {
                    console.log(parsed.message);
                    setLoginState(false);
                    setLoginStep("failCred");
                }
            }, []);
        }
    })
    //log OUT function
    const handleLogout =(e)=>{
        e.preventDefault()
        setLoginStep("enterCred");
        setLoginInfo({});
        setUser(null)
    }
console.log(loginStep)
if(user===null){
    return (
        <div>
    {loginStep==="enterCred" &&
        <div>
            <p>this is the log in page</p>
            <div className="login_div_cred">
                <main>
                    <form className="form_login" name="login_form" onSubmit={handleLogin}>
                        <label className="login_label">Username : </label>
                        <input className="login_input" type="email" name="email" placeholder="username is your email"></input>
                        <label className="login_label">Password : </label>
                        <input className="login_input" type="password" name="password" placeholder="password"></input>
                        <button className="login_submit_btn" type="submit">log in</button>
                    </form>
                </main>
            </div>
            <div className="login_signUp_opt">
                <p className="text">New to the website ? create a new account.</p>
                <NavLink to="/signUp"><button className="back_to_signUp_btn">Sign-Up</button></NavLink>
            </div>
        </div>
    }
    {loginStep==="failCred" && <FailedCred setLoginStep={setLoginStep} />}
    {loginStep==="completeCred" && <CompleteCred />}
    {loginStep==="emailResetComplete" && <EmailResetComplete setLoginStep={setLoginStep}/>}
        </div>
    )
} else {
    return (
        <div className="failed_cred_main_div">
            <p className="text">You are currently Sign-in</p>
            <p className="text">{user.email}</p>
            <button className="logout_submit_btn" onClick={handleLogout}>Logout</button>
        </div>
    )
}

};

export default Login;