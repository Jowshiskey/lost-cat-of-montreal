import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../Context/UserContext.js";

import MyFirstMap from "./MyFirstMap.js";
import { FileAreportContext } from '../../Context/FileAreportContext.js';
import Poster from "./Poster.js";
import PreviewPoster from "./PreviewPoster.js";
import html2canvas from "html2canvas";

const FileAReport = () => {

    const navigate = useNavigate();
    const user = React.useContext(UserContext).user;
    const { markerPos,setMarkerPos, 
        setPreviewPhoto, previewPhoto, 
        setPreviewMode,
        fileFormSubmitInfo, setFileFormSubmitInfo, dataURL,setDataURL } = React.useContext(FileAreportContext);
    const [fileFormSubmitState, setFileFormSubmitState]= useState(false);
    const [generateState, setGenerateState]= useState(false);
    const ToCaptureRef = useRef();

    const captureScreenshot = async()=>{
        const canvasPromise = html2canvas(ToCaptureRef.current, {
            useCORS: true
        });
        canvasPromise.then((canvas)=> {
            setDataURL(canvas.toDataURL("image/png"));
        });
        
    }
    // update first
    const handlePosterUpdate=(event)=>{
        event.preventDefault()
        const reportInfo = 
            {
                _id : uuidv4(),
                posterStatus : "Still looking",
                catName : report.catname.value,
                catColor : report.catcolor.value,
                catImage : previewPhoto,
                catGender : report.catgender.value,
                catMicroship : report.microship.value,
                catAddInfo : report.addInfo.value,
                reward : report.reward.value,
                lastTimeSeen : report.last_time_seen.value,
                whereLastSeen : markerPos,
                escapeDay : report.eDay.value,
                profileName : user.name,
                profilePhoneNumber : user.phone,
                profileEmail : user.email,
            }
            setFileFormSubmitInfo(reportInfo);
    }
    // generate the poster
    const handlePosterGenerate=()=>{
        setGenerateState(true)
        captureScreenshot();
    }
    // take a look at the preview
    const goToPreview=()=>{
        setPreviewMode(true);
        navigate("/previewPoster");
    }
    // save and share
    const handleSubmit = (event) => {
        event.preventDefault()
        const reportInfo = 
            {
                _id : uuidv4(),
                posterStatus : "Still looking",
                catName : report.catname.value,
                catColor : report.catcolor.value,
                catImage : dataURL,
                catGender : report.catgender.value,
                catMicroship : report.microship.value,
                catAddInfo : report.addInfo.value,
                reward : report.reward.value,
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
                        setGenerateState(false);
                        navigate("/report") 
                    } else {
                        console.log(parsed.message)
                        setFileFormSubmitState(false);
                        setGenerateState(false);
                    }
                }, []);
            }
        })
