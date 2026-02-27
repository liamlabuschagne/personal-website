let grid;
let score = 0;
let totalScore = 0;
let time = 0;

let canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 500;
let context = canvas.getContext('2d');

function setup()
{
	grid = [];
	for(let i = 0; i < 4; ++i)
		grid.push([undefined,undefined,undefined,undefined]);

	let rx1 = Math.floor(Math.random()*4);
	let ry1 = Math.floor(Math.random()*4);

	let rx2 = Math.floor(Math.random()*4);
	let ry2 = Math.floor(Math.random()*4);

	while(rx1 == rx2 && ry1 == ry2)
	{
		rx2 = Math.floor(Math.random()*4);
		ry2 = Math.floor(Math.random()*4);
	}

	grid[rx1][ry1] = 2;
	grid[rx2][ry2] = 2;

	setInterval(function(){ ++time; },1000);
}

function submitScore()
{
	var game = "2048";
  	window.location = "../?action=submitscore&score="+totalScore+"&game="+game+"&extra_info=Time: "+time;
}

function gameOver()
{
	context.clearRect(0,0,canvas.width,canvas.height);

	let w = Math.floor(context.measureText("Game Over").width);
	context.fillText("Game Over", canvas.width/2-(w/2), 100);

	w = Math.floor(context.measureText("Your Score: "+score).width);
	context.fillText("Your Score: "+score, canvas.width/2-(w/2), 125);
	document.getElementById('submitBtn').style.display = "block";

	w = Math.floor(context.measureText("Your Time: "+time).width);
	context.fillText("Your Time: "+time, canvas.width/2-(w/2), 150);
	document.getElementById('submitBtn').style.display = "block";

	totalScore = (1000 - time) + score;

	w = Math.floor(context.measureText("Your Total Score: "+totalScore).width);
	context.fillText("Your Total Score: "+totalScore, canvas.width/2-(w/2), 175);

	w = Math.floor(context.measureText("Scroll down to submit score").width);
	context.fillText("Scroll down to submit score", canvas.width/2-(w/2), 200);
	document.getElementById('submitBtn').style.display = "block";
}

function checkForGameOver()
{
	let full = true;
	// Check if full
	for(let i = 0; i < 4; ++i)
	{
		for(let j = 0; j < 4; ++j)
		{
			if(grid[i][j] == undefined)
			{
				full = false;
				break;
			}
		}
		if(!full)
			break;
	}

	if(full)
	{
		// Check if their is an available move.
		let availableMove = false;
		for(let i = 0; i < 4; ++i)
		{
			for(let j = 0; j < 4; ++j)
			{
				let x = grid[i][j];

				// Check top
				if(j-1 >= 0 && grid[i][j-1] == x)
					availableMove = true;

				// Check bottom
				if(j+1 <= 3 && grid[i][j+1] == x)
					availableMove = true;

				// Check Left
				if(i-1 >= 0 && grid[i-1][j] == x)
					availableMove = true;

				// Check Right
				if(i+1 <= 3 && grid[i+1][j] == x)
					availableMove = true;

			}
			if(availableMove)
				break;
		}
		if(!availableMove)
			gameOver();
	}
}

