// Create your server here...
const express = require("express");
const morgan = require("morgan"); //helps with responses in console

const PORT = 8102;

const { getAllReport,addFileReport,addOneUser,
        loginUser,getUserReport, deleteOneUser, deleteUserReport, 
        updateProfileEmail, updateProfileName, updateProfilePhoneNumber, updatePosterStatus,
        // updatePassword 
      } = require("./handlers");

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.use(express.json());
app.use(morgan("tiny")); //gives it a certain look in the console

//route for getting reports
app.get("/report",  getAllReport );
app.get("/getUserReport/:email",  getUserReport );

//route to add user sign-up
app.post("/addNewUser", addOneUser);
//route to validate user login
app.post("/user", loginUser);
//route to add new reports
app.post("/addFileReport", addFileReport);

//route to delete user reports
app.delete("/deleteUserReport/:id", deleteUserReport);
//route to delete user account
app.delete("/deleteAccount/:id/:email", deleteOneUser);

//route to password change
// app.patch("/profilePasswordUpdate", updatePassword);
//route to profile Name change
app.patch("/profileNameUpdate/:old/:new", updateProfileName);
//route to profile Email change
app.patch("/profileEmailUpdate/:old/:new", updateProfileEmail);
//route to profile Phone Number change
app.patch("/profilePhoneUpdate/:old/:new", updateProfilePhoneNumber);
//route to profile Phone Number change
app.patch("/profilePosterStatusUpdate/:id/:status", updatePosterStatus);

//route to catch everything else
app.use("*", (req, res) => {
    console.log(req);
      res
        .status(404)
        .json({
          status: 404,
          message: "This isn't the endpoint you're looking for!",
        });
    });
    
    app.listen(PORT, () => {
      console.log("Server listening on port ", PORT);
    });