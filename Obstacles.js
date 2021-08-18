class Obstacle {
  constructor(image) {
    // super();
    this.width = 110;
    this.height = 110;
    this.speed = 3;

    // this.x = 150;
    //.this.x = random(this.maxLeftSide, this.maxRightSide);
    this.y = 0;
    this.maxLeftSide = 150;
    this.maxRightSide = CANVAS_WIDTH - this.width - this.maxLeftSide;
    this.x = Math.floor(
      Math.random() * (this.maxRightSide - this.maxLeftSide + 1) +
        this.maxLeftSide
    ); // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    // console.log(this.x);

    this.image = image;
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

// / stops loop, draws game over message

function endGame() {
  noLoop();
  fill("#000000");
  textSize(60);
  text("Game Over!", this.width / 2.7, this.height / 2.1);
  textSize(40);
  text("Press F5 to restart!", this.width / 2.7, this.height / 2.1 + 50);
}
