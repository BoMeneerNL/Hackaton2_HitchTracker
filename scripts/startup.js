mapboxgl.accessToken = "%Token%";
//valuetype = meter
var afstand = 0;
//valuetype = seconds
var tijd = 0;
var currentafstand = 0;
var currentprice = 0;
var currenttijd;
var activeroute = false;
// m per sec
var uppersecond;
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
  language: 'nl-NL'
});

map.addControl(route, 'top-left');
route.on("route", (e) => {
  afstand = e.route[0].distance;
  tijd = e.route[0].duration;
  document.getElementById("pricefullride").innerText = "Prijs geselecteerde route: " + CalculateCost(afstand).toFixed(2)+ "€";
  document.getElementById("distancefullride").innerText = "Afstand geselecteerde route: " + (afstand >= 1000?(afstand/1000).toFixed(2) + "km": afstand.toFixed(0) + "m");
  activeroute = true;
})
document.getElementById("mapbox-directions-profile-driving").remove();
document.getElementById("mapbox-directions-profile-walking").remove();
document.getElementById("mapbox-directions-profile-cycling").remove();
var active_route = false;
var contradict;
function StartStopRoute(){
  if(!active_route){
    if(!activeroute){
      alert("Er is geen route geselecteerd!, om te rit te starten moet er eerst een route geselecteerd worden.");
      return;
    }
    document.getElementById("endride").style.display = "block";
    document.getElementById("startride").style.display = "none";
    active_route = !active_route;
    uppersecond = afstand/tijd;
    contradict = setInterval(RideEditor,100);
  }
  else if(active_route){
    document.getElementById("endride").style.display = "none";
    document.getElementById("startride").style.display = "block";
    clearInterval(contradict);
    active_route = !active_route;
  }
}
//0,00113 = 1,13€ per km, 3,25€ = starttarief
const CalculateCost = (distance) => (distance * 0.00113) + 3.25;
function RideEditor(){
    currentafstand += uppersecond/10;
    currentprice = CalculateCost(currentafstand);
    document.getElementById("priceridden").innerText = "Prijs: " + currentprice.toFixed(2) + "€";
    document.getElementById("ridden").innerText = "Afstand: " + (currentafstand >= 1000?(currentafstand/1000).toFixed(2) + "km": currentafstand.toFixed(0) + "m");
  if(currentafstand >= afstand){
    ExitRideHandler();
  }
  currenttijd += 100;
}
const ExitRideHandler = _=> clearInterval(contradict);
