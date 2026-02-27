var player;
var playerHp = 200;
var playerHpBar;
var bullet;
var playerXdir = 0;
var playerYdir = 0;
var y = 0;

var beginShoot = false;
var shoot;
var bulletDist = 500;
var shotFinished = true;

var enemyBeginShoot = false;
var enemyShoot;
var enemyBulletDist = 500;
var enemyShotFinished = true;

var frameC;
var frameC2 = 0;
var frameC3 = 0;

var enemyHp = 50;
var enemyHpBar;
var newEnemy;
var enemyBullet;

var canShoot = true;
var score = 0;

var backImg;

var gameOver = false;

var enemyHit = false;
var playerHit = false;

var misses = 0;
var hits = 0; 
var shots = 0;

var start = false;
var clicks = 0;
var info = true;

function setup(){
  document.getElementById('btn').style = "height: 0px";
  document.getElementById('btn').style.visibility = "hidden";
  backImg = loadImage("media/backImg.jpg");
  createCanvas(640,480);
  var playerImg = loadImage("media/ship.png");
  var bulletImg = loadImage("media/bullet.png");
  var enemyBulletImg = loadImage("media/enemyBullet.png");
  var enemyImg = loadImage("media/enemyShip.png");
  var explosionImg = loadImage("media/explosion.png");
  player = createSprite(width/2,height-100);
  player.addImage(playerImg);
  playerHpBar = createSprite(player.position.x,player.position.y + 40,200,20);
  playerHpBar.shapeColor = color(0,255,0);
  bullet = createSprite(player.position.x,player.position.y-37);
  bullet.addImage(bulletImg);
  bullet.visible = false;
  enemy = createSprite(width/2,50);
  enemy.addImage(enemyImg);
  enemyHpBar = createSprite(enemy.position.x,enemy.position.y + 40,50,20);
  enemyHpBar.shapeColor = color(255,0,0);
  enemyBullet = createSprite(enemy.position.x,enemy.position.y+37);
  enemyBullet.addImage(enemyBulletImg);
  enemyBullet.visible = false;
  choice = floor(random(1,3));
  if(choice == 1){
    enemy.velocity.x = -3;
  }
  else{
    enemy.velocity.x = 3;
  }
  explosion = createSprite(5000,5000);
  explosion.addImage(explosionImg);
}