function update(key)
{
	// Slide for up
	if(key == "ArrowUp")
	{
		for(let n = 0; n < 4; ++n)
		{
			for(let i = 0; i < 4; ++i)
			{
				for(let j = 1; j < 4; ++j)
				{
					if(grid[i][j-1] == grid[i][j] && grid[i][j] != undefined && grid[i][j] != 2048)
					{
						grid[i][j] = undefined;
						grid[i][j-1] += grid[i][j-1]; 
					}
					else if(grid[i][j-1] == undefined)
					{
						grid[i][j-1] = grid[i][j];
						grid[i][j] = undefined;
					}
				}
			}
		}
	} // Slide for down
	else if(key == "ArrowDown")
	{
		for(let n = 0; n < 4; ++n)
		{
			for(let i = 0; i < 4; ++i)
			{
				for(let j = 0; j < 3; ++j)
				{
					if(grid[i][j+1] == grid[i][j] && grid[i][j] != undefined && grid[i][j] != 2048)
					{
						grid[i][j] = undefined;
						grid[i][j+1] += grid[i][j+1]; 
					}
					else if(grid[i][j+1] == undefined)
					{
						grid[i][j+1] = grid[i][j];
						grid[i][j] = undefined;
					}
				}
			}
		}
	} //Slide for left
	else if(key == "ArrowLeft")
	{
		for(let n = 0; n < 4; ++n)
		{
			for(let i = 1; i < 4; ++i)
			{
				for(let j = 0; j < 4; ++j)
				{
					if(grid[i-1][j] == grid[i][j] && grid[i][j] != undefined && grid[i][j] != 2048)
					{
						grid[i][j] = undefined;
						grid[i-1][j] += grid[i-1][j]; 
					}
					else if(grid[i-1][j] == undefined)
					{
						grid[i-1][j] = grid[i][j];
						grid[i][j] = undefined;
					}
				}
			}
		}
	} // Slide for right
	else if(key == "ArrowRight")
	{
		for(let n = 0; n < 4; ++n)
		{
			for(let i = 0; i < 3; ++i)
			{
				for(let j = 0; j < 4; ++j)
				{
					if(grid[i+1][j] == grid[i][j] && grid[i][j] != undefined && grid[i][j] != 2048)
					{
						grid[i][j] = undefined;
						grid[i+1][j] += grid[i+1][j]; 
					}
					else if(grid[i+1][j] == undefined)
					{
						grid[i+1][j] = grid[i][j];
						grid[i][j] = undefined;
					}
				}
			}
		}
	}

	if(Math.random() > 0.5)
	{
		// Add a 2 to the board

		let rx = Math.floor(Math.random()*4);
		let ry = Math.floor(Math.random()*4);

		while(grid[rx][ry] != undefined)
		{
			if(rx > 0)
				rx--;
			else if(ry > 0)
				ry--;
			else
			{
				rx = Math.floor(Math.random()*4);
				ry = Math.floor(Math.random()*4);
			}
		}

		grid[rx][ry] = 2;
	}
	else
	{
		let rx = Math.floor(Math.random()*4);
		let ry = Math.floor(Math.random()*4);

		while(grid[rx][ry] != undefined)
		{
			if(rx > 0)
				rx--;
			else if(ry > 0)
				ry--;
			else
			{
				rx = Math.floor(Math.random()*4);
				ry = Math.floor(Math.random()*4);
			}
		}

		grid[rx][ry] = 4;
	}
	draw();
}

function draw()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	for(let i = 0; i < 4; ++i)
	{
		for(let j = 0; j < 4; ++j)
		{
			if(grid[i][j] != undefined)
			{
				let x = grid[i][j];
				switch(x)
				{
					case 2:
						context.fillStyle = "rgba(255,255,255,128)";
						break;
					case 4:
						context.fillStyle = "rgba(255,255,128,128)";
						break;
					case 8:
						context.fillStyle = "rgba(255,255,64,128)";
						break;
					case 16:
						context.fillStyle = "rgba(255,128,64,128)";
						break;
					case 32:
						context.fillStyle = "rgba(255,64,64,128)";
						break;
					case 64:
						context.fillStyle = "rgba(255,0,0,128)";
						break;
					case 128:
						context.fillStyle = "rgba(64,128,0,128)";
						break;
					case 256:
						context.fillStyle = "rgba(0,255,0,128)";
						break;
					case 512:
						context.fillStyle = "rgba(0,64,128,128)";
						break;
					case 1024:
						context.fillStyle = "rgba(0,0,255,128)";
						break;
					case 2048:
						context.fillStyle = "rgb(255,215,0)";
						break;
				}
			}
			else
			{
				context.fillStyle = "#eee";
			}
			context.fillRect(i*100,(j*100)+100,100,100);
			context.fillStyle = "#000000";
			context.rect(i*100,(j*100)+100,100,100);
			context.stroke();

			if(grid[i][j] != undefined)
			{
				let x = grid[i][j];
				let str = x.toString();
				context.font = "25px Arial";
				let w = Math.floor(context.measureText(str).width);
				context.fillText(str,(i*100)+50-(w/2),(j*100+50+5)+100);
			}
		}
	}

	// Sum all tiles to get score
	score = 0;
	for(let i = 0; i < 4; ++i)
	{
		for(let j = 0; j < 4; ++j)
		{
			if(grid[i][j] != undefined)
				score+=grid[i][j];
		}
	}

	// Add score text

	let w = Math.floor(context.measureText("Score: "+score).width);
	context.fillText("Score: "+score, canvas.width/2-(w/2), 25);

	w = Math.floor(context.measureText("Time: "+time+" secs").width);
	context.fillText("Time: "+time+" secs", canvas.width/2-(w/2), 50);

	checkForGameOver();
}

window.addEventListener('keydown',function(e) {
	if(e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight")
		e.preventDefault();
});
window.addEventListener('keyup', function(e) {
	update(e.key);
});

var xDown = null;                                                        
var yDown = null;  

canvas.addEventListener('touchstart', function(evt) {                                
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}, false);

canvas.addEventListener('touchmove', function(evt) {
	evt.preventDefault();
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            update("ArrowLeft");
        } else {
            update("ArrowRight");
        }                       
    } else {
        if ( yDiff > 0 ) {
            update("ArrowUp"); 
        } else { 
            update("ArrowDown");
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}, false);
                                                      
