class Point {
  constructor(point) {
    this.width = 120;
    this.height = 80;
    this.image = point;
    this.speed = 3;

    // this.x = 150;
    //.this.x = random(this.maxLeftSide, this.maxRightSide);
    this.y = 0;
    this.maxLeftSide = 150;
    this.maxRightSide = CANVAS_WIDTH - this.width - this.maxLeftSide;
    this.x = Math.floor(
      Math.random() * (this.maxRightSide - this.maxLeftSide + 1) +
        this.maxLeftSide
    );
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    // console.log(this.x);
  }

  draw() {
    image(this.image, this.x, this.y, this.width, this.height);
    this.y += this.speed;
  }

  // CollisionCheck Obstacle.
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
}