function draw(){
  if(!gameOver){
  background(backImg);

  if(!start){
    background(backImg);
    textSize(25);
    fill(255);
    textAlign(CENTER);
    text("Welcome! Click anywhere to begin!", width/2,height/2);
  }else if(info){
    background(backImg);
    textSize(25);
    fill(255);
    textAlign(CENTER);
    text("What to do:", width/2,height/2);
    textSize(15);
    fill(255);
    textAlign(CENTER);
    text("Shoot the enemy with the space bar and move with W A S D or arrow keys!", width/2,height/2+30);
    text("Good Luck!", width/2,height/2+60);
  }  
  else{
  textSize(25);
  fill(255);
  text("HP:"+playerHp, playerHpBar.position.x-40,playerHpBar.position.y+30);

  textSize(25);
  fill(255);
  text("HP:"+enemyHp, enemyHpBar.position.x-40,enemyHpBar.position.y+30);

  if(newEnemy){
    enemy.visible = true;
    enemyHp = 50;
    newEnemy = false;
    score++;
  }
  enemyHpBar.width = enemyHp;
  enemyHpBar.position.y = enemy.position.y + 40;
  enemyHpBar.position.x = enemy.position.x;
  playerHpBar.width = playerHp/4;
  playerHpBar.position.y = player.position.y + 40;
  playerHpBar.position.x = player.position.x;
  frameC++;
  frameC2++;
  frameC3++;
  if(frameC == 30){
    explosion.visible = false;
  }
  if(frameC2 == 60){
  if(enemy.position.x < 60 || enemy.position.x > width-60){
    enemy.position.x = width/2;
  }
  frameC2 = 0;
  choice = floor(random(1,3));
  if(choice == 1){
    enemy.velocity.x = -3;
  }
  else{
    enemy.velocity.x = 3;
  }
  }
  if(bullet.collide(enemy)){
    explosion.visible = true;
    frameC = 0;
    explosion.position.x = enemy.position.x;
    explosion.position.y = enemy.position.y;
    enemyHp -= 10;
    shotFinished = true;
    bullet.position.x = 5000;
    playerHit = false;
    enemyHit = true;
    hits++;
    shots++;
    bulletDist = 500;

    var bomb = new Audio("media/bomb.mp3");
    bomb.play();

  }
  if(enemyBullet.collide(player)){
    explosion.visible = true;
    frameC3 = 0;
    explosion.position.x = player.position.x;
    explosion.position.y = player.position.y;
    playerHp -= 10;
    enemyShotFinished = true;
    enemyBullet.position.x = 5000;
    playerHit = true;
    enemyHit = false;
  }
  if(enemyHp <= 0){
    enemy.visible = false;
    newEnemy = true;
  }
  if(playerHp <= 0){
    player.visible = false;
    gameOver = true;
  }
    player.position.x += playerXdir;
    player.position.y += playerYdir;
  if(beginShoot && shotFinished){
    bullet.position.x = player.position.x;
    bullet.position.y = player.position.y-37;
    shoot = true;
    bullet.visible = true;
    bulletDist = 500;

    var gun = new Audio("media/gun.mp3");
    gun.play(); 

  }
  if(shoot){
    beginShoot = false;
    bullet.position.y -= 20;
    bulletDist -= 20;
    if(bulletDist < 1){
      shoot = false;
      bullet.visible = false;
      shotFinished = true;
      if(bullet.position.y < 5){
        misses++;
        shots++;
      }
    }else{
      shotFinished = false;
    }
  }
  if(frameC3 == 30){
    enemyBeginShoot = true;
    frameC3 = 0;
    explosion.visible = false;
  }
  if(enemyBeginShoot && enemyShotFinished){
    enemyBullet.position.x = enemy.position.x;
    enemyBullet.position.y = enemy.position.y+37;
    enemyShoot = true;
    enemyBullet.visible = true;
  }
  if(enemyShoot){
    enemyBeginShoot = false;
    enemyBullet.position.y += 20;
    enemyBulletDist -= 20;
    if(enemyBulletDist < 1){
      enemyShoot = false;
      enemyBullet.visible = false;
      enemyBulletDist = 500;
      enemyShotFinished = true;
    }
    else{
      enemyShotFinished = false;
    }
  }
  if(player.position.x < 70 || player.position.x > width-70){
    playerXdir = 0;
  }
  if(explosion.visible){
    if(enemyHit){
      explosion.position.x = enemy.position.x;
      explosion.position.y = enemy.position.y;
    }
    else if(playerHit){
      explosion.position.x = player.position.x;
      explosion.position.y = player.position.y;
    }
  }
  drawSprites();
  document.getElementById('score').innerHTML = "Kills: "+score;
  }
}else{

  var dun = new Audio("media/dun.mp3");
  dun.play(); 

  noCanvas();
  if(hits == 0){
    var rate = 0;
  }else{
    var rate = floor(shots/hits*10);
  }
  document.getElementById('scores').innerHTML = "Game over!<br> Stats for the round: <br> Hits: "+hits+"<br>Misses: "+misses+"<br>Total shots: "+shots+"<br>Hit rate: %"+rate;
  document.getElementById('btn').style = "visiblity: shown";
  document.getElementById('btn').style.height = "34px";
  noLoop();
  }
}
  
function keyPressed(){
	if(key == 'A'){
		playerXdir = -10;
	}
	if(key == 'D'){
        playerXdir = 10;
	}
	if(key == 'W'){
        playerYdir = -10;
	}
	if(key == 'S'){
		playerYdir = 10;
	}
  if(keyCode == LEFT_ARROW){
    playerXdir = -10;
  }
  if(keyCode == RIGHT_ARROW){
    playerXdir = 10;
  }
  if(keyCode == UP_ARROW){
    playerYdir = -10;
  }
  if(keyCode == DOWN_ARROW){
    playerYdir = 10;
  }
  if(key == ' '){
    beginShoot = true;
  }
}
function mousePressed(){
  start = true;
  clicks++;
  if(clicks == 2){
    info = false;
  }
}

function keyReleased(){
  playerXdir = 0;
  playerYdir = 0;
}
