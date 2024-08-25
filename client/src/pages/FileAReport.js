import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const reportCatQuestion = [
    { type : "text", placeholder : "Cat Name", name : "catname", value : "", require},
    { type : "text", placeholder : "Cat color", name : "catcolor", value : "", require},
    { type : "text", placeholder : "", name : "catname", value : "", require},
];
//handle the form submit
const handleSubmit = (event) => {
    event.preventDefault()
    const reportInfo = 
        {
            _id : uuidv4(),
            catName : report.catname.value,
            catColor : report.catcolor.value,
            catImage : report.lost_cat_pic.value,
            lastTimeSeen : report.last_time_seen.value,
            escapeDay : report.eDay.value,
        }
    useEffect(() =>{ 
        fetch("/addFileReport", {
            method: "POST",
            body: JSON.stringify(reportInfo),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then((parsed) => {
            if(parsed.status === 201){
                console.log(parsed);
            } else {
                console.log(parsed.message)
            }
        }, []);
    })
}


const FileAReport = () => {

//set previewPhoto
const [previewPhoto, setPreviewPhoto] = useState("");
console.log("this is preview photo : " +previewPhoto)
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPhoto(imageUrl);
    }
  };


    return <div className="fileAReport_main_div">
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
                        <label name="lost_cat_pic">Please upload a picture of your lost cat : </label>
                        <input type="file" id="file-upload" name="lost_cat_pic" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                        
                    </div>
                    <div>
                        <button type="submit" >submit form</button>
                    </div>
                </form>
            </main>
        </div>

        <div className="right_side_div">
            <p>this is the preview side</p>
            <img src={previewPhoto} alt="Preview Uploaded Image" id="file-preview" className="lost_cat_pic"></img>
        </div>
        
    </div>
}

export default FileAReport