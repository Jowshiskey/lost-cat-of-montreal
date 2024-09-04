import { NavLink, useNavigate} from "react-router-dom";
import React, { useState, useEffect} from "react";
import { UserContext } from "../../Context/UserContext";
import { LogInContext } from "../../Context/LogInContext";


const DeleteAccount =()=>{

const {user, setUser } = React.useContext(UserContext);
const { setLoginStep } = React.useContext(LogInContext);

//Delete account
    const [deleteAccountToggle,setDeleteAccountToggle]=useState(false)
    const [deleteAccountState,setDeleteAccountState]=useState(false)
    const handleDeleteAccount=()=>{
        setDeleteAccountState(true)
    }
    useEffect(() => {
        if(deleteAccountState){
        fetch("/deleteAccount/" + user._id +"/"+ user.email, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200){
                    console.log(parsed.data);
                    setLoginStep("enterCred");
                    setUser(null);
                    setDeleteAccountState(false);
                } else {
                    console.log(parsed.message)
                    setUser(null);
                    setDeleteAccountState(false);
                }
            }, []);
        }
    });

return (
    <div className="user_profile_main_div">
        {deleteAccountToggle ? 
            <div className="delete_account_div">
                <p className="text" style={{color:"red"}}>This action is irreverseble all your poster will be delete as well as this account</p>
                <button className="delete_acc_btn" style={{backgroundColor:"red"}} onClick={handleDeleteAccount}> ConfirmDelete Account</button>
            </div>
            :
            <button className="delete_acc_btn" onClick={(e=>{setDeleteAccountToggle(true)})} style={{bottom:1}}>Delete Account</button>
        }
    </div>
)
};
export default DeleteAccount;

