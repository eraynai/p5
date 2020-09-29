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
let gameEnd;
let gameStart = true;
let computerWin = `Jeb has won! Press the "r" key to Play Again`;
let userWin = `Jobb has won! Press the "r" key to Play Again`;
let intro = "Welcome to Jobb vs Jeb";
let intro2 = "The First One to Score 10 Wins the Game";
let intro3 = `To Start Press the "S" to Start the Game`;
let intro4 = `You Play Jobb, so Press "A" and "L" to Move Them Up and Down`;

/*function that loads images into the game */
function preload() {
  creature1 = loadImage("img/creature1.png");
  creature2 = loadImage("img/creature2.png");
}

function setup() {
  createCanvas(innerWidth, 0.9 * innerHeight);

  restart();

  maxAngle = (75 / 180) * PI;
  botLevel = 0.1;
}

function draw() {
  startGame();
  endGame();
  background(253, 187, 45);
  //color of the line
  stroke(255);
  //thickness of the line
  strokeWeight(0);
  //line(windowWidth/2, 0, windowWidth/2, height);

 
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

  //Only draw when the game starts
  if (gameStart) {
    textSize(27);
    if (cScore === 0 && pScore === 0) {
      text(intro, 0.42 * width, 0.3 * height);
      text(intro2, 0.34 * width, 0.35 * height);
      text(intro3, 0.35 * width, 0.4 * height);
      text(intro4, 0.25 * width, 0.45 * height);
    } /*else if (cScore === 0 && pScore === 0 && gameStart === false) {
      text();
    }*/
  }
  //Only draws when the game has ended
  if (gameEnd) {
    textSize(24);
    if (cScore > pScore) {
      text(computerWin, 0.5 * width, 0.4 * height);
    } else {
      text(userWin, 0.2 * width, 0.4 * height);
    }
  }

  //draw an ellipse
  fill(0);
  stroke(0);
  ellipse(bX, bY, bD);

  //change the text size

  textSize(24);

  text(pScore, 0.4 * width, 0.1 * height);
  text(pName, 0.39 * width, 0.05 * height);
  text(cScore, 0.6 * width, 0.1 * height);
  text(cName, 0.59 * width, 0.05 * height);
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
  vX = 0;
  vY = 0;

  pScore = 0;
  cScore = 0;
  pName = "Jobb";
  cName = "Jeb";
  gameEnd = false;
}

//start game state
function startGame() {
  if (cScore === 0 && pScore === 0) {
    freeze = false;
  }
}

//end game state
function endGame() {
  if (cScore === 10 || pScore === 10) {
    gameEnd = true;
    freeze = false;
    vX = 0;
    vY = 0;
  }
}

//function to control player
function keyPressed() {
  
  if (key === "s" && freeze === false) {
    vX = -vMax;
    vY = vMax;
    freeze = true;
    gameStart = false;
  }

  if (gameEnd === true && key === "r") {
    restart();
    vX = -vMax;
    vY = vMax;
  }

  if (key === "a") {
    console.log("help left");
    pV = -4;
  }
  if (key === "l") {
    console.log("help right");
    pV = 4;
  }
  
}
