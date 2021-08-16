const game = new Game(); //inicialization game

function draw() {
  game.draw();
}

function setup() {
  //function declaretion
  game.setup(); //method
}

function keyPressed() {
  // game.keyPressed();
}

function preload() {
  // here we will need to load our assets
  background = loadImage("./assets/background-1.jpg");
  tealCar = loadImage("./assets/teal-car.png"); //function
  banana = loadImage("./assets/obstacle-banana.png");
  enemy = loadImage("./assets/enemy.png");
  redCar = loadImage("./assets/red-car.png");

  game.preload();
}