const handleResetReport=(event)=>{
    // event.preventDefault();
    setPreviewPhoto(undefined);
    setMarkerPos({ lat: 45.533290, lng: -73.621629 });
    setFileFormSubmitInfo({});
}
const handleImageUpload=(event)=>{
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{
        console.log(reader.result);
        setPreviewPhoto(reader.result);
    }
};
console.log(fileFormSubmitInfo)
if(user!==null){
    return (
        <div className="fileAReport_main_div">
    <div className="left_side_div">
                <main>
                    <form className="new_report_form" name="report" onSubmit={handleSubmit}>
                        <div className="new_report_question_div">
                            <label className="text" name="lost_cat_pic">Please upload a picture of your lost cat : </label>
                            <input className="report_input" type="file" id="file-upload" name="lost_cat_pic" accept="image/*" onChange={handleImageUpload} />
                            <label className="text" name="catname">Cat Name : </label>
                            <input className="report_input" type="text"placeholder="ex: fluffy" name="catname" defaultValue={fileFormSubmitInfo.catName}required></input>
                            <label className="text" name="catcolor">Cat color : </label>
                            <input className="report_input" type="text"placeholder="ex: gray and white tiger pattern"name="catcolor" defaultValue={fileFormSubmitInfo.catColor} required></input>
                            <label  className="text" name="catgender">Cat gender : </label>
                            <select className="report_input" name="catgender" id="catgender" defaultValue={fileFormSubmitInfo.catGender} required>
                                <option value="">I don't know</option>
                                <option value="Male">Male ♂</option>
                                <option value="Female">Female ♀</option>
                                <option value="binari">binari ♀/♂</option>
                                <option value="">I dont believe in gender 🚯</option>
                                <option value="">I find this question offensive</option>
                            </select>
                            <label className="text" name="microship">is your Cat Microship ?</label>
                            <select className="report_input" name="microship" id="microship" defaultValue={fileFormSubmitInfo.catMicroship}required>
                                <option value="is not Microshiped.">Not that I know of</option>
                                <option value="is a cat with a Microship.">Yes, microship</option>
                            </select>
                            <label  className="text" name="reward">Add an incentive ?</label>
                            <select className="report_input" name="reward" id="reward" defaultValue={fileFormSubmitInfo.reward} required>
                                <option value="">Reward</option>
                                <option value="">No Reward</option>
                                <option value="$$$ REWARD 25 $$$">25$</option>
                                <option value="$$$ REWARD 50 $$$">50$</option>
                                <option value="$$$ REWARD 100 $$$">100$</option>
                                <option value="$$$ REWARD 200 $$$">200$</option>
                                <option value="">I dont belive in money</option>
                            </select>
                            <label className="text">The day of the escape : </label>
                            <input className="report_input" type="date" name="eDay" id="eDay" max={new Date().toISOString().split("T")[0]} defaultValue={fileFormSubmitInfo.escapeDay} required/>
                            <label className="text" name="last_time_seen">Tell us when it happen</label>
                            <input className="report_input" type="time" id="last_time_seen" name="last_time_seen" min="00:00" defaultValue={fileFormSubmitInfo.lastTimeSeen}/>
                            <p className="text">Tell us your cat whereabout the last time you seen it.</p>
                            <div className="map_div">
                                <MyFirstMap />
                            </div>
                            <label className="text" name="addInfo">Additionnal Cat Information : </label>
                            <input className="report_input" style={{height:"3rem"}} type="text" maxLength="130" placeholder="ex: Age, favorite food, necklace, something to look out" name="addInfo" defaultValue={fileFormSubmitInfo.catAddInfo}></input>
                        </div>
                        <div className="file_report_opt_div">
                            <button className="reset_pw_submit_btn" type="reset" value="reset" onClick={handleResetReport}>Reset the Report</button>
                        {generateState && <button className="reset_pw_submit_btn" type="submit" >Save and Share</button>}
                        </div>
                    </form>
                </main>
            </div>
            <div className="right_side_div">
                <div >
        {previewPhoto ?
            <div>
                <div className="capture" ref={ToCaptureRef}>
                    <h1 className="capture_h1">Lost Cat</h1>
                    <h2 className="capture_h2">Help us to find our Cat</h2>
                    <h1 className="capture_CatName">{fileFormSubmitInfo.catName} </h1>
                    <p className="capture_Info">Please reach out to {fileFormSubmitInfo.profileName} at : {fileFormSubmitInfo.profilePhoneNumber}, if you have any information.</p>
                    {fileFormSubmitInfo.catGender && <p className="capture_Info2"> {fileFormSubmitInfo.catName} {fileFormSubmitInfo.catMicroship} {fileFormSubmitInfo.catName} is a {fileFormSubmitInfo.catGender}</p>}
                    <img src={previewPhoto} alt="🙀" className="capture_img" style={{fontSize:"300px"}}></img>
                </div>
                <button className="reset_pw_submit_btn" type="button" onClick={handlePosterUpdate} disable={fileFormSubmitState ? true : false}>update Poster</button>
                <button className="reset_pw_submit_btn" type="button" onClick={handlePosterGenerate}>Generate Poster</button>
    {previewPhoto && <button className="reset_pw_submit_btn" onClick={goToPreview}>Preview Poster</button> }
                
            </div>
            :
            <div>
                <p className="text" style={{fontSize:"100px", textAlign:"center"}}>🙀</p>
                <p className="text">You need to add a picture of your cat to create a poster</p>
            </div>
        }
        </div>
            </div>
        </div>
        )
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