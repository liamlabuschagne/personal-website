document.getElementById('gameOver').style = "visibility: hidden; height: 0px; font-size: 0px;";
document.getElementById('btn').style = "height: 0px";
document.getElementById('btn').style.visibility = "hidden";

var blockCollide = false;
var coinCollide = false;
var collide = true;
var xspeed = 0; 
var jump = false;
var jumpCount = 0;
var G = 16;
var Force;
var jump;
var points = 0;
var gameOver = false;
var blocks = [];
var player;
var falling;
var enemy;
var stop = true;
var bars = [];
var dir;
var name;

var xspeed = 0;
  var music = new Audio("media/music.mp3");
  music.play();
function setup() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  createCanvas(width, 400);
  player = createSprite(0, height-25, 50, 50);
  player.shapeColor = color(0,0,255);
  blocks.length = 10;

  //Make Blocks
  for(var i = blocks.length-1; i >= 0; i--){
  	if(i == blocks.length-1){
  		blocks[i] = createSprite(player.position.x + 150, player.position.y - 40, 60, 20);
      blocks[i].shapeColor = color(255);
      blocks[i].touched = false;
    }
  	else{
  	  blocks[i] = createSprite(blocks[i+1].position.x + random(150,250), random(200, 300), 60, 20);
      blocks[i].shapeColor = color(255);
      blocks[i].touched = false;
    }
}
  dir = -5;
}

function submitScore()
{
	var game = "Box 'n' Blox";
  window.location = "../?action=submitscore&score="+points+"&game="+game;
}

function draw() {
  if(!gameOver && stop){
  background(50);
  translate(-player.position.x + 200,0);
    //Allow to fall off the blocks
    if(blockCollide == true && collide && xspeed != 0){
        	collide = false;
    }
    //Jump Function
    if (jump && collide == false && jumpCount == 0)
    {
        player.position.y -= Force;
        Force -= 1;
        falling = true;
    }
    else{
        player.position.y = player.position.y;
        falling = false;
    }
    //----------All Collisions------------
    collision();
    //--------End of Collisions-----------

    //--------Movement--------------------
    if(xspeed == 10 || xspeed == -10){
      player.position.x += xspeed;
    }
    for(i = 0; i < bars.length; i++)
    {
      if(bars[i] != undefined){
      if(bars[i].position.y == 50){
        dir = 5;
      }
      else if(bars[i].position.y == height - 50){
        dir = -5;
      }
      bars[i].position.y += dir;
      }
    }
    //--------End of Movement-------------
    drawSprites();
    document.getElementById('coins').innerHTML = "Score: " + points;
    }else{
    music.pause();
    var dead = new Audio("media/dead.mp3");
    dead.play();
    stop = true;
	   noCanvas();
	   document.getElementById('gameOver').innerHTML = "You died With "+ points +" Points!";
     document.getElementById('info').style.visibility = 'hidden';
     document.getElementById('btn').style = "height: auto";
     document.getElementById('btn').style.visibility = "visible";
     document.getElementById("submitBtn").style.display = "block";
    }
}
function collision(){
  for(var i = 0; i < blocks.length; i++){
  	if(player.collide(blocks[i]) && player.position.y < blocks[i].position.y - 34){
       if(blocks[i].touched == false){
        points++;
        blocks[i].touched = true;
        blocks[i].shapeColor = color(0,200,0);
        if(bars[i] != undefined){
          bars[i].shapeColor = color(51);
        }
        choice = floor(random(0,2));
        if(choice == 0){
        bars[i] = createSprite(blocks[i].position.x + 100, height/2, 3, 100);
        bars[i].shapeColor = color(255,0,0);
        }
        else{
          bars[i] = undefined;
          bars.length--;
        }
       }
  		 player.position.y = player.position.y;
       collide = true;
       blockCollide = true;
       if(i != 9){
         blocks[i+1].position.x = blocks[0].position.x + 200;
         blocks[i+1].touched = false;
         blocks[i+1].shapeColor = color(255);
         blocks.move(i+1, 0);
       }
  	}
  }
  for(var i = 0; i < bars.length; i++){
    if(bars[i] != undefined){
      if(player.collide(bars[i])){
        var smash = new Audio("media/smash.mp3");
        smash.play();
        gameOver = true;
      }
    }
  }
  if(player.position.y > 374 && player.position.x > 200){
    var smash = new Audio("media/smash.mp3");
    smash.play();
    gameOver = true;
  }
  else if(falling && player.position.y > 374){
    player.position.y = 375;
    falling = false;
    collide = true;
  }
}
function keyPressed(){
	if(keyCode == LEFT_ARROW){
		xspeed = -10;
	}
	else if(keyCode == RIGHT_ARROW){

		xspeed = 10;
	}
	if(keyCode == UP_ARROW){
		if(collide){
      var audio = new Audio("media/jump.mp3");
      audio.play();
           jump = true;
           Force = G;
           collide = false;
           jumpCount = 0;
           falling = true;
        }
        else if(jumpCount == 1) {
        	Force = -25;
        }
    }
}
function touchStarted() {
  if(collide){
      var audio = new Audio("media/jump.mp3");
      audio.play();
           jump = true;
           Force = G;
           collide = false;
           jumpCount = 0;
           falling = true;
           xspeed = 10;
        }
        else if(jumpCount == 1) {
          Force = -25;
        }
}

function touchEnded(){
    xspeed = 0;
}
function keyReleased(){
    xspeed = 0;
}
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

