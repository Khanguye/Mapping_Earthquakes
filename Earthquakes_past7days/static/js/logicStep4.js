// {
//   type: "Feature",
//   properties: {
//   mag: 1.4,
//   place: "20km NNE of Badger, Alaska",
//   time: 1586217868199,
//   updated: 1586218095363,
//   tz: -540,
//   url: "https://earthquake.usgs.gov/earthquakes/eventpage/ak0204i2oxfn",
//   detail: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak0204i2oxfn.geojson",
//   felt: null,
//   cdi: null,
//   mmi: null,
//   alert: null,
//   status: "automatic",
//   tsunami: 0,
//   sig: 30,
//   net: "ak",
//   code: "0204i2oxfn",
//   ids: ",ak0204i2oxfn,",
//   sources: ",ak,",
//   types: ",geoserve,origin,",
//   nst: null,
//   dmin: null,
//   rms: 0.47,
//   gap: null,
//   magType: "ml",
//   type: "earthquake",
//   title: "M 1.4 - 20km NNE of Badger, Alaska"
//   },
//   geometry: {
//   type: "Point",
//   coordinates: [
//   -147.3214,
//   64.9586,
//   1.1
//   ]
//   },
//   id: "ak0204i2oxfn"
//   }

// Accessing the 7 days earthquake GeoJSON URL
let earthquake7dData ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

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
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}
//#####################################################################################################################

// create the street layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets
};

// Pass our map layers into our layers control and add the layers control to the map.
//L.control.layers(baseMaps).addTo(map);

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Grabbing our GeoJSON data.
d3.json(earthquake7dData).then(function(data){
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng)
      },
    style:styleInfo
  })
  .bindPopup(function(layer){
      return `<h2> Magnitude:${layer.feature.properties.mag}</h2><hr><h4>Location: ${layer.feature.properties.place}</h4>`;
  }).addTo(earthquakes);

  earthquakes.addTo(map);
});

