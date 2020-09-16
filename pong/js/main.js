
//variables
let pX, pY, pW, pH;
let bX, bY, bD, vX, vY;
let maxAngle;
let cX, cY, cV;
let botLevel;
let pScore, cScore;
let cat;


function preload(){
    cat = loadImage('img/cat.png');
}

function setup(){
    createCanvas(1000, 800);
    let title = createElement('h1', 'This is the End');
    title.addClass('firstTitle');
    pX = 0;
    pY = height/2;
    pW = 100;
    pH = 100;
    pV = 0; //Paddle's Velocity

    cX = width - pW;
    cY = height/2;
    cV = 0;

    bX = width/2;
    bY = height/2;
    bD = height/20; //ball's diameter

    vMax = 6; //max velocity
    vX = -vMax;
    vY = vMax;

    maxAngle = 75 / 180 * PI;
    botLevel = 0.1;

    pScore = 0;
    cScore = 0;

    pName = "Player";
    cName = "AI";
}

function draw(){
    background(0);
    //color of the line
    stroke(255);
    //thickness of the line
    strokeWeight(4);
    //line(windowWidth/2, 0, windowWidth/2, height);
   
    //draw dash lines for the net on the board
    for(let i = 0; i < height/10; i++){
        line(width/2, height/10 * i, width/2, height/20 + height/10 * i);
    }

    //player
    //update panel's position
    pY += pV; 
    //limit paddle's position
    if(pY < pH/2){
        pY = pH/2;
    }
    if (pY > height - pH/2){
        pY = height - pH/2;
    }
    //fill the area with color 
    fill(255);
    image(cat, pX, pY - pH/2, pW, pH);

    //computer
    //computer controls their movement
    cV = botLevel * (bY - cY);
    //computer paddle should not move faster than player
    if(cV < -4){
        cV = -4;
    }
    if(cV > 4){
        cV = 4;
    }

    cY += cV; 
    //limit paddle's position
    if(cY < pH/2){
        cY = pH/2;
    }
    if (cY > height - pH/2){
        cY = height - pH/2;
    }
    //fill the area with color 
    fill(255);
    rect(cX, cY - pH/2, pW, pH);





    //update ball's position 
    bX += vX;
    bY += vY;
    //update ball's collision with player's paddle
    if(bX - bD/2 <= pX + pW && bY >= pY - pH/2 && bY <= pY + pH/2){
        let range = (bY - pY) / (pH / 2);
        let angle = range * maxAngle; //range is -1.3 to 1.3
        //update ball's velocity after collision 
        vX = vMax * cos(angle);
        vY = vMax * sin(angle);
    }


    //update ball's collision with computer's paddle
    if(bX + bD/2 >= width - pW && bY >= cY - pH/2 && bY <= cY + pH/2){
        let range = (bY - cY) / (pH / 2);
        let angle = range * maxAngle; //range is -1.3 to 1.3
        //update ball's velocity after collision 
        vX = -vMax * cos(angle);
        vY = vMax * sin(angle);
    }




    //bounce ball when hitting the wall
    if(bY + bD/2 >= height){ //bottom wall
        vY *= -1;
        bY = height - bD/2;
    }
    if(bY - bD/2 <= 0){ //top wall
        vY *= -1;
    }
    if(bX - bD/2 < 0){ //left wall
        vX *= -1;
        bX = bD/2;
        //computer score increases
        cScore++;
    }
    if(bX + bD/2 >= width) { //right wall
        vX *= -1;
        bX = width - bD/2;
        //player score increases
        pScore++;
    } 



    //draw an ellipse
    ellipse(bX, bY, bD);

    //change the text size

    textSize(18);
    text(pScore, 0.40*width, 0.10*height);
    text(cScore, 0.60*width, 0.10*height);

    
}

function keyPressed(){
    if(key === 'a'){
        console.log("help left");
        pV = -4;
    }
    if(key === 's'){
        console.log("help right");
        pV = 4;
    }
    //demo for computer
    if(key === 'i'){
        cV = -4;
    }
    if(key === 'k'){
        cV = 4;
    }
}

