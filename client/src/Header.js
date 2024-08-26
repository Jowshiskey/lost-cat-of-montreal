import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserContext } from "./Context/UserContext.js";

const Header = () => {
  const user = React.useContext(UserContext).user;
  const setUser = React.useContext(UserContext).setUser;
console.log(user);

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
        <NavLink onClick={e=>{setUser(null)}} to="/login" >
          <p>log out</p>
        </NavLink>
        <p>welcome you are sign-in</p>
        <NavLink to="/userProfile">
          <p>Profile</p>
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
