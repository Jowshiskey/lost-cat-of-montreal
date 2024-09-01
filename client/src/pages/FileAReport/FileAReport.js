import React, { useState, useEffect } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../Context/UserContext.js";

import MyFirstMap from "./MyFirstMap.js";
import { FileAreportContext } from '../../Context/FileAreportContext.js';


const FileAReport = () => {

    const navigate = useNavigate();
    const user = React.useContext(UserContext).user;
    const { markerPos,setMarkerPos, setPreviewPhoto, previewPhoto, setPreviewMode,fileFormSubmitInfo, setFileFormSubmitInfo } = React.useContext(FileAreportContext);
    const [fileFormSubmitState, setFileFormSubmitState]= useState(false);
    
    
    const handlePosterPreview=(event)=>{
        event.preventDefault()
        const reportInfo = 
            {
                _id : uuidv4(),
                catName : report.catname.value,
                catColor : report.catcolor.value,
                catImage : previewPhoto,
                catGender : report.catgender.value,
                catMicroship : report.microship.value,
                lastTimeSeen : report.last_time_seen.value,
                whereLastSeen : markerPos,
                escapeDay : report.eDay.value,
                profileName : user.name,
                profilePhoneNumber : user.phone,
                profileEmail : user.email,
            }
            setFileFormSubmitInfo(reportInfo);
            navigate("/createPoster");
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const reportInfo = 
            {
                _id : uuidv4(),
                catName : report.catname.value,
                catColor : report.catcolor.value,
                catImage : previewPhoto,
                catGender : report.catgender.value,
                catMicroship : report.microship.value,
                lastTimeSeen : report.last_time_seen.value,
                whereLastSeen : markerPos,
                escapeDay : report.eDay.value,
                profileName : user.name,
                profilePhoneNumber : user.phone,
                profileEmail : user.email,
            }
            setFileFormSubmitInfo(reportInfo);
            setFileFormSubmitState(true);
        }
        useEffect(() =>{ 
            if(fileFormSubmitState){
                fetch("/addFileReport", {
                    method: "POST",
                    body: JSON.stringify(fileFormSubmitInfo),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => response.json())
                .then((parsed) => {
                    if(parsed.status === 201){
                        console.log(parsed);
                        setFileFormSubmitState(false);
                        navigate("/createPoster") 
                    } else {
                        console.log(parsed.message)
                        setFileFormSubmitState(false);
                    }
                }, []);
            }
        })
const handleResetReport=(event)=>{
    event.preventDefault();
    setPreviewPhoto(undefined);
    setMarkerPos({ lat: 45.533290, lng: -73.621629 });
    
}
const handleImageUpload=(event)=>{
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
        console.log(reader.result);
        setPreviewPhoto(reader.result);
    }
};
if(user!==null){
    return (
        <div className="fileAReport_main_div">
            <div className="left_side_div">
                <main>
                    <form className="new_report_form" name="report" onSubmit={handleSubmit}>
                        <div className="new_report_question_div">
                            <p>this is the form to file a lost cat</p>
                            <label name="catname">Cat Name : </label>
                            <input type="text"placeholder="ex: fluffy" name="catname" required></input>
                            <label name="catcolor">Cat color : </label>
                            <input type="text"placeholder="ex: gray and white tiger pattern"name="catcolor"  required></input>
                            <label name="catgender">Cat gender : </label>
                            <select name="catgender" id="catgender" required>
                                <option value="">I don't know</option>
                                <option value="Male">Male ♂</option>
                                <option value="Female">Female ♀</option>
                                <option value="binari">binari ♀/♂</option>
                                <option value="">I dont believe in gender 🚯</option>
                                <option value="">I find this question offensive</option>
                            </select>
                            <label name="microship">is your Cat Microship ?</label>
                            <select name="microship" id="microship" required>
                                <option value="is not Microshiped.">Not that I know of</option>
                                <option value="is a cat with a Microship.">Yes, microship</option>
                            </select>
                            <label>The day of the escape : </label>
                            <input type="date" name="eDay" id="eDay" max={new Date().toISOString().split("T")[0]} required/>
                            <label name="last_time_seen">Tell us when it happen</label>
                            <input type="time" id="last_time_seen" name="last_time_seen" min="00:00" defaultValue="00:00" />
                            <MyFirstMap />
                            <label name="lost_cat_pic">Please upload a picture of your lost cat : </label>
                            <input type="file" id="file-upload" name="lost_cat_pic" accept="image/*" onChange={handleImageUpload} required/>
                    {previewPhoto && <img src={previewPhoto} alt="cat_picture" className="cat_pic_small"></img>}
                        </div>
                        <div>
                            <button type="reset" value="Reset">Reset the Report</button>
                            <button type="button" value="Reset" onClick={handleResetReport}>Reset cat photo and cat location</button>
                            <button className="go_to_btn" onClick={handlePosterPreview}>Generate Poster</button>
                            <button type="submit" >Create a poster</button>
                        </div>
                    </form>
                </main>
            </div>
    
            <div className="right_side_div">
            
            </div>
        </div>)
} else {
    return (
        <div className="fileAreport_opt">
            <p className="text">Please Create an account or Login to your account to create a File Report </p>
            <NavLink to="/login"><button className="back_to_login_btn">Login</button></NavLink>
            <NavLink to="/signUp"><button className="back_to_login_btn">Sign-Up</button></NavLink>
        </div>
    )
}

}
export default FileAReport