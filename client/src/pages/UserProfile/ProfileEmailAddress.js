import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useEffect} from "react";
import { UserContext } from "../../Context/UserContext";



const ProfileEmailAddress =()=>{

const {user, setUser } = React.useContext(UserContext);
// update profile  PHONE info
// update profile  EMAIL info
const [updateEmailState,setUpdateEmailState]=useState("idle")
const [updateEmail,setUpdateEmail]=useState(null)

const handleUpdateProfileEmail=()=>{
    setUpdateEmailState("processing");
    console.log(user.email, updateEmail);
}
useEffect(() => {
    if(updateEmailState==="processing"){
    fetch("/profileEmailUpdate/" + user.email +"/"+ updateEmail, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((parsed) => {
            if(parsed.status === 200){
                console.log(parsed.data);
                setUpdateEmailState("updated");
            } else {
                console.log(parsed.message)
                setUpdateEmailState("failed");
            }
        }, []);
    }
});

return (
    <div className="user_profile_main_div">
        <h2 className="h2text">Notification Email</h2>
            <p className="text">The email address where you want to receive account-related notifications such as Alerts.</p>
            <label></label>
            <input  className="profile_input" type="email" name="userProfileEmail" defaultValue={user.email} onChange={(e=>{setUpdateEmail(e.target.value), setUpdateEmailState("changed")})}></input>
        {updateEmailState==="changed" && <button className="update_btn" onClick={handleUpdateProfileEmail}>Update Profile Email Address</button> }
        {updateEmailState==="updated" && <p className="text" style={{color:"lime"}}>Email Address is Successfully UPDATED</p> }
        {updateEmailState==="failed" && <p className="text" style={{color:"red"}}>Email Address coulden't be updated FAILED</p> }
</div>
)
};
export default ProfileEmailAddress;

