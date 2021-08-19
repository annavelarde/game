class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.obstacles = [];
    this.points = [];

    this.score = 0;
    // this.highScore = 0;

    this.gameDifficulty = 1;

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
    // > frameCount -  a variable that keeps count of the number of times
    //   that the draw function is called throughout the lifetime of a program.
    if (frameCount % 80 === 0) {
      let switchObstacles;
      if (this.obstacles.length % 2 === 0) {
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
        this.gameDifficulty++;
      }

      if (this.collisionCheck(this.player, obstacle)) {
        endGame();
        gameOverSound.play();
        song.stop();
      }
    });

    //Switch Random Points

    if (frameCount % 120 === 0) {
      //60frames for 1seconds
      let switchPoints;
      if (this.points.length % 2 === 0) {
        //% modulus. da el restante de una solucion.  10 % 2 === 0 perf
        switchPoints = points40;
        this.score += 40;
      } else if (this.points.length % 1 === 0) {
        switchPoints = points20;
        this.score += 20;
      } else {
        switchPoints = points30;
        this.score += 30;
      }
      this.points.push(new Point(switchPoints, this.gameDifficulty));
    }

    this.points.forEach((point, index) => {
      point.draw();
      if (point.bottomSide >= this.player.topSide) {
        this.score;
      }

      if (this.collisionCheck(this.player, point)) {
        pointsSound.play();
        this.points.splice(index, 1); //(removing pointimages)
        this.gameDifficulty++;
        this.score;
        scoreHolder.innerText = this.score;
      }
    });

    if (frameCount % (60 * 5) === 0) {
      this.gameDifficulty += 5;
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
