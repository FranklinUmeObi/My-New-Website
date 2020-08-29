const myMapboxKey =
  "pk.eyJ1IjoiZnJhbmtsaW51bWVvYmkiLCJhIjoiY2tjMXFmYjlqMHkxZTMybXIzbmMxczZodyJ9.1q1NSnAR9a8Chd3vFYls2w";
//"sk.eyJ1IjoiZnJhbmtsaW51bWVvYmkiLCJhIjoiY2tjMXFpbmxsMXdlcDJwdGI1cjU3NnhnMCJ9.HaWlA_3Brgo_plG7G9bG5w";

const options = {
  lat: 30,
  lng: 40,
  zoom: 2,
  studio: true,
  style: "mapbox://styles/mapbox/dark-v10"
};

const mappa = new Mappa("Mapbox", myMapboxKey);
let myMap;

function setup() {
  canvas = createCanvas(900, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill(109, 255, 0);
  stroke(100);
  setInterval(askISS,1000); //every second
}

function draw() {
}

function askISS(){
loadJSON("https://api.wheretheiss.at/v1/satellites/25544",showISS);
}

function showISS(data){
  clear()
  let latitude = data.latitude;
  let longitude = data.longitude;
  console.log("lat   " + latitude);
  console.log("long  " + longitude);
  let coord = {latitude,longitude}
  const pos = myMap.latLngToPixel(latitude, longitude);
  myMap.latitude = latitude
  myMap.longitude = longitude
  let size = 15 + myMap.zoom();
  ellipse(pos.x, pos.y, size, size);
}
