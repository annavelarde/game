class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.obstacles = [];
    this.points = [];
    this.score = 0;
    this.highScore = 0;
    this.gameDifficulty = 1;
    this.pointstarts = 0;

    // new WHATEVER -> an instance of the WHATEVER class
    // this.SOMETHING_ELSE -> is a property of the class where it is defined. inthis case: Game
    // this.player = new Player() -> an instance of the Player Class as a property of the Game class
  }

  preload() {
    this.background.preload();
  }

  setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  draw() {
    console.log("HOW MANY OBSTACLES?: ", this.obstacles.length);

    clear();
    this.background.draw();
    this.player.draw();

    //Switch Obstacles

    if (frameCount % 250 === 0) {
      let switchObstacles;
      if (this.obstacles.length % 1.5 === 0) {
        switchObstacles = obstacle1;
      } else {
        switchObstacles = obstacle2;
      }
      this.obstacles.push(new Obstacle(switchObstacles, this.gameDifficulty));
    }

    //remove obstacles after not being longer inside the canvas

    this.obstacles.forEach((obstacle, index) => {
      obstacle.draw();
      // check if an obstacle is off canvas
      // if it is off canvas remove it from the game entirely
      if (obstacle.topSide >= CANVAS_HEIGHT) {
        // if we reach here: WHAT DO WE KNOW IF WE GET HERE?
        // OBSTACLE IS NO LONGER IN CANVAS
        this.obstacles.splice(index, 1); //(removing obstacles)
        // add 1 to the score
        this.speed++;
        // conditionally update the highscore
        if (this.highScore < this.score) {
          this.highScore = this.score;
        }
        if (this.gameDifficulty >= 1) {
          this.gameDifficulty++;
        }
      }

      if (this.collisionCheck(this.player, obstacle)) {
        endGame();
        gameOverSound.play();
        song.stop();
      }
    });

    //Switch Random Points

    if (frameCount % 300 === 0) {
      let switchPoints;
      if (this.points.length % 3 === 0) {
        switchPoints = points40;
      } else {
        switchPoints = points20;
      }
      this.points.push(new Point(switchPoints, this.gameDifficulty));
    }

    this.points.forEach((point, index) => {
      point.draw();
      if (point.topSide >= this.player.bottomSide) {
        this.points.splice(index, 1); //(removing obstacles)
        this.score;
        pointsSound.play();
        if (this.highScore < this.score) {
          this.highScore = this.score;
        }
        scoreHolder.innerText = this.score;
      }
    });

    if (this.collisionCheck(this.player, point)) {
      this.gameDifficulty++;
      scoreHolder.innerText = this.score;
    }

    if (frameCount % (60 * 5) === 0) {
      this.gameDifficulty += 3;
    }
  }

  keyPressed() {
    if (keyCode === ENTER) {
      song.play();
    }
  }

  collisionCheck(player, obstacle) {
    // UA > TB
    // RA > LB
    // LA < RB
    // TA < UB

    if (player.bottomSide < obstacle.topSide) {
      return false;
    }

    if (player.rightSide < obstacle.leftSide) {
      return false;
    }

    if (player.leftSide > obstacle.rightSide) {
      return false;
    }

    if (player.topSide > obstacle.bottomSide) {
      return false;
    }

    return true;
  }
}
