import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const Home = () => {

    const user = React.useContext(UserContext).user;

        return( 
        <div className="Home_main">
            <p>this is the home page</p>
            <NavLink to="/fileAReport"><button className="Home_newReport_btn">file a new Lost Cat Report</button></NavLink>
            <NavLink to="/report"><button className="Home_SnF_btn">Search and Found board</button></NavLink>
        </div>)

    
}

export default Home