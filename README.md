# HW09
I want to make a 2D platform jumping game based on the p5 play library

Game Design:
1. there are many platforms in the screen that move upwards
2. The main character is a sphere, the player can control the sphere to move left and right and jump.
3. When the ball collides into the square, it scores a point.
4. Every 6 seconds, the gravity of the world will be reversed.
5. When the sphere touches the top or bottom of the screen, the game ends.

![G58jvW.jpg](https://imgpile.com/images/G58jvW.jpg)

![G5Vns1.jpg](https://imgpile.com/images/G5Vns1.jpg)


I found the following function on the p5 play website that might work for my project

Dynamic and static colliders
![G5A3Rk.png](https://imgpile.com/images/G5A3Rk.png)

Rising platform
![G5V10L.png](https://imgpile.com/images/G5V10L.png)

segmented motion
![G5LXya.png](https://imgpile.com/images/G5LXya.png)

anti gravity
![G5O0hF.png](https://imgpile.com/images/G5O0hF.png)

I want to have new floors appearing from the bottom of the screen all the time. I create an array of floors to store all the floors, then initialize some floor objects in the setup function and update their positions in the draw function. Then randomly generate new floors in the draw function and add them to the floors array.

I want to create a lot of small squares and have them appear randomly on the floors. I created a new array called boxes to store the squares. I can create and place small squares at the same time I create the floor. To achieve a certain probability of placing a cube on each floor, I use the random() function to decide if I want to create and place a cube.

To implement an automatic gravity switch every 5 seconds, I can use the millis() function to get the number of milliseconds since the program started running.

Regarding the score system, I started with the following code:

for (let i = 0; i < boxes.length; i++) {
    // Assuming you have x, y, width, and height properties for ball and box
    if (ball.x < boxes[i].x + boxes[i].width &&
        ball.x + ball.width > boxes[i].x &&
        ball.y < boxes[i].y + boxes[i].height &&
        ball.y + ball.height > boxes[i].y) {
        // Collision detected
        score++;  // Increase score
        // Note: No removal of the box from the array
    }
  }

 But if this is the case, the score will keep increasing when the sphere touches a box, and you can't implement a touch and add mechanism. So I added the hasBeenHit attribute, which is used to mark whether each box has been collided by a ball.

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

If I have time later, I might consider adding some other fun elements like some floors rotating, etc.

  ![G5BrA8.png](https://imgpile.com/images/G5BrA8.png)