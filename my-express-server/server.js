
const express = require ('express');
const app = express();
app.get("/",function(request, response){
    console.log(request);
    response.send('<h1>Hello, I am running</h1>');
});
app.get("/contact",function(request, response){
    response.send('<h1>Contact me at: jonatas.rossetto@gmail.com</h1>');
});
app.get("/about",function(request, response){
    response.send('Hi, my name is Jônatas and I am a software developer actually I live in Salvador, Brazil');
    
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});
