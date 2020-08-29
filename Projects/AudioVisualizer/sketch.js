var song;
var timeGone;
let colour
let radius
let duration
let displayType
let a
let b
let c
let d
let e
let f


function preload() {
  song = loadSound("assets/Singing.mp3");

  myFont = loadFont("assets/LOVES.ttf");
}

function setup() {
  canvas = createCanvas(700, 600);
  song.setVolume(0.2);

  textFont(myFont);
  colorMode(HSB);
  angleMode(DEGREES)
  //freq = new p5.FFT(0.8,512);
  freq = new p5.FFT(0.7,1024);
  colour = 0
  radius = 100
  duration = song.duration()
  song.play();
  displayType = 0
  a = new MyButton(10,20,100,30,0,"Pillar")
  b = new MyButton(10,60,100,30,1,"Block")
  c = new MyButton(10,100,100,30,2,"Flower")
  d = new MyButton(10,140,100,30,3,"Wave")
  e = new MyButton(10,180,100,30,4,"Disk")
  f = new MyButton(10,220,100,30,5,"Dot")

}

function draw() {
  background(0);
  fill(colour % 360, 100, 100);

  switch(displayType){
    case 0:
      showWaveAmpLine()
      break;
    case 1:
      showWaveAmpRect()
      break;
    case 2:
      showWaveAmpCirc()
      break;
    case 3:
      showWaveAmpShape()
      break;
    case 4:
      showWaveForm()
      break;
    case 5:
      showWaveAmpDots()
      break;
  }
  fill(0);
  ellipse(width / 2, height / 2, 200, 200)

  fill(255);
  showLoadBar();
  showTime();
  displayChangeUI()
  colour += 0.6
}


// Button class
class MyButton {
  constructor(x1,y1, w,h, val, text){
    this.x1 = x1
    this.y1 = y1
    this.w = w
    this.h = h
    this.x2 = x1 + w
    this.y2 = y1 + h
    this.val = val
    this.label = text
  }

  isHovered()
  {
    if((mouseX > this.x1)
    && (mouseX < this.x2)
    && (mouseY > this.y1)
    && (mouseY < this.y2))
    {
      return true
    }

    else return false
  }

  display()
  {
    textSize(20);
    strokeWeight(3)
    fill(255)

    if(this.isHovered()) fill(150)
    if(displayType == this.val) stroke(colour % 360, 100, 100)
    else stroke(0,0,0,0)

    rect(this.x1, this.y1, this.w, this.h, 5);
    fill(0)
    stroke(0,0,0,0)
    text(this.label, this.x1+10, this.y1 + 22);
  }

}






function displayChangeUI()
{
  a.display()
  b.display()
  c.display()
  d.display()
  e.display()
  f.display()
}




function showWaveAmpDots() {
  stroke(0,0,0,0);
  let spectrum = freq.analyze();
  stroke(colour % 360, 100, 100);
  strokeWeight(5)
  beginShape(POINTS);
  for (var i = 0; i < 360; i++)
  {
    let h = map(spectrum[i], 0, 255, 100, 350);
    var x = (width / 2) + h * cos(i)
    var y = (height / 2) + h * sin(i)
    vertex(x, y);
  }
  endShape(CLOSE);
}
function showWaveAmpShape() {
  stroke(0,0,0,0);
  let spectrum = freq.analyze();
  stroke(colour % 360, 100, 100);
  strokeWeight(5)
  beginShape();
  for (var i = 0; i < 360; i++) //spectrum.length
  {
    let h = map(spectrum[i], 0, 255, 100, 350);
    var x = (width / 2) + h * cos(i)
    var y = (height / 2) + h * sin(i)
    vertex(x, y);
  }
  endShape(CLOSE);
}

function showWaveAmpRect() {
  stroke(0);
  strokeWeight(1)
  let spectrum = freq.analyze();
  for (var i = 0; i < 360; i++) //spectrum.length
  {

    push()
    translate(width / 2, height / 2);
    var r = radius*1.45
    var x = r * cos(i)
    var y = r * sin(i)
    let h = map(spectrum[i], 0, 255, 100, 300);
    rotate(i);
    rect(0, 0, 10, h)
    pop()

  }
}

function showWaveAmpLine() {
  stroke(colour % 360, 100, 100);
  fill(0,0,0,0)
  strokeWeight(5)
  let spectrum = freq.analyze();
  for (var i = 0; i < 30; i++) //spectrum.length
  {

    push()
    translate(width / 2, height / 2);
    var r = radius*1.45
    var x = r * cos(i*12)
    var y = r * sin(i*12)
    let h = map(spectrum[i], 0, 255, 100, 300);
    rotate(i*12);
    rect(0, 0, 20, h)
    pop()
  }
  fill(0)
  ellipse(width / 2, height / 2, 200, 200)
}

function showWaveAmpCirc() {
  stroke(0);
  strokeWeight(1)
  let spectrum = freq.analyze();
  for (var i = 0; i < 120; i++) //spectrum.length
  {

    push()
    translate(width / 2, height / 2);
    var r = radius*1.45
    var x = r * cos(i*3)
    var y = r * sin(i*3)
    let h = map(spectrum[i], 0, 255, 100, 700);
    rotate(i*3);
    ellipse(0, 0, 15, h)
    pop()

  }
}



  function showWaveForm() {
    stroke(0,0,0,0);
    let spectrum = freq.waveform();
    fill((colour % 360), 100, 100);
    for (var i = 0; i < 360; i++) //spectrum.length
    {
      push()
      translate(width / 2, height / 2);

      var r = radius*1.45
      var x = r * cos(i)
      var y = r * sin(i)
      let h = map(spectrum[i], -1, 1, 0, 450);
      rotate(i);
      rect(0, 0, 5, h)
      pop()
    }
    fill(colour % 360, 100, 100);

}


function showLoadBar() {
  //inner ring
  fill(0,0,0,0);

  stroke(255)
  strokeWeight(5)
  ellipse(700 / 2, 600 / 2, radius*2, radius*2);
//loadbar
stroke(colour % 360, 100, 100);
  strokeWeight(12)
  let x = 700 / 2;
  let y = 600 / 2;
  let gone = map(timeGone, 0, duration, 0, 360);
  arc(x, y, 1.7*radius, 1.7*radius, 270, gone-90 + 180*0.001)
  strokeWeight(2)
}

function mousePressed() {
  if (a.isHovered()) {
    displayType = a.val
  }
  else if (b.isHovered()) {
    displayType = b.val
  }
  else if (c.isHovered()) {
    displayType = c.val
  }
  else if (d.isHovered()) {
    displayType = d.val
  }
  else if (e.isHovered()) {
    displayType = e.val
  }
  else if (f.isHovered()) {
    displayType = f.val
  }
  else {
    if (song.isPlaying()) {
      // .isPlaying() returns a boolean
      song.pause();
    } else {
      song.play();
    }
  }

}

function showTime() {
  textSize(80);
  timeGone = song.currentTime();
  timeGone = Math.round(timeGone);
  var mins = Math.floor(timeGone/60);
  var secs = timeGone %60;

  if (secs < 10) var timeToDisplay = mins + ":0" + secs;
  else var timeToDisplay = mins + ":" + secs;

  text(timeToDisplay, 280, 330);
}
