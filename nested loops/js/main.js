

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    strokeWeight(4);
    stroke(255);
    for(let x = 0; x <= width; x+=50){
        for(let y = 0; y <= height; y+=50){
        fill(random(255), 0, random(200));
        ellipse(x, y, 25, 25);
        }
        
    }
}
