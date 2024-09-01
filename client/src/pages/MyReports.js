import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext.js";



const MyReports = () => {
    const [updateUserReport, setUpdateUserReport] = useState(true);
    const [userReports, setUserReports] = useState([]);
    const user = React.useContext(UserContext).user;
    const assembleURL = "/getUserReport/" + user.email;
    console.log(assembleURL)

    useEffect(() => {
        if(updateUserReport){
        fetch(assembleURL)
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

    // if(user && userReports===null) {
        return (
            <div className="no_my_reports_found">
                <p className="text">this is the my reports page</p>
                <p className="text">There is no Report associate with you Email Address</p>
                <NavLink to="/login"><button className="back_to_login_btn">Login</button></NavLink>
            </div> 
            )
    // }
    // if(!user){
    //     return (
    //         <div>
    //             <p>this is the my reports page</p>
    //             <p>You need to be login to see your Reports</p>
    //             <NavLink to="/login"><button>Login</button></NavLink>
    //         </div>
    // )
    // } else if (userReports) {
    //     return (
    //         <div>
    //             <p>this is the my reports page</p>
    //             {userReports.map(x=>{
    //                 return (
    //                     <div key={x._id}>
    //                         <p>{x.catName}</p>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    // )
    // } 
};

export default MyReports;