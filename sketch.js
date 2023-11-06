let ball, floor;
let floors = [];
let boxes = [];
let lastSwitchTime = 0;
let score = 0;


function setup() {
 new Canvas(1200, 1200);
 world.gravity.y = 15;

//ball
 ball = new Sprite();
 ball.diameter = 40;
 ball.y = 50;
 ball.color = 'DarkTurquoise';

 //  floor 
 for(let i = 0; i < 20; i++){
  let floor = new Sprite();
 floor.y = random(200,1000);
 floor.x = random(width);
 floor.w = random(130,250);
 floor.h = 5;
 floor.collider = 'static';
 floor.collider = 'k';
 floor.velocity.y = -2;
 floor.color = 'pink';
 floors.push(floor);

 //box
 if(random() < 0.5) { 
  let box = new Sprite();
  box.width = 20;
  box.height = 20;
  box.position.x = floor.position.x;
  box.position.y = floor.position.y - floor.height / 2 - box.height / 2;
  boxes.push(box);
  box.color = 'gold';
}
 }
}


function draw() {

  //jump
  if (kb.pressing('space')) {
    if (world.gravity.y > 0) {
      ball.vel.y = -5;  
    } else {
      ball.vel.y = 5;  
    }
  }

  //control ball
 if (kb.pressing('left')) ball.vel.x = -7;
  else if (kb.pressing('right')) ball.vel.x = 7;
  else ball.vel.x = 0; 
  // clear();
  background('PapayaWhip');

  //move floor
  for (let i = floors.length - 1; i >= 0; i--) {
    if (floors[i].position.y + floors[i].height < 0) {
        floors.splice(i, 1);
    }
}

  //add floors
if (random() < 0.05) {  
  let newFloor = new Sprite();
  newFloor.y = height;
  newFloor.x = random(width);
  newFloor.w = random(50, 200);
  newFloor.h = 5;
  newFloor.collider = 'static';
  newFloor.collider = 'k';
  newFloor.velocity.y = -2;
  newFloor.color = 'pink';

  floors.push(newFloor);


  //add boxes
  if(random() < 0.5) {
    let box = new Sprite();
    box.width = 20;
    box.height = 20;
    box.position.x = newFloor.position.x;
    box.position.y = newFloor.position.y - newFloor.height / 2 - box.height / 2;
    boxes.push(box);
    box.color = 'gold';
  }
}

//gravity change
let currentTime = millis();
  if (currentTime - lastSwitchTime >=6000) {
    if (world.gravity.y == 15) {
      world.gravity.y = -15;
   
    } else {
      world.gravity.y = 15;
    }
    lastSwitchTime = currentTime; 
  }

//game over
  if (ball.position.y <= 0 || ball.position.y >= height) {
    noLoop();  
    textSize(64); 
    textAlign(CENTER, CENTER); 
    text('Game Over', width/2, height/2);  

   
}

// get score
for (let i = 0; i < boxes.length; i++) {
  if (!boxes[i].hasBeenHit && ball.x < boxes[i].x + boxes[i].width &&
      ball.x + ball.diameter > boxes[i].x &&
      ball.y < boxes[i].y + boxes[i].height &&
      ball.y + ball.diameter > boxes[i].y) {
     
      score++; 
      boxes[i].hasBeenHit = true; 
  } else if (boxes[i].hasBeenHit && 
             (ball.x > boxes[i].x + boxes[i].width || 
              ball.x + ball.diameter < boxes[i].x ||
              ball.y > boxes[i].y + boxes[i].height ||
              ball.y + ball.diameter < boxes[i].y)) {
      
      boxes[i].hasBeenHit = false;
  }
}

//display
textSize(32);
textAlign(LEFT, TOP);
text('Score: ' + score, 10, 10);

textSize(20);
textAlign(LEFT, TOP);
text('Space: jump' ,10, 50);
text('Collision Box: Score' ,10, 80);
text('Leaving the screen: game over',10,110);
}