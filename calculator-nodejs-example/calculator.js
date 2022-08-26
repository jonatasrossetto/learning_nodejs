const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    console.log(req);
    // res.send('The calculator server is running, some update');
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body);
    console.log(typeof(req.body));
    console.log(req.body.number1);
    console.log(typeof(req.body.number1));
    console.log(req.body.number2);
    let n1 = Number(req.body.number1);
    let n2 = Number(req.body.number2);
    let sum = n1+n2;

    res.send("Hi, thanks for filling the numbers, the result of the sum is: "+sum);
})

app.listen(3000, function(){
    console.log('Server started on port 3000');
});