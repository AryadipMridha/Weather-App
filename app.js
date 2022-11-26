var http = require('http');
const express=require("express");
const https= require("https");
const { features } = require('process');
const { query } = require('express');
const bodyParser = require('body-parser');


const app=express();
const port=process.env.PORT || 3000 

app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req, res) {
    res.sendFile(__dirname+"/index.html");    
    app.use(express.static(__dirname + '/public'));
});

app.post("/",function(req,res){
    const query=req.body.cityName
    console.log(query);
    const apiKey="f93c9f0453f7677270c02b8facd52804"
    const unit="metric"
    const format="json"
    const url="http://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey+"&mode="+format+"";
  

    http.get(url,function(response){
        console.log("Status code is "+response.statusCode);
       
        response.on("data",function(data){
            /*console.log(data);*/          //returns as HEX
            /*console.log(JSON.parse(data))*/   //parsed as JSON
            const weatherData=JSON.parse(data);

            const windSpeed=weatherData.wind.speed
            const weatherDesc=weatherData.weather[0].description
            const temp=weatherData.main.temp
            const feels=weatherData.main.feels_like
            const icon=weatherData.weather[0].icon
           
            const imgUrl= "http://openweathermap.org/img/w/" + icon + ".png";
           
           
           res.write("<html>")
            res.write("The temparature of "+query+" is " +temp+ " degrees Celsius.")
            res.write("<p>The weather Description of "+query+" is " +weatherDesc+"</p>")
            res.write("<p>The feels like temparature of "+query+" is " +feels+ " degrees Celsius.</p>")
            res.write("<p>The wind speed of "+query+" is " +windSpeed+ " metres per seconds.</p>")
            
           
            res.write("<p><img src="+imgUrl+"><p>");
            res.write("</html>")
           
            res.send()

        })

    })

    
});

app.listen (port,()=>{
    console.log("Listeneing to port "+port);
})





