var c = document.getElementById('c');
c.width = 300;
c.height = 60;
var ctx = c.getContext('2d');

var dice1 = document.getElementById('dice1');
var dice2 = document.getElementById('dice2');
var dice3 = document.getElementById('dice3');
var dice4 = document.getElementById('dice4');
var dice5 = document.getElementById('dice5');
var dive6 = document.getElementById('dice6');

var select1 = document.getElementById('select1');
var select2 = document.getElementById('select2');
var select3 = document.getElementById('select3');
var select4 = document.getElementById('select4');
var select5 = document.getElementById('select5');

var images = [dice1, dice2, dice3, dice4, dice5, dice6];
var select_btns = [select1, select2, select3, select4, select5];
var totalPoints = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var pointCategories = ["Ones","Twos","Threes","Fours","Fives","Sixes","3 of a Kind","4 of a kind","Full House","Small Straight","Large Straight","Yahtzee","Chance"];

var currentRoll = [0,0,0,0,0];
var selected = [false, false, false, false, false, false];
function draw() {
	ctx.clearRect(0,0,c.width, c.height);
	for(var i = 0; i < 5; i++)
	{
		if(currentRoll[i] != 0){
				ctx.drawImage(images[currentRoll[i]-1], ((i)*60)+7, 7);
		}
	}
}

var roll_btn = document.getElementById('roll-btn');
var roll_count = document.getElementById('roll-count');
var rolls_left = 3;
var done = false;

function submitScore()
{
	window.location = "../?action=submitscore&score="+totalPoints[16]+"&game=Yahtzee";
}

function end_screen()
{
	document.getElementById("submitBtn").style.display = "block";
	document.getElementById('container').innerHTML = "<h1 id='end-screen'>Congrats!<br>You scored "+totalPoints[16]+"</h1>";
}

function updateTable()
{
	for(var i = 1; i < 18; i++)
	{
		var id = "table"+i;
		document.getElementById(id).innerHTML = totalPoints[i-1];
	}
}

function sumbitPoints(points, index)
{
	totalPoints[index] += points;
	// Check if bonus should be awarded
	var upperPoints = 0;
	for(var i = 0; i < 6; i++)
	{
		upperPoints+=totalPoints[i];
	}
	if(upperPoints >= 63)
		totalPoints[14] = 35;

	// Calculate totals
	var upperTotal = 0;
	var lowerTotal = 0;
	for(var i = 0; i < 14; i++)
	{
		if(i < 6 || i == 13)
		{
			upperTotal += totalPoints[i];
		}
		else
		{
			lowerTotal += totalPoints[i];
		}
		totalPoints[16] = upperTotal+lowerTotal;
	}

	totalPoints[14] = upperTotal;
	totalPoints[15] = lowerTotal;

	// Check if game is finished
	var done = true;
	for(var i = 0; i < 17; i++)
	{
		if(totalPoints[i] == 0)
			done = false;
	}
	if(done)
	{
		end_screen();
	}
	updateTable();
	firstRound = true;
	mbox.innerHTML = "Press roll to start!<br><br>";
	rolls_left = 3;
	roll_btn.style.visibility = "visible";
	roll_count.style.visibility = "visible";
	roll_count.innerHTML = "Rolls Left: "+rolls_left;
	currentRoll = [0,0,0,0,0];
	selected = [true,true,true,true,true];
	draw();
}

function arrayHas(array, n)
{
	for(var i = 0; i < 6; i++)
	{
		if(array[i] == n)
			return true;
	}
	return false;
}

