

function setup(){
    createCanvas(600,400);

}

function draw(){
    background(0);
    strokeWeight(4);
    stroke(255);

    for(let x = 0; x <= width; x+= 50){
        fill(255, 0, 200);
        ellipse(x, 200, 25, 25);
    }

    /*let x = 0;
    while(x <= width){
        
        ellipse(x, 200, 25, 25);
        x += 50;  
    }
    */
}