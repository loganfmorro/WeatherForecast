
$("#searchBtn").click(function () {
    

    //This is our input variable
    var userInput = $("#userInputCity").val();

    //This is to get the current date
    var fullDate = new Date();console.log(fullDate);

    var twoDigitMonth = fullDate.getMonth()+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;

    var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;

    var currentDate = twoDigitMonth + "/" + twoDigitDate + "/" + fullDate.getFullYear();console.log(currentDate);

    //Forecast Icon /URL
    
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
                //City/Date/Symbol
            $("#cityRow").html("<h4>" + response.name + " " + currentDate + "</h4>" + " <img src= http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png>");
                //Wind Speed
            $("#windSpeedRow").text("Wind Speed: " + response.wind.speed);
                //Humidity
            $("#humidityRow").text("Humidity: " + response.main.humidity);

                // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                // add temp content to html
            $("#tempRow").text("Temperature: " + tempF.toFixed(2) + " (F)");

                // 5 day dates
            $("#dateHeader1").text(response.list.dt[1]);
            $("#dateHeader2").text(response.list.dt[2]);
            $("#dateHeader3").text(response.list.dt[3]);
            $("#dateHeader4").text(response.list.dt[4]);
            $("#dateHeader5").text(response.list.dt[5]);

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + tempF);
            console.log("Icon: " + response.weather.icon);
            console.log("Date: ") + response.list.dt;

        });
        //saving recent search
        localStorage.setItem("lastCity", userInput);

        var localStorageCities = JSON.parse(localStorage.getItem("lastCity"));

        for (let i = 0; i < localStorageCities.length; i++) {
            var ptag = document.createElement("p"); // Create a <p> node
            var textnode = document.createTextNode(localStorageTimes[i]); // Create a text node
            ptag.appendChild(textnode); // Append the text to p tag
            document.getElementById("recentCities").appendChild(ptag);
        }
});