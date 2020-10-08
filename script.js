
$("#searchBtn").click(function () {

    //This is our input variable
    var userInput = $("#userInputCity").val();

    //This is to get the current date
    var fullDate = new Date();console.log(fullDate);

    var twoDigitMonth = fullDate.getMonth()+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;

    var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;

    var currentDate = twoDigitMonth + "/" + twoDigitDate + "/" + fullDate.getFullYear();console.log(currentDate);

    //Forecast Icon /URL
    //var forecastIcon = 
    
    // This is our API key
    var APIKey = "d74cc4a76e70093d75fd423bfd5183ce";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + userInput + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $("#cityRow").html("<h4>" + response.name + " " + currentDate + "</h4>" + " <img src= http://openweathermap.org/img/wn/" + response.weather.icon + "@2x.png>");
            $("#windSpeedRow").text("Wind Speed: " + response.wind.speed);
            $("#humidityRow").text("Humidity: " + response.main.humidity);
                // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                // add temp content to html
            $("#tempRow").text("Temperature: " + tempF.toFixed(2) + " (F)");

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + tempF);
            console.log("Icon: " + response.weather.icon);
        });
});