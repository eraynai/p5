


function setup(){
createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(0);
    stroke(255);
    noFill();
    ellipse(950, 400, 100, 100);
    if(mouseX > 950){
        fill(255, 0, 200);
    }else{
        clear();
        background(0);
        rectMode(CENTER);
        rect(950, 400, 100, 100);
    }
    
}