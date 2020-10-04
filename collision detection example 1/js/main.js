
let pX, pY;
let targetX = 300;
let targetY = 200;

function setup() {
  createCanvas(600, 400);
  noCursor();
  
}
    

function draw() {
    //update point position to mouse coordinates
    pX = mouseX;
    pY = mouseY;

    //check for collision!
    //if hit, make background orange, if not make White 
    let colliding = pointPoint(pX, pY, targetX, targetY);

    if(colliding){
        background(255, 150, 0);
    }
    else {
        background(255);
    }

    //draw the two points
    stroke(0, 150, 255);
    strokeWeight(40);
    point(targetX, targetY);

    stroke(0, 150);
    strokeWeight(20);
    point(pX, pY);
}

//POINT/POINT Function

function pointPoint(x1, y1, x2, y2){
    if(x1 === x2 && y1 === y2){
        return true;
    }
    return false;
}