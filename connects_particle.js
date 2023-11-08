const bgColor = 10;
const nbPoint = 100;
const points = [];

const noiseScale = 0.01;
const pointSize = 7;
const distanceLine = 50;
const shadowSize = 100;
const velocity = 1;
const uniqueLine = false

class Point {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.angle = Math.random()* TWO_PI + 2
    this.velx = cos(this.angle)
    this.vely = sin(this.angle)
    this.velocity = Math.random() * velocity;
    this.size = pointSize;
    this.opacity = random(60, 255);
    this.shadowSize = Math.random() * shadowSize;
  }

  update() {
    this.x += this.velx * this.velocity
    this.y += this.vely * this.velocity

    if (this.x < 0 || this.x > width) {
        this.velx = -this.velx;
      }
  
      if (this.y < 0 || this.y > height) {
        this.vely = -this.vely;
      }

    

    this.draw();
    this.drawLine();
  }

  draw() {
    noStroke();
    fill(255, 255, 255, this.opacity);
    ellipse(this.x, this.y, this.size, this.size);
    fill(255, 255, 255, this.opacity * 0.25);
    ellipse(
      this.x,
      this.y,
      this.size + this.shadowSize,
      this.size + this.shadowSize
    );
  }

  drawLine() {
    stroke(137, 255, 255, this.opacity);
    for (element of points) {
      let d = dist(this.x, this.y, element.x, element.y);
      if (d < distanceLine && d > 0) {
        if(uniqueLine){
            line(this.x, this.y, element.x, element.y);
            break
        }
        else{
            line(this.x, this.y, element.x, element.y);
        }
      }
    }
  }


}
function setup() {
  createCanvas(window.innerWidth - 20, window.innerHeight - 20);
  background(0,0,30);
  stroke(255);

  for (let i = 0; i < nbPoint; i++) {
    points.push(new Point());
  }
}

function draw() {
  background(0,0,30);
  for (element of points) {
    element.update();
  }
}