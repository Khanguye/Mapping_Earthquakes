//https://www.mapbox.com/
//Get an account and get API key
//const API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

// Accessing Tectonic Plate GeoJSON URL
const tectonicPlateData ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Accessing the 7 days earthquake GeoJSON URL
const earthquake7dData ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

function styleLine(){
  return {
    color: "#F05E23",
    weight: 3
  };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  let colorIndex = Math.floor(magnitude) ;
  
  return colors[colorIndex>5 ? 5 : colorIndex];
  
}
//#####################################################################################################################

// create the street tiles
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// create the satellite streets tiles
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// create the light tiles
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
  center: [21.229567, -17.282230],
  zoom: 3,
  layers: [streets]
});

// Create a base tite layer (back-ground Map) that holds maps.
let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets,
  Light: light
};

// Create the earthquake layer (front-ground Map).
let earthquakes = new L.layerGroup();

// Create the tectonic plate layer (front-ground Map).
let tectonicPlates = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  "Tectonic Plates": tectonicPlates,
  Earthquakes: earthquakes
};

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
    '<i style="background:' + getColor(i) + '"></i> ' +
    magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
 }
  return div;
};

legend.addTo(map);
//########################################################################################

// Grabbing our GeoJSON data and load to front-ground layer

// eathquakes 7 days
d3.json(earthquake7dData).then(function(data){
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng)
      },
    style:styleInfo
  })
  .bindPopup(function(layer){
      return `Magnitude:${layer.feature.properties.mag}<br>Location: ${layer.feature.properties.place}`;
  }).addTo(earthquakes);

  earthquakes.addTo(map);
});

// Tectonic Plate
d3.json(tectonicPlateData).then(function(data){
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
    style: styleLine
  })
  .addTo(tectonicPlates);

  tectonicPlates.addTo(map);
});


