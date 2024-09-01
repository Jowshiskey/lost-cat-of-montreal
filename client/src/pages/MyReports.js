import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext.js";



const MyReports = () => {
    const [updateUserReport, setUpdateUserReport] = useState(true);
    const [userReports, setUserReports] = useState([]);
    const user = React.useContext(UserContext).user;

    useEffect(() => {
        if(updateUserReport){
        fetch("/getUserReport/" + user.email)
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    console.log(parsed.data);
                    setUserReports(parsed.data);
                    setUpdateUserReport(false)
                } else {
                    console.log(parsed.message)
                    setUserReports(null)
                    setUpdateUserReport(false)
                }
            }, []);
        }
    });

    if(user) {
        if(userReports){
            return (
                <div className="my_report_main_div">
                    <p>this is the my reports page</p>
                    {userReports.map(x=>{
                        return (
                            <div key={x._id}>
                                <p>{x.catName}</p>
                                <p>{x.catColor}</p>
                                <p>{x.escapeDay}</p>
                                <p>{x.lastTimeSeen}</p>
                            </div>
                        )
                    })}
                </div>
        )
        } else {
            return (
                <div className="no_my_reports_found">
                    <p className="text">this is the my reports page</p>
                    <p className="text">There is no Report associate with you Email Address</p>
                    <p className="text">Wrong account ? Try login into your account ?</p>
                    <NavLink to="/login"><button className="back_to_login_btn">Login</button></NavLink>
                </div> 
                )
        }
    } else {
        return (
            <div>
                <p>this is the my reports page</p>
                <p>You need to be login to see your Reports</p>
                <NavLink to="/login"><button>Login</button></NavLink>
            </div>
        )
    }
};

export default MyReports;