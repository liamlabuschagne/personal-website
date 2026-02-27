var r0;
var r1;
var op;
var can;
var uan;
var score = 0;
var q = 1;
var time = 60;
var started = false;
var inARow = 0;
var wait = false;
var d = false;

next();

function start()
{
	if(!started)
	{
		started = true;
		setInterval(function()
		{
			if(time > 0)
			{
				if(!wait)
				{
					time--;
					document.getElementById('time').innerHTML = "Time left: " + time + " seconds";
				}
			}
			else {
				done();
			}
		}
		,1000);
	}
}

document.getElementById('but').style = "visibility: hidden;";

function cont()
{
	document.getElementById('p0').style = "color: blue";
	q++;
	document.getElementById('q').innerHTML = "Question: " + q;
	document.getElementById('i').value = "";
	next();
}

document.addEventListener("keydown", function(e) 
{
	if(e.keyCode == 13)
	{
		start();
		if(uan == can)
		{
			score++;
			inARow++;
			if(inARow == 10)
			{
				inARow = 0;
				time += 5;
				var now = document.getElementById('time').innerHTML;
				document.getElementById('time').innerHTML = now + " + 5";
				wait = true;
				setTimeout(function(){wait = false;},1000);
			}
			document.getElementById('score').innerHTML = "Score: " + score;
			cont();
		}
		else 
		{
			inARow = 0;
			document.getElementById('p0').style = "color: red";
			document.getElementById('p0').innerHTML = can;
			setTimeout(cont,1000);
		}
	}
});

function done()
{
	if(!d)
	{
		d = true;
		var parent = document.getElementById("body");

		var child = document.getElementById("q");
		parent.removeChild(child);
		child = document.getElementById("score");
		parent.removeChild(child);
		child = document.getElementById("i");
		parent.removeChild(child);
		child = document.getElementById("time");
		parent.removeChild(child);

		document.getElementById('p0').innerHTML = "You finished with the score: " + score;
		document.getElementById('but').style = "visibility: shown;";
	}
}

function next()
{
	r0 = (Math.floor(Math.random() * 100)) % 10;
	r1 = (Math.floor(Math.random() * 100)) % 10;
	op = (Math.floor(Math.random() * 100)) % 4 + 1;
	switch(op)
	{
		case 1:
			op = '+';
			can = r0 + r1;
			break;
		case 2:
			op = '-';
			can = r0 - r1;
			break;
		case 3:
			op = 'x';
			can = r0 * r1;
			break;
		case 4:
			op = '/';
			if(r0 % r1 == 0 && r0 != 0 && r1 != 0)
				can = r0 / r1;
			else
				next();
				break;
	}

	document.getElementById('p0').innerHTML = r0 + " " + op + " " + r1;
}
