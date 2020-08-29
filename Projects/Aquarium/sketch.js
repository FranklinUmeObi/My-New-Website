let fish;
let cam;
let test;
let aquariumSize
let school = [];

function preload() {
  fish = loadModel('assets/fish.obj');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createEasyCam();
  for (var i = 0; i < 110; i++) {
    test = new Boid(fish);
    school.push(test);
  }
aquariumSize = 500

angleMode(DEGREES);

}

function draw() {
  background(30,144,255);
  ambientLight(255);
  normalMaterial();
  for (var fishBoid of school)
  {
    fishBoid.flock(school);
    fishBoid.update();
    fishBoid.show();

  }

}
