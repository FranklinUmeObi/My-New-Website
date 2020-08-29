class Boid {
  constructor(model) {
    this.position = p5.Vector.random3D().setMag(300)
    this.velocity = p5.Vector.random3D();
    this.velocity.setMag(random(2, 4));
    this.velocity.sub(0,this.velocity.z, 0);
    this.acceleration = createVector();
    this.model = model;
    this.perceptionRadius = 70;
    this.maxForce = 1;
    this.maxSpeed = 9;//should be 8
  }

  show() {
    push();
    rotateX(180);
    //scale(1.5);
    translate(this.position);
    this.steer()
    model(this.model);
    pop();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edges()
  }

  edges() {
  if (this.position.x > aquariumSize) {
    this.position.x = -aquariumSize;
  } else if (this.position.x < -aquariumSize) {
    this.position.x = aquariumSize;
  }
  if (this.position.y > aquariumSize*0.8) {
    this.position.y = -aquariumSize*0.8;
  } else if (this.position.y < -aquariumSize*0.8) {
    this.position.y = aquariumSize*0.8;
  }
  if (this.position.z > aquariumSize) {
    this.position.z = -aquariumSize;
  } else if (this.position.z < -aquariumSize) {
    this.position.z = aquariumSize;
  }
}

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    alignment.mult(1.1);
    separation.mult(1.2);
    //cohesion.mult(0.8);
    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
  }

  align(boids) {
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < this.perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids){
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        this.position.z,
        other.position.x,
        other.position.y,
        other.position.z
      );
      if (other != this && d < this.perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids){
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        this.position.z,
        other.position.x,
        other.position.y,
        other.position.z
      );
      if (other != this && d < this.perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
}

  steer(){
    let xDir = map(this.velocity.x, -this.maxSpeed, this.maxSpeed, -90, 90);
    let yDir = map(this.velocity.y, -this.maxSpeed, this.maxSpeed, 90, -90);
      rotateY(-xDir);
      rotateX(-yDir);

  }





}
