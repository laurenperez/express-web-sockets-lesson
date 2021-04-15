// we are using P5 to sketch on a canvas.

var socket;

// for drawing
var x = 0;
var y = 0;


// this is where i initilize my canvas parameters
function setup(){
createCanvas(500,500);
background(0);

// start a socket connection to the server
socket = io.connect('http://localhost:3000');

// this is what grabs data from the front end
socket.on('mouse', function(data){
  console.log('Got:' + data.x + " " + data.y);
  fill(0,0,255);
  noStroke();
  ellipse(data.x, data.y, 15, 15);
});

}

function mouseDragged(){
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 15, 15);
  // send mouse coordinates from draw function
  sendMouse(mouseX, mouseY);
}

function sendMouse(xpos, ypos){
  console.log("sendMouse: " + xpos + " " + ypos);
  var data = {
    x: xpos,
    y: ypos
  };
  socket.emit('mouse', data);
}

// render on your canvas
function draw(){
  background(0);
  fill(230, 0, 175);
  noStroke();
  ellipse(x,y,50,50);
  if (x > 500 || y > 500) {
    x = 0;
    y = 0;
  }
  x += 1;
  y += 1;
  //this is where animations usually go
}
