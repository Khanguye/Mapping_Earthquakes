// // Add console.log to check to see if our code is working.
// console.log("working");
// //###############################################################//
// // Create the map object with a center and zoom level.
// //[latitude, longtitude] level of “4” on a scale 0–18
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// /*//An alternativew way
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   }); */
// //###############################################################//
// // We create the tile layer that will be the background of our map.
// /*
// mapbox.streets
// mapbox.light
// mapbox.dark
// mapbox.satellite
// mapbox.streets-satellite
// mapbox.wheatpaste
// mapbox.streets-basic
// mapbox.comic
// mapbox.outdoors
// mapbox.run-bike-hike
// mapbox.pirates
// mapbox.emerald
// mapbox.high-contrast
//  */
// // let streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// // attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// // 	maxZoom: 18,
// // 	id: 'mapbox.streets',
// // 	accessToken: API_KEY
// // });
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });
// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// //  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);



//#####################################################################################################################
// create the map object with a center and zoom level.
let map = L.map("mapid").setView([34.0522,-118.2437],14);
// create the street layer
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });
// Then we add our 'streetlayer' tile layer to the map.
//streets.addTo(map);

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then we add our 'darklayer' tile layer to the map.
dark.addTo(map);

// Add a marker circle to the map for Los Angeles, Califorina
//L.circle([34.0522,-118.2437],{ radius:100}).addTo(map);

L.circleMarker([34.0522,-118.2437],{ 
  radius:300,
  color:"black",
  fillColor:"#ffffa1"
}).addTo(map);

// Add a marker circle to the map for Los Angeles, Califorina
//L.circle([34.052,-118.235],{ radius:500, fillColor:"yellow",fillOpacity:0.5,color:"black"}).addTo(map);

