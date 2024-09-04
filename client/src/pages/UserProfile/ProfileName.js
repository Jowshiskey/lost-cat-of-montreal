import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useEffect} from "react";
import { UserContext } from "../../Context/UserContext";



const ProfileName =()=>{

const {user, setUser } = React.useContext(UserContext);
    
// update profile NAME info
    const [updateNameState,setUpdateNameState]=useState("idle")
    const [updateName,setUpdateName]=useState(null)

    const handleUpdateProfileName=()=>{
        setUpdateNameState("processing");
        // console.log(user.name, updateName);
    }
    useEffect(() => {
        if(updateNameState==="processing"){
        fetch("/profileNameUpdate/" + user.name +"/"+ updateName, {
            method: "PATCH",
        })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    console.log(parsed.data);
                    setUpdateNameState("updated");
                } else {
                    console.log(parsed.message)
                    // setUser(null);
                    setUpdateNameState("failed");
                }
            }, []);
        }
    });

return (
    <div className="user_profile_main_div">
            <h2 className="h2text">Screen Name</h2>
            <p className="text">Your public profile name. This name will appear on poster and comment you create.</p>
            <label></label>
            <input className="profile_input" type="text" name="userProfileName" defaultValue={user.name} onChange={(e=>{setUpdateName(e.target.value), setUpdateNameState("changed")})}></input>
        {updateNameState==="changed" && <button className="update_btn" onClick={handleUpdateProfileName}>Update Profile Screen Name</button> }
        {updateNameState==="updated" && <p className="text" style={{color:"lime"}}>Profile Name is Successfully UPDATED</p> }
        {updateNameState==="failed" && <p className="text" style={{color:"red"}}>Profile Name coulden't be updated FAILED</p> }
</div>
)
};
export default ProfileName;

