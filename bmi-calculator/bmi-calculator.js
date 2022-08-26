const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    // console.log("BMI Calculator is running on the server side");
    res.sendFile(__dirname+'/index.html');
})

app.post("/",function(req,res){
    console.log(req.body);
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    let bmi = weight / (height**2);
    res.send("Your bmi is: "+bmi);
})


app.listen(3000, function(){
    console.log('Server started on port 3000');
});