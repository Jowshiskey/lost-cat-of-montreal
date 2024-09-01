import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserContext } from "./Context/UserContext.js";
import { LogInContext } from "./Context/LogInContext.js";

const Header = () => {
  const navigate = useNavigate();
  const user = React.useContext(UserContext).user;
  const setUser = React.useContext(UserContext).setUser;
  const setLoginStep = React.useContext(LogInContext).setLoginStep;

const handleLogout=(event)=>{
  event.preventDefault();
  setUser(null);
  setLoginStep("enterCred");
  navigate("/login");
}

if(user!==null){
  return (
    <div className="header_main_div">
      <div className="header_webname_div">
        <NavLink to="/">
          <p>🏠</p>
        </NavLink>
        <NavLink to="/report">
          <p> search and found</p>
        </NavLink>
        <NavLink to="/myReports">
            <p>my reports</p>
          </NavLink>
          <NavLink to="/userProfile">
            <p>Profile</p>
          </NavLink>
          <NavLink onClick={handleLogout} to="/login" >
            <p>log out</p>
          </NavLink>

      </div>
    </div>
  );
} else {
  return (
    <div className="header_main_div">
      <div className="header_webname_div">
        <NavLink to="/">
          <p>🏠</p>
        </NavLink>
        <NavLink to="/report">
          <p> search and found</p>
        </NavLink>
        <NavLink to="/login">
          <p>log in</p>
        </NavLink>
      </div>
    </div>
  );
}
  
};

export default Header;
