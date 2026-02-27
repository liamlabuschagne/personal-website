var playerPaddle;
var enemyPaddle;
var speed = 5;
var enemySpeed = 2.5;
var playerDirY = 0;
var playerPoint = 0;
var enemyPoint = 0;
var playerCollision = false;
var enemyCollision = false;
var a;
var ballSpeed = 8;
var brains = 5;
var frameC = 0;
var frameC2 = 0;
var frameCo = 0;
var bounce;
var enemyAdd = false;
var playerAdd = false;
var number = 10;
var mode = 0;
var start;
var p = 0;
function setup(){

  createCanvas(600,400);

  playerPaddle = createSprite(10,height/2,20,100);
  playerPaddle.shapeColor = color(255);
  
  enemyPaddle = createSprite(width-10,height/2,20,100);
  enemyPaddle.shapeColor = color(255);

  ball = createSprite(width/2,height/2,10,10);
  ball.shapeColor = color(255);
  ball.setSpeed(ballSpeed,0);
  bounce = new Audio("media/bounce.wav");
  playerPoint = 0;
  enemyPoint = 0;
}
function startGame(){
	start = true;
    ball.setSpeed(ballSpeed,0);
    ball.position.x = width/2;
}
function setDiff(n){
    brains = n;
}
function setMode(n){
	mode = n;
}
function setN(n){
	number = n;
}
function draw(){
	if(p2){
      document.getElementById('script').src = "pong2p.js";
    }
	if(start){
    background(0,0,0);
    stroke(255);
    strokeWeight(10);
    line(width/2,0,width/2,height);
    noStroke();
    textSize(32);
    if(enemyAdd && frameCo < 60){
      fill(0,255,0);
      text("+1", 230, 100);
      frameCo++;
    }
    if(playerAdd && frameCo < 60){
      fill(0,255,0);
      text("+1",width-170, 100);
      frameCo++;
    }
    if(frameCo == 60){
    	frameCo = 0;
    	playerAdd = false;
    	enemyAdd = false;
    }
    textSize(32);
    fill(255);
    text(playerPoint, 200, 100);
    text(enemyPoint,width-200, 100);
    moveBall();
    drawSprites();
    if(mode == 0){
    	if(number == 0){
    		noLoop();
    	}
		if(enemyPoint == number){
           noLoop();
           textSize(50);
           fill(255);
           text("Win",350,200);
		}
		if(playerPoint == number){
		   noLoop();
           textSize(50);
           fill(255);
           text("Win",100,200);
		}
	}
  }
}

function keyPressed(){
	if(keyCode == UP_ARROW || key == 'W'){
		playerDirY = 0;
		playerDirY = -speed; 
	}
	else if(keyCode == DOWN_ARROW || key == 'S'){
		playerDirY = 0;
        playerDirY = speed;
	}
}

function keyReleased(){
	playerDirY = 0;
}
function moveBall(){
	if(ball.position.x > width-5){
		bounce.play();
		if(ball.collide(enemyPaddle)){
		  bounce.play();
	      ball.position.x = width-23;
	      var num = enemyPaddle.position.y - ball.position.y;
	      ball.setSpeed(ballSpeed,180-num/2+10);
	    }
	    else{
	      ball.position.x = width-5;
	      playerPoint++;
	      enemyAdd = true;
	      playerAdd = false;
	      a = ball.getDirection();
	      ball.setSpeed(ballSpeed,180-a);
	    }
	}
	if(ball.position.x < 5){
		bounce.play();
		if(ball.collide(playerPaddle)){
		  bounce.play();
	      ball.position.x = 23;
	      var num = playerPaddle.position.y - ball.position.y;
	      ball.setSpeed(ballSpeed,num/2+10);
	    }
	    else{
	      ball.position.x = 5;
	      enemyPoint++;
	      enemyAdd = false;
	      playerAdd = true;
	      a = ball.getDirection();
		  ball.setSpeed(ballSpeed,180-a);
		}
    }
	if(ball.position.y < 5){
		bounce.play();
		ball.position.y = 6;
		a = ball.getDirection();
		ball.setSpeed(ballSpeed, 360-a);
	}
	if(ball.position.y > height-5){
		bounce.play();
		ball.position.y = height-10;
		a = ball.getDirection();
		ball.setSpeed(ballSpeed,360-a);
	}
	if(frameC > 30-brains){
      frameC2++;
      if(frameC2 < 30){
	  if(ball.position.y > enemyPaddle.position.y+30){
		enemySpeed = speed+brains/10-1;
	  }
	  else if(ball.position.y < enemyPaddle.position.y-30){
		enemySpeed = -speed+brains/10-1;
	  }
	  else{
	  	enemySpeed = 0;
	  }
      }
      else{
    	frameC2 = 0;
    	frameC = 0;
      }
    }
    else{
    	enemySpeed = 0;
    }
	frameC++;
	if(playerPaddle.position.y > height-50){
		    playerDirY = 0;
            playerPaddle.position.y = height-50;
	}
    if(playerPaddle.position.y < 50)
    {
            playerDirY = 0;
            playerPaddle.position.y = 50;
    }
	if(enemyPaddle.position.y > height-50){
		enemySpeed = speed;
	}
	if(enemyPaddle.position.y > height-50){
		enemySpeed = -speed;
	}
	playerPaddle.position.y += playerDirY;
	enemyPaddle.position.y += enemySpeed;
}	