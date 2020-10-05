
//point position
let pX = 0;
let pY = 0;

//circle center position
let cX = 300;
let cY = 300;
let radius = 100;


function setup(){
    createCanvas(600, 400);
    noCursor();
    strokeWeight(5);
}

function draw(){
    background(255);

    //update point position to mouse co-ordiantes

    pX = mouseX;
    pY = mouseY;

    //check for collision

    let hit = pointCircle(pX, pY, cX, cY, radius);

    //draw circle
    //change color if hit
    if(hit){
        fill(255, 150, 0);
    }
    else {
        fill(0, 150, 255);
    }
    noStroke();
    ellipse(cX, cY, radius * 2, radius * 2);

    //draw the point
    stroke(0);
    point(pX, pY);

}


//POINT/CIRCLE

function pointCircle(pX, pY, cX, cY, r){
    let distX = pX - cX;
    let distY = pY - cY;
    let distance = sqrt((distX *distX) + (distY * distY));
    if (distance <= r){
        return true;
    }
    return false;
}