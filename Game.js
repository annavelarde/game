class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.obstacles = [];
    // this.score = 0;
    // this.highScore = 0;
    this.gameDifficulty = 1;

    // new WHATEVER -> an instance of the WHATEVER class
    // this.SOMETHING_ELSE -> is a property of the class where it is defined. inthis case: Game
    // this.player = new Player() -> an instance of the Player Class as a property of the Game class
  }
  setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  preload() {
    this.background.preload();
  }

  draw() {
    console.log("HOW MANY OBSTACLES?: ", this.obstacles.length);

    clear();
    this.background.draw();
    this.player.draw();

    if (frameCount % 60 === 0) {
      let switchObstacles;
      if (this.obstacles.length % 3 === 0) {
        switchObstacles = banana;
      } else {
        switchObstacles = enemy;
      }
      this.obstacles.push(new Obstacle(switchObstacles, this.gameDifficulty));
    }
    this.obstacles.forEach((obstacle, index) => {
      obstacle.draw();
      // check if an obstacle is off canvas
      // if it is off canvas remove it from the game entirely
      if (obstacle.topSide >= CANVAS_HEIGHT) {
        // if we reach here: WHAT DO WE KNOW IF WE GET HERE?
        // OBSTACLE IS NO LONGER IN CANVAS
        this.obstacles.splice(index, 1);
      }
    });
  }

  keyPressed() {}

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
