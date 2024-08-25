import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {
  return (
    <div>
        <p>this is the log in page</p>
        <div>
            <main>
                <form>
                    <label></label>
                    <input type="text" placeholder="username"></input>
                    <label></label>
                    <input type="text" placeholder="password"></input>
                    <button>log in</button>
                </form>
            </main>
        </div>
        <NavLink to="/signUp"><button>Sign-Up</button></NavLink>
    </div>
  );
};

export default Login;