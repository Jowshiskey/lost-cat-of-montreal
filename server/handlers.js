const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// Saving the Database/Collection names as constants so there's less risk of typos later
const DB = "LostCat";
const report = "report";


const getAllReport = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect(); 
        const db = client.db(DB);
        const catInfo = await db.collection(report).find().toArray();

        if (catInfo.length === 0) {
            res.status(404).json({ status: 404, message: "Report not found." });
        }
        else {
            res.status(200).json({ status: 200, data : catInfo});
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
    getAllReport
};