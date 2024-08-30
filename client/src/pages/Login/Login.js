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
                    setLoginInfo({});
                    setUser(parsed);
                    setLoginStep("completeCred");
                    navigate("/userProfile");
                } else {
                    console.log(parsed.message);
                    setLoginState(false);
                    setLoginInfo({});
                    setLoginStep("failCred");
                }
            }, []);
        }
    })
    //log OUT function
    const handleLogout =()=>{
        setLoginStep("enterCred");
        setLoginInfo({});
        setUser(null)

    }

if(user===null){
    return (
        <div>
    {loginStep==="enterCred" &&
        <div>
            <p>this is the log in page</p>
            <div>
                <main>
                    <form className="form_login" name="login_form" onSubmit={handleLogin}>
                        <label>Username : </label>
                        <input type="email" name="email" placeholder="username is your email"></input>
                        <label>Password : </label>
                        <input type="password" name="password" placeholder="password"></input>
                        <button type="submit">log in</button>
                    </form>
                </main>
            </div>
            <p>do you need to create a new account ? : <NavLink to="/signUp"><button>Sign-Up</button></NavLink></p>
        </div>
    }
    {loginStep==="failCred" && <FailedCred setLoginStep={setLoginStep} />}
    {loginStep==="completeCred" && <CompleteCred />}
    {loginStep==="emailResetComplete" && <EmailResetComplete setLoginStep={setLoginStep}/>}
        </div>
    )
} else {
    return (
        <div>
            <p>You are currently Sign-in</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

};

export default Login;