/* script for local weather project */


function main() {

	if(!navigator.geolocation) {
		$(".unsupported").html("Geolocation is not supported by your browser");
		return;
	}


	var latitude = "";
	var longitude = "";
	navigator.geolocation.getCurrentPosition(function(position) {
		/* once positions are obtained, display them */
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		
		/* get the json data from open weater api */
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid=a34f936c8626d3f8f714ae8fc5b1d8db', function(json) {
	 		// show the icon first. 
	 		var iconCode = json['weather'][0]['icon'];
	 		var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
	 		$(".weather-data").append("<img src=" + iconUrl + ">");

	 		$(".title").append((json['name'])); // city name
	 		$(".weather-data").append("<p class='main'>Weather: " + json['weather'][0]['main'] + "<span class='popup description'>Description<br>" 
	 			+ json['weather'][0]['description'] + "</span></p>");
	 		
	 		//temperature //
	 		var temp = json['main']['temp']; // in kelvin
	 		var celsiusTemp = Math.round(temp - 273);

	 		$(".weather-data").append("<p class='temp'>" + celsiusTemp + " &deg;C</p>");
	 	});
	
	});
}


$(document).ready(function() {
	main();

	$(".change-temp").click(function() {
		//figure out if it is in celsius or fahrenheit
		var currentScale = $(".temp").html().slice(-1);
		console.log(currentScale);
		if (currentScale == 'C') {
			//get the numerical value of temperature.
			//pick everything before a space bar. 
			
			var temp = $(".temp").html().split(" ")[0];
			fahreheit = Math.round((temp * 5) / 9 + 32);
			$(".temp").html(fahreheit + " &deg;F");
			$(".change-temp").html("To &deg;C");
		}
		//change from fahreheit to celsius
		else if (currentScale == 'F') {
			//get the numerical value of temperature.
			//pick everything before a space bar. 
			
			var temp = $(".temp").html().split(" ")[0];
			celsius = Math.round(((temp -32) * 9 )/ 5);
			$(".temp").html(celsius + " &deg;C");
			$(".change-temp").html("To &deg;F");
		}
	});
});