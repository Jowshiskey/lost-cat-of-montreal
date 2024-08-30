import React, { useState, useEffect } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../Context/UserContext.js";

import MyFirstMap from "./MyFirstMap.js";
import { FileAreportContext } from '../../Context/FileAreportContext.js';

import Poster from "./Poster.js";


const FileAReport = () => {

    const navigate = useNavigate();
    const user = React.useContext(UserContext).user;

    const { markerPos,setMarkerPos, setPreviewPhoto, previewPhoto } = React.useContext(FileAreportContext);

    const [fileFormSubmitState, setFileFormSubmitState]= useState(false);
    const [fileFormSubmitInfo, setFileFormSubmitInfo]= useState({});
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const reportInfo = 
            {
                _id : uuidv4(),
                catName : report.catname.value,
                catColor : report.catcolor.value,
                catImage : previewPhoto,
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
                        setFileFormSubmitInfo({})
                    } else {
                        console.log(parsed.message)
                        setFileFormSubmitState(false);
                    }
                }, []);
            }
        })

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewPhoto(imageUrl);
    }

    
};
console.log(fileFormSubmitInfo);
if(user!==null){
    return (
        <div className="fileAReport_main_div">
            <div className="left_side_div">
                <main>
                    <form className="new_report_form" name="report" onSubmit={handleSubmit}>
                        <div className="new_report_question_div">
                            <p>this is the form to file a lost cat</p>
                            <label name="catname">Cat Name : </label>
                            <input type="text"placeholder="ex: fluffy" name="catname"  required></input>
                            <label name="catcolor">Cat color : </label>
                            <input type="text"placeholder="ex: gray and white tiger pattern"name="catcolor"  required></input>
                            <label>The day of the escape : </label>
                            <input type="date" name="eDay" id="eDay" max={new Date().toISOString().split("T")[0]} />
                            <label name="last_time_seen">Tell us when it happen</label>
                            <input type="time" id="last_time_seen" name="last_time_seen" min="00:00" max="12:00"  />
                            <MyFirstMap />
                            <label name="lost_cat_pic">Please upload a picture of your lost cat : </label>
                            <input type="file" id="file-upload" name="lost_cat_pic" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                            <img src={previewPhoto} alt="cat_picture" className="cat_pic_small"></img>
                        </div>
                        <div>
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
        <div>
            <p>Please Create an account or Login to your account to create a File Report </p>
            <NavLink to="/login"><button>Login</button></NavLink>
            <NavLink to="/signUp"><button>Sign-Up</button></NavLink>
        </div>
    )
}

}
export default FileAReport