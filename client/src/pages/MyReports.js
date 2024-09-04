import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FileAreportContext } from "../Context/FileAreportContext.js";
import { UserContext } from "../Context/UserContext.js";
import { ReportStatusContext } from "../Context/ReportStatusContext.js";

const MyReports = () => {

    const navigate = useNavigate()
    const [updateUserReport, setUpdateUserReport] = useState(true);
    const [userReports, setUserReports] = useState([]);
    const { setFileFormSubmitInfo, fileFormSubmitInfo } = React.useContext(FileAreportContext);
    const { posterStatus,setPosterStatus } = React.useContext(ReportStatusContext);
    const user = React.useContext(UserContext).user

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

    const handleEditReport=(x)=>{
        setFileFormSubmitInfo(x);
        setDeleteReportState(true);
    }
    
    const[deleteReportState,setDeleteReportState] = useState(false)
    const handleDeleteReport=(x)=>{
        setFileFormSubmitInfo(x);
        setDeleteReportState(true);
    }
    useEffect(() => {
        if(deleteReportState){
        fetch("/deleteUserReport/" + fileFormSubmitInfo._id, {
            method: "DELETE",
            headers: {
            'content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    console.log(parsed.data);
                    setUserReports(parsed.data);
                    setDeleteReportState(false);
                } else {
                    console.log(parsed.message)
                    setUserReports(null)
                    setDeleteReportState(false);
                }
            }, []);
        }
    });
    
    
    const[updateReportState, setUpdateReportState] = useState("idle")
    const handleUpdatePosterStatus=(e,x)=>{
        e.preventDefault();
        setFileFormSubmitInfo(x);
        setUpdateReportState("processing")
    }
    useEffect(() => {
        if(updateReportState==="processing"){
        fetch("/profilePosterStatusUpdate/" + fileFormSubmitInfo._id +"/"+ posterStatus, {
            method: "PATCH",
        })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    console.log(parsed);
                    setUpdateReportState("updated");
                } else {
                    console.log(parsed)
                    setUpdateReportState("failed");
                }
            }, []);
        }
    })
console.log(user.email, posterStatus )
console.log(updateReportState)
    if(user) {
        if(userReports){
            return (
                <div className="report_main_div_main">
                    {userReports.map(x=>{
                        return (
                            <div key={x._id} className="board_main_poster_div">
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                    <p>{x.catName} file report</p>
                                    <p>creation date</p>
                                </div>
                                <label  className="text" name="posterstatus"> Report Status </label>
                                    <select className="posterStatus_input" name="posterstatus" id="posterstatus" defaultValue={posterStatus} onChange={(e=>{setPosterStatus(e.target.value),handleUpdatePosterStatus(e,x)})}required>
                                        <option value="">Still looking</option>
                                        <option value="Found">Cat is Found and Safe</option>
                                        <option value="Dead">Cat is dead</option>
                                        <option value="Expire">Expire poster after 30 day.</option>
                                    </select>
                                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                        <button onClick={(e=>{handleDeleteReport(x)})}>Delete Report</button>
                                        <NavLink to="/fileAReport"> <button type="button" onClick={handleEditReport}>Edit Report</button></NavLink>
                                    </div>
                            </div>
                        )
                    })}
                </div>
        )
        } else {
            return (
                <div className="no_my_reports_found">
                    <p className="text">There is no Report associate with you Email Address</p>
                    <p className="text">{user.email}</p>
                    <p className="text">Wrong account ? Try login into another account ?</p>
                    <NavLink to="/login"><button className="back_to_login_btn">Login</button></NavLink>
                </div> 
                )
        }
    } else {
        return (
            <div>
                <p>You need to be login to see your Reports</p>
                <NavLink to="/login"><button>Login</button></NavLink>
            </div>
        )
    }
};

export default MyReports;