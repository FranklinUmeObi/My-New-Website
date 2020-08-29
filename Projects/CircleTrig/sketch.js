let time;
let diameter;
let x;
let y;
let orb;

let num;
function setup() {
  canvas = createCanvas(800, 500);
  time = 0;
  diameter = 400;
  x = 400;
  y = 250;

  orb = 25;
  num = 10;

  slider = createSlider(2, num, 5, 1);
  slider.position(50, 50);
  slider.style("width", "200px");
}

function draw() {
  background(55);
  drawCircles();
  num = slider.value();

  textSize(25);
  textFont("Helvetica");
  fill(255);
  noStroke();
  text("Move the slider to change the number of balls", 170, 470, 800, 500);

  time += 0.02;
}

function drawCircles() {
  let dotx = x;
  let doty = y;

  let radius = diameter / 2;
  dotx += radius * cos(time);
  doty += radius * sin(time);

  //Draw Circle
  stroke(0, 90, 255);
  strokeWeight(5);
  noFill();
  ellipse(x, y, diameter, diameter);

  let da = (PI * 2) / num;
  let a = 0;

  stroke(255);
  strokeWeight(2);

  //Draw lines
  let b = 0;
  for (var i = 0; i < num * 2; i++) {
    line(x, y, x + cos(b) * (x - radius), y + sin(b) * (x - radius));
    b += da / 2;
  }

  //Draw orbs
  for (var i = 0; i < num; i++) {
    let r = 255 - 14 * i;
    let g = 255 - 29 * i;
    let b = 255 - 24 * i;
    fill(r, g, b);

    ellipse(
      x + cos(a) * sin(time + (i * PI) / num) * (x - radius),
      y + sin(a) * sin(time + (i * PI) / num) * (x - radius),
      orb,
      orb
    );

    a += da / 2;
  }
}
