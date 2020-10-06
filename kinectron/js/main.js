let kinectron;

function setup() {
    createCanvas(600, 400);
    kinectron = new Kinectron("192.168.86.47");
    kinectron.setKinectType("azure");
    kinectron.makeConnection();
    kinectron.startTrackedBodies(drawSkeleton);
}


function draw() {
    background(0);
}

function drawSkeleton(body) {
    // Clear the background
    background(0, 20);
  
    // Draw a circle at the location of each joint
    for (let i = 0; i < body.joints.length; i++) {
      // Get the joint
      let joint = body.joints[i];
  
      // Set the drawing color
      fill(100);
  
      // Map Kinect joint data to canvas size; Draw the circle
      ellipse(
        joint.depthX * myCanvas.width,
        joint.depthY * myCanvas.height,
        15,
        15
      );
    }
  }