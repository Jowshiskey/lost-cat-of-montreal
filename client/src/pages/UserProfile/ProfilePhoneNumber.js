import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useEffect} from "react";
import { UserContext } from "../../Context/UserContext";



const ProfilePhoneNumber =()=>{

const {user, setUser } = React.useContext(UserContext);
// update profile  PHONE info
const [updatePhoneToggle,setUpdatePhoneToggle]=useState(false)
const [updatePhoneState,setUpdatePhoneState]=useState("idle")
const [updatePhone,setUpdatePhone]=useState(null)

const handleUpdateProfilePhone=()=>{
    setUpdatePhoneState("processing");
    console.log(user.phone, updatePhone);
}
useEffect(() => {
    if(updatePhoneState==="processing"){
    fetch("/profilePhoneUpdate/" + user.phone +"/"+ updatePhone, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((parsed) => {
            if(parsed.status === 200){
                console.log(parsed.data);
                setUpdatePhoneState("updated");
            } else {
                console.log(parsed.message)
                setUpdatePhoneState("failed");
            }
        }, []);
    }
});
return (
    <div className="user_profile_main_div">
        <h2 className="h2text">Phone Number</h2>
            <p className="text">Phone Number to reach you. This phone number will be public and appear on poster you create.</p>
            <label></label>
            <input className="profile_input" type="text" name="userProfilePhoneNumber" placeholder="xxx xxx-xxxx" defaultValue={user.phone} onChange={(e=>{setUpdatePhone(e.target.value), setUpdatePhoneToggle(true)})}></input>
    {updatePhoneToggle &&<button className="update_btn" onClick={handleUpdateProfilePhone}>Update Profile Phone Number</button> }   
    {updatePhoneState==="updated" && <p className="text" style={{color:"lime"}}>Phone Number is Successfully UPDATED</p> }
    {updatePhoneState==="failed" && <p className="text" style={{color:"red"}}>Phone Number coulden't be updated FAILED</p> }
</div>
)
};
export default ProfilePhoneNumber;

