class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.obstacles = [];
    this.points = [];
    this.score = 0;
    this.gameDifficulty = 1;

    this.x = 0;
    this.y = 0;
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT / 1.5;

    // new WHATEVER -> an instance of the WHATEVER class
    // this.SOMETHING_ELSE -> is a property of the class where it is defined. inthis case: Game
    // this.player = new Player() -> an instance of the Player Class as a property of the Game class
  }

  preload() {
    this.background.preload();
  }

  setup() {
    mode = 0;
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  draw() {
    clear();
    image(cover, this.x, this.y, this.width, this.height);

    if (mode == 0) {
      text("Press SPACE to start!!", 250, 150);
      textSize(25);
      song.stop();
    }

    if (mode == 1) {
      this.background.draw();
      this.player.draw();
      //Switch Obstacles
      // > frameCount -  a variable that keeps count of the number of times
      //   that the draw function is called throughout the lifetime of a program.
      if (frameCount % 50 === 0) {
        let switchObstacles;
        if (this.obstacles.length % 2 === 0) {
          switchObstacles = obstacle1;
        } else if (this.points.length % 1.5 === 0) {
          switchObstacles = obstacle3;
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
          this.obstacles.splice(index, 1); //(removing obstacles)8
        }

        if (this.collisionCheck(this.player, obstacle)) {
          endGame();
          gameOverSound.play();
          song.stop();
        }
      });

      //Switch Random Points

      if (frameCount % 60 === 0) {
        //60frames for 1seconds
        let switchPoints;
        let value;
        if (this.points.length % 2 === 0) {
          //% modulus. da el restante de una solucion.  10 % 2 === 0 perf
          switchPoints = points40;
          value = 40;
        } else if (this.points.length % 1.5 === 0) {
          switchPoints = points20;
          value = 20;
        } else {
          switchPoints = points30;
          value = 30;
        }
        this.points.push(new Point(switchPoints, this.gameDifficulty, value));
      }

      this.points.forEach((point, index) => {
        point.draw();

        if (this.collisionCheck(this.player, point)) {
          pointsSound.play();
          this.points.splice(index, 1); //(removing pointimages)
          this.score += point.value;
          scoreHolder.innerText = this.score;
        }
      });

      if (frameCount % 60 === 0) {
        this.gameDifficulty = random(2, 7);
        // console.log("Speed:" + this.gameDifficulty);
      }
    }
  }

  keyPressed() {
    if (keyCode === SPACE) {
      mode = 1;
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
