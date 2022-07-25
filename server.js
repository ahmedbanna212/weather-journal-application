let projectData = {

};

const port = 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));






app.post("/add",(req,res)=>{
    projectData = {
        date: req.body.date,
        feel: req.body.feel,
        temp: req.body.temp
    }
})

app.get("/all",(req,res)=>{
    res.send(projectData);
})



// Setup Server
app.listen(port,()=>{
    try{
        console.log(`server is running on port ${port}`);
    }catch(err){
        console.log(err);
    }
})