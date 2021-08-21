class Player {
  constructor() {
    this.y = 800;
    this.x = 400;
    this.height = 130;
    this.width = 80;

    this.greenAreaLeft = 105;
    this.greenAreaRight = 105;

    this.rightBoundary = CANVAS_WIDTH - this.width - this.greenAreaLeft;
    this.bottomBoundary = CANVAS_HEIGHT - this.height;
  }

  // CollisionCheck Player.
  get bottomSide() {
    return this.y + this.height;
  }

  get rightSide() {
    return this.x + this.width;
  }

  get leftSide() {
    return this.x;
  }

  get topSide() {
    return this.y;
  }

  draw() {
    this.move();
    this.maintainBoundaries();
    image(tealCar, this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 17;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= 17;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 17;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 17;
    }
  }

  cantGoOverRight() {
    if (this.x >= this.rightBoundary) {
      this.x = this.rightBoundary;
    }
  }

  maintainBoundaries() {
    // CAN'T GO OVER ON THE RIGHT SIDE
    this.cantGoOverRight();

    // CAN'T GO OVER ON THE BOTTOM SIDE
    if (this.y >= this.bottomBoundary) {
      this.y = this.bottomBoundary;
    }

    // CAN't GO OVER THE LEFT SIDE
    if (this.x <= this.greenAreaRight) {
      this.x = this.greenAreaRight;
    }

    // CAN'T GO OVER THE TOP SIDE
    if (this.y <= 0) {
      this.y = 0;
    }
  }
}
