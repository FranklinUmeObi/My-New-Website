float time = 0 ;
int diameter = 300 ;
float a, b;
float dotx, doty ;
ArrayList<Float> wave = new ArrayList<Float>();

void setup()
{
  size(1100, 500);
  //fullScreen();
  frameRate(60);
}



void draw()
{
  background(24);
  drawFourier();


  time += 0.01 ;
}

void drawFourier()
{
  translate(220, 280);
  float x = 0;
  float y = 0;

  fill(255);
  dottedLine(-700, 0, width, 0, 90);
  dottedLine(a, -700, a, height ,90);

  for ( int j = 0; j < 5; j++)
  {
    int n = (j * 2) + 1 ;
    float prevx = x;
    float prevy = y;

    //Get dot on circumfrence
    float radius = diameter/2 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    //Draw Circle
    stroke(0, 90, 255);
    strokeWeight(2);
    noFill();
    ellipse(prevx, prevy, radius*2, radius*2);

    //Draw Centre dot and circumfrence dot
    stroke(255, 255, 0);
    line(prevx, prevy, x, y);
    fill(255, 0, 0);
    noStroke();
    ellipse(prevx, prevy, 8, 8);
    ellipse(x, y, 10, 10);

    //Get points on Wave
    dotx = x ;
    doty = y ;
  }

  //Push y positions onto arraylist
  wave.add(0, doty);

  //Draw Wave
  for (int i = 0; i < wave.size(); i++)
  {
    if (i == 0)
    {
      fill(50, 150, 200);
      ellipse(400+i, wave.get(i), 15, 15);
      a = 400+1;
      b = wave.get(i);
    } else
    {
      fill(0, 255, 0);
      ellipse(400+i, wave.get(i), 6, 6);
    }
    if (wave.size() > 700) wave.subList(700, wave.size()).clear();
  }
  stroke(255, 65, 200);
  strokeWeight(2.5);
  line(dotx, doty, a, b);
}

void dottedLine(float x1, float y1, float x2, float y2, float steps) {
  for (int i=0; i<=steps; i++) {
    float x = lerp(x1, x2, i/steps);
    float y = lerp(y1, y2, i/steps);
    noStroke();
    ellipse(x, y, 2, 2);
  }
}
