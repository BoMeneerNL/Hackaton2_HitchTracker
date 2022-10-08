mapboxgl.accessToken = "pk.eyJ1IjoiYm9tZW5lZXJubCIsImEiOiJjbDhzbnlmY2wwODBjM25zeTJsazhtZGV3In0.PiO2nPF0qeoOxgO41QxmTw";
var afstand = 0;
var tijd = 0;
var currentafstand = 0;
var currentprice = 0;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [5.869138, 51.826884],
  zoom: 15
});
const route = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  profile: 'mapbox/driving',
  startLocation: '5.725, 51.80917',
  unit: 'metric',
  language: 'nl-NL',
});

map.addControl(route, 'top-left');

route.on("route", (e) => {
  afstand = e.route[0].distance;
  document.getElementById("pricefullride").innerText = "Prijs geselecteerde route: " + CalculateCost(afstand).toFixed(2)+ "€";
  document.getElementById("distancefullride").innerText = "Afstand geselecteerde route: " + (afstand/1000).toFixed(2) + "km";

})
document.getElementById("mapbox-directions-profile-driving").remove();
document.getElementById("mapbox-directions-profile-walking").remove();
document.getElementById("mapbox-directions-profile-cycling").remove();
var active_route = false;
function StartStopRoute(){
  if(!active_route){
    document.getElementById("endride").style.display = "block";
    document.getElementById("startride").style.display = "none";
    active_route = !active_route;
    setTimeout()
  }
  else if(active_route){
    document.getElementById("endride").style.display = "none";
    document.getElementById("startride").style.display = "block";
    active_route = !active_route;
  }
}
function CalculateCost(distance){
  return (distance * 0.00113) + 3.25
}
