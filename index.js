const express = require("express");

const https = require("https");

const bodyparser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({
    extended: true
}))



app.get("/", function (req, res) {
    res.render("pages/index", {
        currentweather: "--",
        location : "--",
        desc: "--"
      });
})

app.post("/", function (req, res) {

    const query = req.body.cityName;

    const apiKey = "6a745c09c04b05edc1cb0b4ca81b25b4";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey;

    https.get(url, function (response) {
        console.log("status code is  " + response.statusCode);


        if (response.statusCode == 404) {
            console.log("*******city not found******");
            res.render("pages/index", {
                currentweather: "City not found",
                location : " --",
                desc: " --"
              });
        } else {

            response.on("data", function(data) {

                const weatherData = JSON.parse(data)

                const temp = weatherData.main.temp

                //console.log("temp" +temp);

                const cityl = weatherData.name
                console.log(cityl);
                

                //this below file is does not exist, change your custom png
                //const iconurl = "http://openweathermap.org/img/wn/" + icon + "@5x.png";

                const weatherdescription = weatherData.weather[0].description
                console.log(weatherdescription);


                res.render("pages/index", {
                    currentweather: temp,
                    location : cityl,
                    desc: weatherdescription
                  });
                //res.sendFile("D:/Wether Api Project/index.html");

//

            })
        }
    });
})

app.listen(3000, function () {
    console.log("Server started succesfully");
})
