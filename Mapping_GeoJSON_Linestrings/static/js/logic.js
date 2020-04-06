// {
//   type: "Feature",
//   properties: {
//   airline: "9W",
//   airline_id: "3000",
//   src: "YYZ",
//   src_id: "193",
//   dst: "BRU",
//   dst_id: "302",
//   codeshare: "",
//   stops: "0",
//   equipment: "332 333"
//   },
//   geometry: {
//   type: "LineString",
//   coordinates: [
//   [
//   -79.63059997559999,
//   43.6772003174
//   ],
//   [
//   4.48443984985,
//   50.901401519800004
//   ]
//   ]
//   }
//   }

// Accessing the airport GeoJSON URL
let torontoData ="https://raw.githubusercontent.com/Khanguye/Mapping_Earthquakes/master/torontoRoutes.json"

//#####################################################################################################################

// create the street layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Outdoors: outdoors,
  Light:light,
  Dark: dark,
  Satellite: satellite,
  SatelliteStreets: satelliteStreets
};

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
  center: [44.0, -80.0],
  zoom: 4,
  layers: [light]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data){
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
    color: "lightyellow",
    weight: 2
  })
  .bindPopup(function(layer){
      return `<h2>Airline: ${layer.feature.properties.airline}</h2><hr><p>Destination:${layer.feature.properties.dst}</p>`;
  }).addTo(map);
});

