const showForecast = () => {
    const city = document.getElementById("inputCity").value;
    const zipcode = document.getElementById("inputZip").value;
    const countryCode = document.getElementById("inputCountry").value;
    console.log(city);
    console.log(zipcode);
    console.log(countryCode);
    

    if(city == '' || (zipcode == '' || countryCode == '--select--')) {
        document.getElementById("error").innerHTML = "Please provide the specific info";
        document.getElementById("showForecast").style.display = "block";
        document.getElementById("loadingButton").style.display = "none";
        document.getElementById("forecast").style.display = "none";
        document.getElementById("dataNotFoundDiv").style.display = "none";
    } else {
        document.getElementById("error").innerHTML = "";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                document.getElementById("showForecast").style.display = "block";
                document.getElementById("loadingButton").style.display = "none";
                document.getElementById('forecast').style.display = "block";
                document.getElementById("dataNotFoundDiv").style.display = "none";

                const data = JSON.parse(this.responseText);

                document.getElementById('long').innerHTML = "Longitude: " + data.coord.lon;
                document.getElementById('lat').innerHTML = "Latitude: " + data.coord.lat;
                document.getElementById("name").innerHTML = "<b>"+data.name+"</b>";
                document.getElementById("country").innerHTML = "Country code: "+data.sys.country;
                document.getElementById("visibility-0").innerHTML = "Overall: "+data.weather[0].main;
                document.getElementById("visibility-1").innerHTML = "Description: "+data.weather[0].description;
                document.getElementById("visibility-2").innerHTML = "Visibility: "+data.visibility;
                document.getElementById("details-0").innerHTML = "Temperature: "+data.main.temp;
                document.getElementById("details-1").innerHTML = "Feels like: "+data.main.feels_like;
                document.getElementById("details-2").innerHTML = "Minimum temperature: "+data.main.temp_min;
                document.getElementById("details-3").innerHTML = "Maximum temperature: "+data.main.temp_max;
                document.getElementById("details-4").innerHTML = "Pressure: "+data.main.pressure;
                document.getElementById("details-5").innerHTML = "Humidity: "+data.main.humidity;
             

            } else if (this.readyState == 4 && this.status == 404) {
                document.getElementById("showForecast").style.display = "block";
                document.getElementById("loadingButton").style.display = "none";
                document.getElementById("forecast").style.display = "none";
                document.getElementById("dataNotFoundDiv").style.display = "block"
                document.getElementById('dataNotFound').innerHTML = `<div class="alert alert-danger">
                                                                        Data not found </div>`;
            } else if (this.readyState == 1 || this.readyState == 3) {
                document.getElementById("showForecast").style.display = "none";
                document.getElementById("loadingButton").style.display = "block";
            } else {
                //Technical issue
            }
        };
        xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q="+city+"&zip="+zipcode+","+countryCode+"&appid=2f1ccdbed4ba374f8a8ede5ee7fd0571", true);
        xhttp.send();

    }

    
}