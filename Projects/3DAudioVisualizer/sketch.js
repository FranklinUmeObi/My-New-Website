var song;
let colour;
let cam;
let vid;

//-----------------------------------------------------------
//Fibonacci Sphere
let R = 277;
let rotationX = 0;
let rotationY = 0;
let velocityX = 0;
let velocityY = 0;
let pushBack = 0;
let phi;
let ga;
let numPoints = 524;
let points;
//------------------------------------------------------

function preload() {
  song = loadSound("assets/50cent.mp3");
  img = loadImage("assets/water.jpg");
  vid = createVideo("assets/50cent.mp4");
  //vid =
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  song.setVolume(0.2);
  colorMode(HSB);
  //angleMode(DEGREES);
  freq = new p5.FFT(0.7, 1024);
  colour = 0;
  song.play();
  vid.loop();
  vid.hide();

  cam = createEasyCam();
  cam.zoom(100);
  //cam.rotateY(3)
  //cam.panY(350)
  //cam.panX(700)
  //cam.rotateZ(30)

  //----------------
  R = (0.8 * height) / 2;
  phi = (Math.sqrt(5) + 1) / 2 - 1; // golden ratio
  ga = phi * 2 * PI;

  points = [];

  initSphere();
  //----------------
}

function draw() {
  background(0);
  ambientLight(255);
  showCam();
  showSphere();

  colour += 0.6;
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}

function showCam() {
  noStroke();
  texture(vid);
  box(250);
  //sphere(180)
}

class SpherePoint {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}

function initSphere() {
  for (let i = 1; i <= numPoints; ++i) {
    let lon = ga * i;
    lon = (lon / 2) * PI;
    lon = lon - floor(lon);
    lon = lon * 2 * PI;
    if (lon > PI) lon = lon - 2 * PI;

    // Convert dome height (which is proportional to surface area) to latitude
    let lat = asin(-1 + (2 * i) / numPoints);

    points[i] = new SpherePoint(lat, lon);
  }
}

function showSphere() {
  renderGlobe();

  rotationX += velocityX;
  rotationY += velocityY;
  velocityX *= 0.95;
  velocityY *= 0.95;
}

function renderGlobe() {
  push();
  //translate(width / 2.0, height / 2.0, pushBack);

  let xRot = radians(-rotationX);
  let yRot = radians(270 - rotationY - millis() * 0.01);
  rotateX(xRot);
  rotateY(yRot);
  //strokeWeight(3);

  let elapsed = millis() * 0.001;
  let secs = floor(elapsed);

  let spectrum = freq.analyze();

  for (let i = 1; i <= numPoints; ++i) {
    let h = map(spectrum[524-i], 0, 255, 10, 70);
    let lat = points[i].lat;
    let lon = points[i].lon;

    push();
    rotateY(lon);
    rotateZ(-lat);
    //let lum = (cos(points[i].lon + PI * 0.33 + yRot) + 1) / 2;
    //stroke(0.5, 0.5 * lum, 0.2 + lum * 0.8);
    noStroke();
    push();
    translate(R, 0, 0);

    rotateX(90);

    normalMaterial();
    //fill(colour % 360, 100, 100);
    //stroke(0)
    //texture(img);
    //sphere(h)
    torus(h, 10);
    //ellipsoid(h, h, h, 8, 2);
    pop();

    pop();
  }

  pop();
}
//
// function mousePressed() {
//   if (song.isPlaying()) {
//     song.pause();
//     vid.pause();
//   } else {
//     song.play();
//     vid.loop();
//   }
// }
