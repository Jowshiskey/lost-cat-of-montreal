import styled from "styled-components";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../Context/UserContext.js";


const SignUp = () => {
    const navigate = useNavigate();
    
    const [signUpInfo, setSignUpInfo] = useState({});
    const [signUpState, setSignUpState] = useState(false)
    const [signUpStep, setSignUpStep] = useState("register");

    const handleSignUp =(event)=>{
        event.preventDefault();
        //pre fetch validation
        if(sign_up_form.password.value===sign_up_form.confirmPassword.value){
            console.log("password and confirm password matches!");
            if(sign_up_form.termUsePrivacy.checked){
                console.log("Terms and services are agreed");
        //assemble body for req
                const assembleSignUpInfo = {
                    _id : uuidv4(),
                    name : sign_up_form.userName.value,
                    phone : sign_up_form.phoneNumber.value,
                    email : sign_up_form.email.value,
                    password : sign_up_form.password.value,
                }
                setSignUpInfo(assembleSignUpInfo);
                setSignUpState(true);
            } else {
                console.log("Terms and services needs to be agreed-on");
            }
        } else {
            console.log("password needs to be matching to continue")
        }
    }

    useEffect(() =>{
        if(signUpState){ 
            fetch("/addNewUser", {
                method: "POST",
                body: JSON.stringify(signUpInfo),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 201){
                    console.log(parsed);
                    setSignUpState(false)
                    setSignUpInfo({})
                    setSignUpStep("complete")
                } else {
                    console.log(parsed.message)
                    setSignUpState(false)
                    setSignUpInfo({})
                }
            }, []);
        }
    })

return (
    <div className="sign_up_main_div">
    {signUpStep === "register" &&
        <div className="sign_up_form_div">
            <main className="main_form_div">
                <form className="sign_up_form" name="sign_up_form" onSubmit={handleSignUp}>
                    <label><h2 className="h2text">Screen Name</h2></label>
                    <p className="text">Your public profile name. This name will appear on poster and comment you create.</p>
                    <input type="text" name="userName" placeholder="username" required></input>
                    <label><h2 className="h2text">Phone Number</h2></label>
                    <p className="text">Phone Number to reach you. This phone number will be available to public and appear on poster you create.</p>
                    <input type="text" name="phoneNumber" placeholder="(XXX) XXX-XXXX" required></input>
                    <label><h2 className="h2text">Email</h2></label>
                    <p className="text">The email address where you want to receive account-related notifications such as Alerts.</p>
                    <input type="email" name="email" placeholder="Email@.com" required></input>
                    <label><h2 className="h2text">Password</h2></label>
                    <input type="password" name="password" placeholder="password" required></input>
                    <label><h2 className="h2text">Password confirmation</h2></label>
                    <input type="password" name="confirmPassword"placeholder="confirm password" required></input>
                    <div className="sign_up_terms_form">
                        <input type="checkbox" name="termUsePrivacy"></input>
                        <label className="text">I agree to the lost Cat of Montreal <a href="#" className="text" style={{color:"blue"}}>Term and use</a> and <a className="text" style={{color:"blue"}} href="#">Privacy policy</a></label>
                    </div>
                    <button className="login_submit_btn " type="submit">Sign-Up</button>
                </form>
            </main>
        </div>
    }
    {signUpStep === "complete" &&
        <div>
            <p className="text">Thank you for registering to Lost Cat</p>
            <NavLink to="/login"><button className="back_to_login_btn">Go to Log in</button></NavLink>
        </div>
    }
    </div>
);
};

export default SignUp;