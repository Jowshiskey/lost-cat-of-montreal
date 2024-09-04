const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

// Saving the Database/Collection names as constants so there's less risk of typos later
const DB = "LostCat";
const REPORT = "report";
const USERS = "users"



const getAllReport = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect(); 
        const db = client.db(DB);
        const allReports = await db.collection(REPORT).find().toArray();

        if (allReports.length === 0) {
            res.status(404).json({ status: 404, message: "Report not found." });
        }
        else {
            res.status(200).json({ status: 200, data : allReports});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const getUserReport = async (req,res) => {
    const email = req.params.email; 
    const query = { profileEmail : email };
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect(); 
        const db = client.db(DB);
        const userReports = await db.collection(REPORT).find(query).toArray();

        if (userReports.length === 0) {
            res.status(404).json({ status: 404, message: "Report not found." });
        }
        else {
            res.status(200).json({ status: 200, data : userReports});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
}

const addFileReport = async (req, res) => {
    const { _id,
        posterStatus,
        catName ,
        catColor,
        catImage,
        lastTimeSeen,
        whereLastSeen,
        catGender,
        catMicroship,
        catAddInfo,
        reward,
        escapeDay,
        profileName,
        profilePhoneNumber,
        profileEmail } = req.body;
    console.log(req);
    const client = new MongoClient(MONGO_URI);

    // if (!reportInfo) {
    //     res.status(400).json({ status: 400, message: `there is no information to complete the report` });
    //     return;
    // }
    try {
        await client.connect();
        const db = client.db(DB);
        await db.collection(REPORT).insertOne({ _id,
            posterStatus,
            catName ,
            catColor,
            catImage,
            lastTimeSeen,
            whereLastSeen,
            catGender,
            catMicroship,
            catAddInfo,
            reward,
            escapeDay,
            profileName,
            profilePhoneNumber,
            profileEmail });
        res.status(201).json({ status: 201, message: `Successfully added report`});

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
}

const addOneUser = async (req, res) => {
    
    const { _id, name, phone, email, password} = req.body;
    console.log(req);
    const client = new MongoClient(MONGO_URI);
    
    try {
        await client.connect();
        const db = client.db(DB);
        const userFound = await db.collection(USERS).findOne({ email : email });
        // If no user were found
        // console.log(userFound);
        if (!userFound) {
            console.log("valid email");
            await db.collection(USERS).insertOne( { _id, name, phone, email, password } );
            res.status(201).json({ status: 201, message: "user has been add to the users list" });
        }
        else {
            console.log("Invalid email, email already took")
            res.status(404).json({ status: 404, message: "User can't sign-up because already in database" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const loginUser = async (req, res) => {
    
    const { _id, email, password } = req.body;
    console.log(req);
    const client = new MongoClient(MONGO_URI);
    
    try {
        await client.connect();
        const db = client.db(DB);
        const userFound = await db.collection(USERS).findOne({ email : email });
        // If no user were found
        // console.log(userFound);
        if (userFound) {
            console.log("user is found");
            if(userFound.password === password){
                console.log("user password is valid");
                res.status(200).json({ status: 200, _id:userFound._id, email, phone:userFound.phone, name:userFound.name, message: "user is found and password is valid" });
            } else {
                console.log("password is not valid.")
                res.status(404).json({ status: 404, message: "Email/username is not in database" });
            }
        } else {
            console.log("username not found")
            res.status(404).json({ status: 404, message: "Email/username is not in database" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const deleteOneUser = async (req, res) => {
    const userEmail = req.params.email;
    const userId = req.params.id;
    const queryID = { _id : userId };
    const queryEMAIL = { profileEmail : userEmail };
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        await db.collection(USERS).deleteOne(queryID);
        await db.collection(REPORT).deleteMany(queryEMAIL);
        
        res.status(200).json({ message: 'User removed' });
        // } else {
        //     res.status(404).json({ message: 'User not Found' });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};

const deleteUserReport = async (req, res) => {
    
    const ReportId = req.params.id;
    const query = { _id : ReportId };
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        
        // Update the user's cart by removing the item with a specified ID
        const result = await db.collection(REPORT).deleteOne(query);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Report removed' });
        } else {
            res.status(404).json({ message: 'No Report match this reportID' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};

const updateProfileName = async (req, res) => {
    
    const profileOldName = req.params.old;
    const profileNewName = req.params.new;
    const query = { name : profileOldName };
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        
        // Update the user's cart by removing the item with a specified ID
        const result = await db.collection(USERS).updateOne(query, { $set : { name : profileNewName }});
        if (result.modifiedCount > 0) {
            res.status(200).json({  status : 200,message: 'Name update' });
        } else {
            res.status(404).json({  status : 404,message: 'No user with that name' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({  status : 500,message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};

const updateProfileEmail = async (req, res) => {
    
    const profileOldEmail = req.params.old;
    const profileNewEmail = req.params.new;
    const query = { email : profileOldEmail };
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        
        // Update the user's cart by removing the item with a specified ID
        const result = await db.collection(USERS).updateOne(query, { $set : { email : profileNewEmail }});
        if (result.modifiedCount > 0) {
            res.status(200).json({ status : 200, message: 'email Address update' });
        } else {
            res.status(404).json({ status : 404, message: 'No user with that email Address' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({  status : 500 , message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};

const updateProfilePhoneNumber = async (req, res) => {
    
    const profileOldPhone = req.params.old;
    const profileNewPhone = req.params.new;
    const query = { phone : profileOldPhone };
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        
        // Update the user's cart by removing the item with a specified ID
        const result = await db.collection(USERS).updateOne(query, { $set : { phone : profileNewPhone }});
        if (result.modifiedCount > 0) {
            res.status(200).json({  status : 200, message: 'Phone Number updated' });
        } else {
            res.status(404).json({  status : 404, message: 'No user with that Phone Number' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({  status : 500,message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};

// const updatePassword = async (req, res) => {
    
//     const passwordInfo = req.body.passwordInfo;
//     const query = { password : passwordInfo.password1 };
//     const client = new MongoClient(MONGO_URI);

//     try {
//         await client.connect();
//         const db = client.db(DB);
        
//         // Update the user's cart by removing the item with a specified ID
//         const result = await db.collection(USERS).updateOne(query, { $set : { password : passwordInfo.password2 }});
//         if (result.modifiedCount > 0) {
//             res.status(200).json({  status : 200, message: 'Password updated' });
//         } else {
//             res.status(404).json({  status : 404, message: 'No user with that password' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({  status : 500,message: 'Internal Server Error' });
//     } finally {
//         await client.close();
//     }
// };

const updatePosterStatus = async (req, res) => {
    
    const id = req.params.id;
    const posterStatusValue = req.params.status;
    const query = { _id : id };
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DB);
        
        // Update the user's cart by removing the item with a specified ID
        const result = await db.collection(REPORT).updateOne(query, { $set : { posterStatus : posterStatusValue }});
        if (result.modifiedCount > 0) {
            res.status(200).json({  status : 200, message: 'Poster Status updated' });
        } else {
            res.status(404).json({  status : 404, message: 'No poster with that email' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({  status : 500,message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
};
// UPDATE THIS IF YOU ADD/REMOVE A HANDLER FUNCTION
module.exports = {
    getAllReport,
    addFileReport,
    addOneUser,
    loginUser,
    getUserReport,
    deleteOneUser,
    deleteUserReport,
    updateProfileName,
    updateProfileEmail,
    updateProfilePhoneNumber,
    updatePosterStatus,
    // updatePassword
};