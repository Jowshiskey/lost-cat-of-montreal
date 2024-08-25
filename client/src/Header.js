import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Header = () => {
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
};

export default Header;
