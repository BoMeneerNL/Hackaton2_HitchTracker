mapboxgl.accessToken = "%Token%";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [5.869138, 51.826884],
  zoom: 15
});

// DIRECTIONS SUMMARY
const route = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  profile: 'mapbox/driving',
  startLocation: '5.725, 51.80917',
});

map.addControl(route, 'top-left');

route.on("route", (e) => {
  console.log(e)
})
document.getElementById("mapbox-directions-profile-driving").remove();
document.getElementById("mapbox-directions-profile-walking").remove();
document.getElementById("mapbox-directions-profile-cycling").remove();
