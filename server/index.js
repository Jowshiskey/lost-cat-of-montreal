// Create your server here...
const express = require("express");
const morgan = require("morgan"); //helps with responses in console

const PORT = 8102;

const { getAllReport } = require("./handlers");

const app = express();

app.use(express.json());
app.use(morgan("tiny")); //gives it a certain look in the console

//route for getting things
app.get("/report",  getAllReport );


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