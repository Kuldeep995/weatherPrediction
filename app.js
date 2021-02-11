const express= require("express");
const app= express();
const https= require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){

   res.sendFile(__dirname + "/index.html");

  })

app.post("/", function(req, res){


  var city=req.body.cityName;
  var url="https://api.openweathermap.org/data/2.5/weather?q="+ city + "&APPID=68ffe1e3b17b207302b7de79a6899622&units=metric";
    https.get(url, function(response){


      response.on("data", function(data){
        const dat = JSON.parse(data);
        var temp=dat.main.temp;
        var desc=dat.weather[0].description;
        var imgurl="http://openweathermap.org/img/wn/" + dat.weather[0].icon+"@2x.png";

        res.write("<h1>The temperature in " + city + " is " + temp + "</h1>");
        res.write("<h3>The weather condition is " + desc + "</h3>");
        res.write("<img src="+imgurl+">");
        res.send();

      })



})
})

app.listen(3000, function(req, res){
  console.log("listening");
})
