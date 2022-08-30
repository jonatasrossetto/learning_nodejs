const express = require("express"); 
const app = express(); 
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    console.log('Post request received!!');
    console.log(req.body.cityName);

    let query = req.body.cityName;
    const apiKey = "a18405847b50cfbc21ce2af453ff4f46";
    let unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units='+unit;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data) {
            console.log(data);
            console.log('---------------');
            process.stdout.write(data);
            console.log('---------------');
            weatherData = JSON.parse(data);
            console.log(weatherData);
            console.log('---------------');
            console.log('Temperatura: '+ weatherData.main.temp);
            console.log('Cidade: '+ weatherData.name);
            console.log('descrição: '+weatherData.weather[0].description);
            console.log('icon: '+weatherData.weather[0].icon);
            let iconUrl = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<h1>The Temperature in "+weatherData.name+" is "+weatherData.main.temp+ " degrees Celsius</h1>");
            res.write("The weather is currently "+weatherData.weather[0].description+"<br>");
            res.write('<img src="'+iconUrl+'" alt="">');
            res.send();
        });
    });
})





app.listen(3000, function(){
    console.log("The simple weather viewer server is running on port 3000!!");
})