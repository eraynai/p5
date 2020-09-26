//variables
let pX, pY, pW, pH, pV;
let bX, bY, bD, vX, vY;
let maxAngle;
let cX, cY, cV;
let botLevel;
let pScore, cScore;
let creature1, creature2;
let slider;
let freeze = true;
let restartGame = true;
let gameEnd = false;
let startGame = true;
let computerWin = `Jeb has won! Press the "r" key to Play Again`;
let userWin = "The user has won!, Press the r key to Play Again";


/*function that loads images into the game */
function preload() {
  creature1 = loadImage("img/creature1.png");
  creature2 = loadImage("img/creature2.png");
}

function setup() {
  createCanvas(innerWidth, 0.9 * innerHeight);
  let title = createElement("h1", "Instructions on How To Play:");
  title.addClass("opening_title");
  restart();

  maxAngle = (75 / 180) * PI;
  botLevel = 0.1;

 
}


//Restart the Game
function restart() {
  pX = 0;
  pY = height / 2;
  pW = 100;
  pH = 100;
  pV = 0; //Paddle's Velocity

  cX = width - pW;
  cY = height / 2;
  cV = 0;

  bX = width / 2;
  bY = height / 2;
  bD = height / 15; //ball's diameter

  vMax = 6; //max velocity
  vX = -vMax;
  vY = vMax;

  pScore = 0;
  cScore = 0;
  pName = "Jobb";
  cName = "Jeb";
  gameEnd = false;
  startGame = true;
}

function draw() {
  endGame();
  background(253, 187, 45);
  //color of the line
  stroke(255);
  //thickness of the line
  strokeWeight(0);
  //line(windowWidth/2, 0, windowWidth/2, height);

  //draw dash lines for the net on the board
  for (let i = 0; i < height / 10; i++) {
    line(
      width / 2,
      (height / 10) * i,
      width / 2,
      height / 20 + (height / 10) * i
    );
  }

  //player
  //update panel's position
  pY += pV;
  //limit paddle's position
  if (pY < pH / 2) {
    pY = pH / 2;
  }
  if (pY > height - pH / 2) {
    pY = height - pH / 2;
  }
  //fill the area with color
  //fill(255);
  image(creature1, pX, pY - pH / 2, pW, pH);

  //computer
  //computer controls their movement
  cV = botLevel * (bY - cY);
  //computer paddle should not move faster than player
  if (cV < -4) {
    cV = -4;
  }
  if (cV > 4) {
    cV = 4;
  }

  cY += cV;
  //limit paddle's position
  if (cY < pH / 2) {
    cY = pH / 2;
  }
  if (cY > height - pH / 2) {
    cY = height - pH / 2;
  }
  //fill the area with color
  //fill(255);
  image(creature2, cX, cY - pH / 2, pW, pH);

  //update ball's position
  bX += vX;
  bY += vY;
  //update ball's collision with player's paddle
  if (bX - bD / 2 <= pX + pW && bY >= pY - pH / 2 && bY <= pY + pH / 2) {
    let range = (bY - pY) / (pH / 2);
    let angle = range * maxAngle; //range is -1.3 to 1.3
    //update ball's velocity after collision
    vX = vMax * cos(angle);
    vY = vMax * sin(angle);
  }

  //update ball's collision with computer's paddle
  if (bX + bD / 2 >= width - pW && bY >= cY - pH / 2 && bY <= cY + pH / 2) {
    let range = (bY - cY) / (pH / 2);
    let angle = range * maxAngle; //range is -1.3 to 1.3
    //update ball's velocity after collision
    vX = -vMax * cos(angle);
    vY = vMax * sin(angle);
  }

  //bounce ball when hitting the wall
  if (bY + bD / 2 >= height) {
    //bottom wall
    vY *= -1;
    bY = height - bD / 2;
  }
  if (bY - bD / 2 <= 0) {
    //top wall
    vY *= -1;
  }
  if (!gameEnd) {
    if (bX - bD / 2 <= 0) {
      //left wall
      vX = vX * -1;
      bX = bD / 2;
      //computer score increases
      cScore++;
    }
    if (bX + bD / 2 >= width) {
      //right wall
      vX *= -1;
      bX = width - bD / 2;
      //player score increases
      pScore++;
    }
  }
//Only draws when the game has ended
  if (gameEnd) {
    textSize(24);
    if(cScore > pScore){
        text(computerWin, 0.5 * width, 0.4 * height);
    }
    else{
        text(userWin, 0.5 * width, 0.4 * height);
    }
    
  }

  //draw an ellipse
  fill(0)
  stroke(0);
  ellipse(bX, bY, bD);
  

  //change the text size

  textSize(24);
  
  text(pScore, 0.4 * width, 0.1 * height);
  text(pName, 0.39 * width, 0.05 * height);
  text(cScore, 0.6 * width, 0.1 * height);
  text(cName, 0.59 * width, 0.05 * height);
}



//end game state
function endGame() {
  if (cScore === 2 || pScore === 2) {
    gameEnd = true;
    freeze = false;
    vX = 0;
    vY = 0;
  }
}

function keyPressed() {
  if (key === "b" && freeze === true) {
    vX = 0;
    vY = 0;
    freeze = false;
  }
  if (key === "c" && freeze === false) {
    vX = -vMax;
    vY = vMax;
    freeze = true;
  }

  if (gameEnd === true && key === "r") {
    restart();
    
  }

  if (key === "a") {
    console.log("help left");
    pV = -4;
  }
  if (key === "s") {
    console.log("help right");
    pV = 4;
  }
  //demo for computer
  if (key === "i") {
    cV = -4;
  }
  if (key === "k") {
    cV = 4;
  }
}
