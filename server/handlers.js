const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// Saving the Database/Collection names as constants so there's less risk of typos later
const DB = "LostCat";
const report = "report";
const users = "users"


const getAllReport = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect(); 
        const db = client.db(DB);
        const allReports = await db.collection(report).find().toArray();

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
        const userReports = await db.collection(report).find(query).toArray();

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
        catName ,
        catColor,
        catImage,
        lastTimeSeen,
        whereLastSeen,
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
        await db.collection(report).insertOne({ _id,
            catName ,
            catColor,
            catImage,
            lastTimeSeen,
            whereLastSeen,
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
        const userFound = await db.collection(users).findOne({ email : email });
        // If no user were found
        // console.log(userFound);
        if (!userFound) {
            console.log("valid email");
            await db.collection(users).insertOne( { _id, name, phone, email, password } );
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
        const userFound = await db.collection(users).findOne({ email : email });
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

// UPDATE THIS IF YOU ADD/REMOVE A HANDLER FUNCTION
module.exports = {
    getAllReport,
    addFileReport,
    addOneUser,
    loginUser,
    getUserReport,
};