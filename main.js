const game = new Game(); //inicialization game

function preload() {
  // here we will need to load our assets
  background = loadImage("./assets/background-1.jpg");
  cover = loadImage("./assets/Cover2.jpg");

  tealCar = loadImage("./assets/teal-car.png"); //function

  obstacle1 = loadImage("./assets/Chain_Chomp.png");
  obstacle2 = loadImage("./assets/Chain_Chomp2.png");
  obstacle3 = loadImage("./assets/Chain_Chomp3.png");

  points20 = loadImage("./assets/20points.png");
  points30 = loadImage("./assets/30points.png");

  points40 = loadImage("./assets/40points.png");

  song = loadSound("./assets/carGame.mp3");
  pointsSound = loadSound("./assets/points.wav");
  gameOverSound = loadSound("./assets/game over.wav");

  game.preload();
}

function setup() {
  game.setup(); //method
  song.play();

  // lives = 3;
  // score = 0;

  // drawLives();
}

function draw() {
  game.draw();
}

function keyPressed() {
  game.keyPressed();
}
