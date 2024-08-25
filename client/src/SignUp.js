import styled from "styled-components";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';



const SignUp = () => {
    const navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState({});
    const [signUpState, setSignUpState] = useState(false)
    const [signUpStep, setSignUpStep] = useState("register")
    
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
        <p className="sign_up_main_text">Create a new Account</p>
    {signUpStep === "register" &&
        <div className="sign_up_form_div">
            <main className="main_form_div">
                <form className="sign_up_form" name="sign_up_form" onSubmit={handleSignUp}>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email@.com" required></input>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="password" required></input>
                    <label>Password confirmation</label>
                    <input type="password" name="confirmPassword"placeholder="confirm password" required></input>
                    <div className="sign_up_terms_form">
                        <input type="checkbox" name="termUsePrivacy"></input>
                        <label>I agree to the lost Cat of Montreal <a href="#" >Term and use</a> and <a href="#">Privacy policy</a></label>
                    </div>
                    <button type="submit">Sign-Up</button>
                </form>
            </main>
        </div>
    }
    {signUpStep === "complete" &&
        <div>
            <p>Thank you for registering to Lost Cat</p>
            <NavLink to="/login"><button>Go to Log in</button></NavLink>
        </div>
    }
    </div>
);
};

export default SignUp;