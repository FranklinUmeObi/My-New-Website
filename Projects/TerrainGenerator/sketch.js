let width = 800;
let height = 600;
let scale = 15;
let cols = (width / scale) * 1.8;
let rows = (height / scale) * 1.8;

let terrain;
let flying = 0;

let valSmooth
let valTall
let light = false

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  cam = createEasyCam();
  terrain = new Array(cols);

  valSmooth = 0.08

  valTall = 300

  for (var i = 0; i < terrain.length; i++) {
    terrain[i] = new Array(rows);
  }




  slider1 = createSlider(1, 16, 8);
  slider1.position(20, 10);
  slider1.style('width', '200px');

  slider2 = createSlider(50, 600, 300);
  slider2.position(20, 50);
  slider2.style('width', '200px');

  button = createButton('Add Color');
  button.position(20, 100);
  button.mousePressed(changeLight);


}

function draw() {


  background(170);
  drawSettings();
  moveTerrain();
  drawTerrain();
}


function drawSettings() {
  stroke(0);
  strokeWeight(1);

  if(light){
    fill(160)
    pointLight(25, 250, 25, 2000, -100, -100);
    pointLight(25, 250, 25, 700, 2000, 2000);
  }
  else noFill();


   valSmooth = slider1.value() / 100;
}

function drawTerrain() {
  push();
  translate((-width * 1.5) / 2, -150, -350);
  rotateX(PI / 4);



  for (var row = 0; row < rows-1; row++)
  {
    beginShape(TRIANGLE_STRIP);
    for (var col = 0; col < cols; col++)
    {
      let shade = map(terrain[col][row], 0, 300, 0, 110);
      vertex(col*scale, row     * scale, terrain[col][row    ]);
      vertex(col*scale, (row+1) * scale, terrain[col][row + 1]);
    }
    endShape();
  }
  pop();
}

function moveTerrain(){
  let yoff = flying;
  for (var i = 0; i < rows; i++) {
    let xoff = 0;
    for (var j = 0; j < cols; j++) {
      let h = noise(xoff, yoff);
      terrain[j][i] = map(h, 0, 1, 0, slider2.value());
      xoff += valSmooth;
    }
    yoff += valSmooth;
  }

    flying -= 0.1;
}

function changeLight() {
if(light == true) light = false
else light = true
}