function roundFinished()
{
	roll_btn.style.visibility = "hidden";
	mbox.innerHTML = "Choose one of the following categories to sumbit you points to:<br>";
	roll_count.style.visibility = "hidden";
	var amountOfEachNumber = [0,0,0,0,0,0];
	for(var i = 0; i < 6; i++)
		amountOfEachNumber[currentRoll[i]-1] += 1;

	// Check for upper section possible points
	for(var i = 0; i < 6; i++)
	{
		var points = amountOfEachNumber[i]*(i+1);
		if(totalPoints[i] == 0 && points != 0)
		{
			mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+","+i+")'>"+pointCategories[i]+" worth "+points+" points</button><br>";
		}
	}

	// Check for 3 and 4 of a kind
	for(var i = 0; i < 6; i++)
	{
		var points = 0;
		if(amountOfEachNumber[i] > 2 && totalPoints[6] == 0){
			points = (i+1) * 3;
			mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",6)'>"+pointCategories[6]+" worth "+points+" points</button><br>";
		}
		if(amountOfEachNumber[i] > 3 && totalPoints[7] == 0){
			points = (i+1) * 4;
			mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",7)'>"+pointCategories[7]+" worth "+points+" points</button><br>";
		}
	}

	// Check for full house
	var two = false;
	var three = false;
	for(var i = 0; i < 6; i++)
	{
		if(amountOfEachNumber[i] == 2)
			two = true;
		if(amountOfEachNumber[i] == 3)
			three = true;
		if(two && three && totalPoints[8] == 0)
		{
			var points = 25;
			mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",8)'>"+pointCategories[8]+" worth "+points+" points</button><br>";
			break;
		}
	}

	// Check for small and large straights
	var sm = false;
	var lg = false;
	for(var i = 0; i < 6; i++)
	{
		if(arrayHas(currentRoll,1) && arrayHas(currentRoll,2) && arrayHas(currentRoll,3) && arrayHas(currentRoll,4) && arrayHas(currentRoll,5)
			|| arrayHas(currentRoll,2) && arrayHas(currentRoll,3) && arrayHas(currentRoll,4) && arrayHas(currentRoll,5) && arrayHas(currentRoll,6)){
			lg = true;
			sm = true;
		}
		else			
			lg = false;
		if(arrayHas(currentRoll,1) && arrayHas(currentRoll,2) && arrayHas(currentRoll,3) && arrayHas(currentRoll,4)
			|| arrayHas(currentRoll,2) && arrayHas(currentRoll,3) && arrayHas(currentRoll,4) && arrayHas(currentRoll,5)
			|| arrayHas(currentRoll,3) && arrayHas(currentRoll,4) && arrayHas(currentRoll,5) && arrayHas(currentRoll,6))
			sm = true;
	}

	if(sm && totalPoints[9] == 0)
	{
		var points = 30;
		mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",9)'>"+pointCategories[9]+" worth "+points+" points</button><br>";
	}

	if(lg && totalPoints[10] == 0)
	{
		var points = 40;
		mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",10)'>"+pointCategories[10]+" worth "+points+" points</button><br>";
	}

	// Check for Yahtzee
	for(var i = 0; i < 6; i++)
	{
		if(amountOfEachNumber[i] == 5)
		{
			var points = 50;
			mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",11)'>"+pointCategories[11]+" worth "+points+" points</button><br>";
		}
	}

	// Give option for chance
	if(totalPoints[12] == 0){
		var points = 0;
		for(var i = 0; i < 5; i++)
		{
			points += currentRoll[i];
		}
		mbox.innerHTML += "<br><button onclick='sumbitPoints("+points+",12)'>"+pointCategories[12]+" worth "+points+" points</button><br>";
	}

}

function roll()
{
	var r;
	for(var i = 0; i < 5; i++){
		if(selected[i] == true){
			r = Math.floor( Math.random()*6+1 );
			currentRoll[i] = r;
		}
	}
	selected = [false,false,false,false,false];
	for(var i = 0; i < 5; i++)
	{
		select_btns[i].innerHTML = "Select";
	}
}

var mbox = document.getElementById('mbox');
mbox.innerHTML = "Press roll to start!<br><br>";

var firstRound = true;
function select(which)
{	
	if(!firstRound){
		if(selected[which-1] == true){
			selected[which-1] = false;
			select_btns[which-1].innerHTML = "Select";
		}
		else {
			selected[which-1] = true;
			select_btns[which-1].innerHTML = "Deselect";
		}
		draw();
	}
}

function go()
{
	rolls_left--;
	if(rolls_left == 0){
		roll();
		draw();
		roll_btn.style.visibility = "hidden";
		roundFinished();
	}
	else {
		if(firstRound){
			firstRound = false;
			selected = [true,true,true,true,true];
		}
		roll_btn.style.visibility = "visible";
		roll();
		draw();
		mbox.innerHTML = "Select the ones you would like to roll again and press roll!";
		roll_count.innerHTML = "Rolls left: " + rolls_left;
	}	
}