// Get data from cities.js
let cityData = cities;

//#####################################################################################################################
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);
// create the street layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then we add our 'streetlayer' tile layer to the map.
streets.addTo(map);

// Coordinates for each point to be used in the polyline.
// let line = [
//   //LAX
//   [33.9416, -118.4085],
//   //JFK
//   [37.6213, -122.3790],
//   //SLC
//   [40.7899, -111.9791],
//   //SEA
//   [47.4502, -122.3088]
// ];

let line = [
 //JFK
 [37.6213, -122.3790],
//AUS
[29.4174547,-94.9982594],
//JFK
[40.6398262,-73.7787443],
//YYZ
[43.651070,-79.347015],
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "blue",
  dashArray:"10"
}).addTo(map);