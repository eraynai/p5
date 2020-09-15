let ball = {
    x: 300,
    y: 200,
    xSpeed: 4,
    ySpeed: -3
}

function setup() {
    createCanvas(600, 400);
}


function draw() {
    background(0);
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(ball.x, ball.y, 24, 24);

    if(ball.x > width || ball.x < 0){
        ball.xSpeed = ball.xSpeed * -1;   
    }
    if(ball.y > height || ball.y < 0){
        ball.ySpeed = ball.ySpeed * -1;
    }

    ball.x = ball.x + ball.xSpeed;
    ball.y = ball.y + ball.ySpeed;
}

function move(){

}

function bounce(){

}

function display(){
    
}