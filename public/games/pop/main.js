var barrelImg;
var pirateImg;

var holes = [];
var turn = 0;
var WIDITH = 640;
var HEIGHT = 480;

var barrelD = 200;
var barrelX = WIDITH/2 - barrelD/2;
var barrelY = HEIGHT/2 - barrelD/2;

var distX;
var distY;

var lost = false;

var menu = true;

var clicks = 0;
var start = false;

var ar;

function preload()
{
	ar = loadSound("images/ar.mp3");
}

function setup(){
	createCanvas(WIDITH, HEIGHT);
	barrelImg = loadImage("images/barrel.png");
	pirateImg = loadImage("images/pirate.png");

	var d = barrelD / 4;
	var x = barrelX + (d/2);
	var y = barrelY + (d/2);

	var n = Math.floor(Math.random() * 15);
	for(var i = 0; i <= 15; i++)
	{
		holes[i] = createSprite(x, y, d/2, d/2);
		
		switch(i)
		{
			//red = color(255,0,0);
			//green = color(0,255,0);
			//blue = color(0,0,255);
			//yellow = color(255,255,0);

			case 0: holes[i].shapeColor = color(255,0,0); break;
			case 1: holes[i].shapeColor = color(0,255,0); break;
			case 2: holes[i].shapeColor = color(0,0,255); break;
			case 3: holes[i].shapeColor = color(255,255,0); break;
			case 4: holes[i].shapeColor = color(0,255,0); break;
			case 5: holes[i].shapeColor = color(0,0,255); break;
			case 6: holes[i].shapeColor = color(255,255,0); break;
			case 7: holes[i].shapeColor = color(255,0,0); break;
			case 8: holes[i].shapeColor = color(0,0,255); break;
			case 9: holes[i].shapeColor = color(255,255,0); break;
			case 10: holes[i].shapeColor = color(255,0,0); break;
			case 11: holes[i].shapeColor = color(0,255,0); break;
			case 12: holes[i].shapeColor = color(255,255,0); break;
			case 13: holes[i].shapeColor = color(255,0,0); break;
			case 14: holes[i].shapeColor = color(0,255,0); break;
			case 15: holes[i].shapeColor = color(0,0,255); break;
		}

		if(i == n){
			holes[i].trigger = true;
		}
		else{
			holes[i].trigger = false;
		}
		if(x <= barrelX + (d * 3)){
			x += d;
		}
		else {
			y += d;
			x = barrelX + (d/2);
		}
	}

}

function draw(){
	background(50);
	if(menu){
		s = "Instructions: Take turns clicking on spots to poke a sword through, but dont poke the pirate!";
		fill(255, 255, 255);
		textSize(28);
		text(s, WIDITH/2- 200, HEIGHT/2 - 100, 400, 400);
	}
	else {
		if(lost){
			renderBarrel();
			image(pirateImg, WIDITH/2 - 100, 0, 180, 180);
		}
		else {
		renderBarrel();
		drawSprites();
		}
	}
}

function mousePressed(){
	clicks++;
	if(clicks == 2){
		start = true;
	}
	if(menu){
		menu = false;
	}
	if(start){
	for(i = 0; i <= 15; i++){
    if(!undefined){
		distX = Math.max(mouseX, holes[i].position.x) - Math.min(mouseX, holes[i].position.x);
		distY = Math.max(mouseY, holes[i].position.y) - Math.min(mouseY, holes[i].position.y);

		if(distX < 20 && distY < 20){
			
			if(!holes[i].trigger){
	    			holes[i].remove();
	    			holes[i].remove();
    		}
    		else {
    			lost = true;
    			ar.play();
    		}
		}
	}
}
    }
}

function renderBarrel() {
	image(barrelImg, barrelX, barrelY, barrelD, barrelD);
}

