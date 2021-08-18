const game = new Game(); //inicialization game

function preload() {
  // here we will need to load our assets
  background = loadImage("./assets/background-1.jpg");

  tealCar = loadImage("./assets/teal-car.png"); //function

  obstacle1 = loadImage("./assets/obstacle-banana.png");
  obstacle2 = loadImage("./assets/Chain_Chomp.png");

  points20 = loadImage("./assets/20points.png");
  points30 = loadImage("./assets/30points.png");
  points40 = loadImage("./assets/40points.png");

  song = loadSound("./assets/carGame.mp3");

  game.preload();
}

function setup() {
  //function declaretion
  game.setup(); //method
  song.play();
}

function draw() {
  game.draw();
}

function keyPressed() {
  game.keyPressed();
}
