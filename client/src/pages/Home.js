import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
    return <div>
        <p>this is the home page</p>
        <NavLink to="/fileAReport"><button>file a new Lost Cat Report</button></NavLink>
        <NavLink to="/report"><button>Search and Found board</button></NavLink>
    </div>
}

export default Home