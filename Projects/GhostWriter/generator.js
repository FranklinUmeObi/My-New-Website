//-----------------------------------------------------------
//THE USER INPUT VIA P5
var userString1;
var userString2;

function setup() {
  var canvas = createCanvas(500, 150);
  canvas.parent("linesIn");

  userLine1 = createInput("Insert your first line of the first bar here");
  userLine2 = createInput("Insert your first line of the second bar here");
  button = createButton("Submit");
  styleUserInput(userLine1, userLine2, button);

  button.mousePressed(handleInput);
  textAlign(CENTER);
  textSize(50);

  button.center("horizontal");
}

function draw() {
  clear();
}
function windowResized() {
  userLine1.center("horizontal");
  userLine2.center("horizontal");
  button.center("horizontal");

  userLine1.size(windowWidth * 0.6, 40);
  userLine2.size(windowWidth * 0.6, 40);
  button.size(windowWidth * 0.2, 40);
}
//-----------------------------------------------------------

//-----------------------------------------------------------

//HANDLING THE USER INPUT
function handleInput() {
  document.getElementById("song").style.opacity = 100;
  userString1 = userLine1.value();
  userString2 = userLine2.value();

  var x = generateRapLines(0);
  updateBars(0, userString1, x[0], x[1], x[2]);

  var y = generateRapLines(1);
  updateBars(1, userString2, y[0], y[1], y[2]);

  //var w = generateRapLines();
  //updateBars(2, userString1, w[0], w[1], w[2])

  //var z = generateRapLines();
  //updateBars(3, userString2, z[0], z[1], z[2])
}

//THIS IS WHERE RITA WORKS
function generateRapLines(bar) {
  var lines = [];
  //"dt nn vbd dt nn !"

  var s2 = createLine2(bar);
  var s3 = createLine3(bar);
  var s4 = createLine4(bar, s3);

  lines.push(s2);
  lines.push(s3);
  lines.push(s4);

  return lines;
}

//---------------------------------------------------------------
function createLine2(bar) {
  let myString;
  if (bar == 0) myString = userString1;
  else if (bar == 1) myString = userString2;
  let ans;
  let user1 = RiTa.tokenize(myString);
  let toRhyme = user1[user1.length - 1];
  let rhymeSize = RiTa.rhymes(toRhyme).length
  if (rhymeSize > 99) rhymeSize= rhymeSize % 99
  let num = Math.floor(Math.random() * rhymeSize);
  let whichArray = Math.floor(Math.random() * 5);
  let whichArrayE = Math.floor(Math.random() * 5);
  let s = [];
  let syllables = RiTa.getSyllables(user1).length;
  let thePOS;

  switch (syllables) {
    case 0:
      thePOS = fiveArray;
      break;
    case 1:
      thePOS = sixArray;
      break;
    case 2:
      thePOS = sevenArray;
      break;
    case 3:
      thePOS = eightArray;
      break;
    case 4:
      thePOS = nineArray;
      break;

    default:
  }

  for (var i = 0; i < thePOS[whichArray].length; i++) {
    s.push(RiTa.randomWord(thePOS[whichArray][i]));
  }
  if(rhymeSize > 1) s.push(RiTa.rhymes(toRhyme)[num]);
  else s.push(RiTa.similarBySound(toRhyme)[num]);
  ans = RiTa.untokenize(s);
  let abc = RiTa.getSyllables(ans);

  let numS = numSyl(abc)
  if(numS > 7) ans = createLine2(bar)
  return ans;
}

function createLine3(bar) {
  let x = ["prp", "vbd", "rb", "in", "dt", "nn"];
  let ans;
  let s = [];
  for (var i = 0; i < x.length; i++) s.push(RiTa.randomWord(x[i]));
  ans = RiTa.untokenize(s);
  let abc = RiTa.getSyllables(ans);

  let numS = numSyl(abc)
  if(numS > 8) ans = createLine3(bar)
  return ans;
}

function createLine4(bar, lastLine) {
  let ans;
  let user1 = RiTa.tokenize(lastLine);
  let toRhyme = user1[user1.length - 1];//get word to rhyme with
  let rhymeSize = RiTa.rhymes(toRhyme).length
  if (rhymeSize > 99) rhymeSize= rhymeSize % 99
  let num = Math.floor(Math.random() * rhymeSize);
  let whichArray = Math.floor(Math.random() * 5);
  let whichArrayE = Math.floor(Math.random() * 5);
  let s = [];
  let syllables = RiTa.getSyllables(user1).length;
  let thePOS;

  switch (syllables) {
    case 0:
      thePOS = fiveArray;
      break;
    case 1:
      thePOS = sixArray;
      break;
    case 2:
      thePOS = sevenArray;
      break;
    case 3:
      thePOS = eightArray;
      break;
    case 4:
      thePOS = nineArray;
      break;

    default:
  }

  for (var i = 0; i < thePOS[whichArray].length; i++) {
    s.push(RiTa.randomWord(thePOS[whichArray][i]));
  }
  if(rhymeSize > 1) s.push(RiTa.rhymes(toRhyme)[num]);
  else s.push(RiTa.similarBySound(toRhyme)[num]);

  ans = RiTa.untokenize(s);
  let abc = RiTa.getSyllables(ans);

  let numS = numSyl(abc)
  if(numS > 9) ans = createLine4(bar, lastLine)
  return ans;
}

//---------------------------------------------------------
function updateBars(barNum, l1, l2, l3, l4) {
  var a = "line" + (4 * barNum + 1);
  var b = "line" + (4 * barNum + 2);
  var c = "line" + (4 * barNum + 3);
  var d = "line" + (4 * barNum + 4);

  document.getElementById(a).innerHTML = l1;
  document.getElementById(b).innerHTML = l2;
  document.getElementById(c).innerHTML = l3;
  document.getElementById(d).innerHTML = l4;
}

function styleUserInput(a, b, c) {
  a.position(0, 100);
  b.position(0, 160);
  c.position(0, 220);
  a.size(windowWidth * 0.6, 40);
  b.size(windowWidth * 0.6, 40);
  c.size(windowWidth * 0.2, 40);

  a.center("horizontal");
  b.center("horizontal");
  c.center("horizontal");
}


function numSyl(string){
  let s = string.split("");
  let num = 0

  for (var i = 0; i < s.length; i++)
  {
    if(s[i] == "/" || s[i] == " ") num += 1
  }
  return num
}
