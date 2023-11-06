let ball, floor;
let floors = [];
let boxes = [];

let lastSwitchTime = 0;

let score = 0;

function setup() {

  clear();
 new Canvas(1200, 1200);
 world.gravity.y = 15;

//  box = new Sprite();
//  box.width = 20;
//  box.height = 20;

 ball = new Sprite();
 ball.diameter = 40;
 ball.y = 50;
 ball.color = 'DarkTurquoise';

 for(let i = 0; i < 20; i++){
  let floor = new Sprite();
//  floor = new Sprite();
 floor.y = random(200,1000);
 floor.x = random(width);
 floor.w = random(130,250);
 floor.h = 5;
 floor.collider = 'static';
 floor.collider = 'k';
 floor.velocity.y = -2;
 floor.color = 'pink';
 floors.push(floor);

 if(random() < 0.5) {  // 新增的代码
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
  if (kb.pressing('space')) {
    if (world.gravity.y > 0) {
      ball.vel.y = -7;  // 正常重力时向上跳跃
    } else {
      ball.vel.y = 7;   // 反重力时向下跳跃
    }
  }

 if (kb.pressing('left')) ball.vel.x = -7;
  else if (kb.pressing('right')) ball.vel.x = 7;
  else ball.vel.x = 0; 
  clear();
  background('PapayaWhip');
  //move floor
  for (let i = floors.length - 1; i >= 0; i--) {
    if (floors[i].position.y + floors[i].height < 0) {
        floors.splice(i, 1);
    }
}


if (random() < 0.05) {  // 2% 的概率每帧生成一个新的 floor 对象
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

  if(random() < 0.5) {  // 新增的代码
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
  if (currentTime - lastSwitchTime >=6000) {  // 检查是否已过了5000毫秒（5秒）
    if (world.gravity.y == 15) {
      world.gravity.y = -15;
   
    } else {
      world.gravity.y = 15;
    }
    lastSwitchTime = currentTime;  // 更新 lastSwitchTime 以便下一次切换
  }


  if (ball.position.y <= 0 || ball.position.y >= height) {
    noLoop();  // 停止游戏循环
    textSize(64);  // 设置文本大小
    textAlign(CENTER, CENTER);  // 设置文本对齐方式
    text('Game Over', width/2, height/2);  // 在画布中央显示游戏结束的消

    // textSize(26);  // 设置文本大小
    // textAlign(CENTER, CENTER);  // 设置文本对齐方式
    // text('Press Space', width/2, height/2+50);  // 在画布中央显示游戏结束的消
}

for (let i = 0; i < boxes.length; i++) {
  if (!boxes[i].hasBeenHit && ball.x < boxes[i].x + boxes[i].width &&
      ball.x + ball.diameter > boxes[i].x &&
      ball.y < boxes[i].y + boxes[i].height &&
      ball.y + ball.diameter > boxes[i].y) {
      // 检测到碰撞
      score++;  // 分数增加
      boxes[i].hasBeenHit = true;  // 标记方块为已碰撞
  } else if (boxes[i].hasBeenHit && 
             (ball.x > boxes[i].x + boxes[i].width || 
              ball.x + ball.diameter < boxes[i].x ||
              ball.y > boxes[i].y + boxes[i].height ||
              ball.y + ball.diameter < boxes[i].y)) {
      // 如果球不再碰撞，重置标志
      boxes[i].hasBeenHit = false;
  }
}

// Display the score on the canvas
textSize(32);
textAlign(LEFT, TOP);
text('Score: ' + score, 10, 10);



}

// function keyPressed() {
//   if (key === ' ') {  // 检查是否按下了空格键
//     setup();  // 重启游戏
    

//   }
// }