var xmlhttp;
var weatherURL;

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init(); // comment out when running on device
};

function init() {  
    var location = "Lethbridge,ca";
    weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weather();
}

function weather() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', weatherURL, true); //this changes the state of xmlhttp
    xmlhttp.send();
    xmlhttp.onreadystatechange = getWeather;
}

function getWeather() { // when readystate changes
        
    //check to see if the client -4 and server -200 is ready
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var json = JSON.parse(xmlhttp.responseText);
        setCurrentIcon(json.weather[0].id);
        function Forcast(Temp, Descrip, Wind, Max, Min, Humid) {          
            document.getElementById("temp").innerHTML = Math.round(Temp);
            document.getElementById("description").innerHTML = Descrip;
            document.getElementById("mintemp").innerHTML = Min; //Not sure Min and Max work for Lethbridge
            document.getElementById("maxtemp").innerHTML = Max; // Seems to return the same as current temp
            document.getElementById("wind").innerHTML = Wind;
            document.getElementById("humidity").innerHTML = Humid;
        }

        var current = new Forcast(json.main.temp, json.weather[0].description, json.wind.speed, json.main.temp_max, json.main.temp_min, json.main.humidity );

        console.log("all info received from server");

    } else {
        console.log("no dice");
    }
}

function setCurrentIcon(code) {
    let className;
    switch (String(code)[0]) {
        case "2": className = "wi wi-day-thunderstorm curTempIcon"; break;
        case "3": className = "wi wi-day-sprinkle curTempIcon"; break;
        case "5": className = "wi wi-day-rain curTempIcon"; break;
        case "6": className = "wi wi-day-snow"; break;
        case "7": className = "wi wi-day-fog"; break;
        case "8": 
            if (code == 800) { 
                className = "wi wi-day-sunny";
            } else {
                className = "wi wi-day-cloudy";
            }; break;
        default: className = "wi wi-day-cloudy";
    }

    document.getElementById("curTempIcon").className = className;
}
