import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "./Context/UserContext.js";

const Login = () => {
    
    const navigate = useNavigate();
    // const [user, setUser] = useState(null);
    const user = React.useContext(UserContext).user;
    const setUser = React.useContext(UserContext).setUser;
    const setUserEmail= React.useContext(UserContext).setUserEmail;

    const [loginInfo, setLoginInfo] = useState({});
    const [loginState, setLoginState] = useState(false)
    const [loginStep, setLoginStep] = useState("enterCred")
// console.log(user,loginStep)
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
                    setUserEmail(parsed.email);
                    setUser(parsed._id); 
                    setLoginStep("completeCred");
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
    }

    //toggle reset password
    const [resetPasswordEmail, setResetPasswordEmail] = useState(false);
    //send email password reset
    const handlePasswordResetRequest=()=>{
        setResetPasswordEmail(false);
        setLoginStep("emailResetComplete");
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
                        <input type="text" name="password" placeholder="password"></input>
                        <button type="submit">log in</button>
                    </form>
                </main>
            </div>
            <p>do you need to create a new account ? : <NavLink to="/signUp"><button>Sign-Up</button></NavLink></p>
        </div>
    }
    {loginStep==="failCred" &&
        <div>
            <p>Username dosent Exist or wrong password</p>
            <button onClick={(e=>{setLoginStep("enterCred")})}>Try again, go back to log-in.</button>
            <p>forgot your password ?</p>
            {resetPasswordEmail===false && <button onClick={(e=>{setResetPasswordEmail(true)})}>send password reset to email Adress.</button>}
            {resetPasswordEmail===true && <input type="email" name="email" placeholder="enter your email"></input>}
            {resetPasswordEmail===true && <button onClick={handlePasswordResetRequest}>send reset password email</button>}
            <p>Create a new account ?</p>
            <NavLink to="/signUp"><button>Sign-Up</button></NavLink>
        </div>
    }
    {loginStep==="completeCred" &&
        <div>
            <p>You are successfully log in</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    }
    {loginStep==="emailResetComplete" &&
        <div>
            <p>Email reset Successfull, if your email is part of our database, you will receive a clickable link in a short notice</p>
            <button onClick={(e=>{setLoginStep("enterCred")})}>Go back to log-in.</button>
        </div>
    }
        </div>
    );
} else {
    return (
        <button onClick={handleLogout}>Log Out</button>
    )
}
    
};

export default Login;