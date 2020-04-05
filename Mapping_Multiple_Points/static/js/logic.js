// Get data from cities.js
let cityData = cities;

//#####################################################################################################################
// create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);
// create the street layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then we add our 'streetlayer' tile layer to the map.
streets.addTo(map);

cityData.forEach( city => {
    console.log(city);
    // Add a marker to the map
    L.circleMarker(city.location,
      {
        radius: city.population/100000
      })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
}
);

//###########################
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
//###########################
// // Add a marker circle to the map for Los Angeles, Califorina
// L.circleMarker([34.0522,-118.2437],{ 
//   radius:300,
//   color:"black",
//   fillColor:"#ffffa1"
// }).addTo(map);


