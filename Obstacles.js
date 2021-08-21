class Obstacle {
  constructor(image, difficulty) {
    this.width = 80;
    this.height = 55;

    this.speed = 6 + difficulty;
    // this.lives;

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
  textSize(50);
  text("Game Over!", this.width / 2.9, this.height / 2.1);
  textSize(20);
  text("Press F5 to restart.", this.width / 2.4, this.height / 2.1 + 25);
}

//draws score in the top left

function drawScore() {
  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(lives);
}
