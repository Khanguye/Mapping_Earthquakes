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
// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets
};

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid',{
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Grabbing our GeoJSON data.
d3.json(earthquake7dData).then(function(data){
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data)
  .bindPopup(function(layer){
      return `<h2> Magnitude:${layer.feature.properties.mag}</h2><hr><h4>Location: ${layer.feature.properties.place}</h4>`;
  }).addTo(map);
});

