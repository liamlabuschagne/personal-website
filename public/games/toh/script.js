var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var AMOUNT_OF_BLOCKS = 3;

var blocks = [[], [], []];
var select = [];
var moves = 0;
var seconds = 0;

var playing = false;

function setBlocks(value) {
	if (value > 20 || value < 3)
		return;
	AMOUNT_OF_BLOCKS = value;
	canvas.width = document.getElementById('body').offsetWidth;
	canvas.height = canvas.width * 0.5;
	var elem = document.getElementById('start');
	elem.parentNode.removeChild(elem);
	reset();
	playing = true;
	draw();
	setInterval(function () { seconds++; }, 1000);
}

function reset() {
	for (var i = 0; i < AMOUNT_OF_BLOCKS; i++)
		blocks[0][i] = (i * 10) + 10;
}

var score = 0;

function calcScore() {
	var minMoves = (Math.pow(2, AMOUNT_OF_BLOCKS) - 1);

	score = (minMoves / (seconds + moves)) * 100;
	if (score <= 0) {
		score = 0;
	}
	score = Math.round(score * 100) / 100;
	return "Your score: " + score;
}

function submitScore() {
	window.location = "../?action=submitscore&score=" + score + "&game=Tower of Hanoi&extra_info=Blocks: " + AMOUNT_OF_BLOCKS;
}

function winScreen() {
	document.getElementById("submitBtn").style.display = "block";
	playing = false;
	context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = 400;
	context.font = "20px Georgia";
	context.fillStyle = "black";
	var txt = "Well done!";
	context.fillText("Well done!", canvas.width / 2 - (context.measureText(txt).width / 2), (canvas.height / 2) - 10);
	var txt = "Time: " + seconds;
	context.fillText(txt, canvas.width / 2 - (context.measureText(txt).width / 2), (canvas.height / 2) + 10);
	var txt = "Amount of moves: " + moves;
	context.fillText(txt, canvas.width / 2 - (context.measureText(txt).width / 2), (canvas.height / 2) + 30);
	var txt = calcScore();
	context.fillText(txt, canvas.width / 2 - (context.measureText(txt).width / 2), (canvas.height / 2) + 50);
}

function move(source, destination) {
	// Check that source and destination are valid
	if ((source > -1 && source < 3) && (destination > -1 && destination < 3)) {
		// Check that the source block exists
		if (blocks[source][0]) {
			if (blocks[source][0] > blocks[destination][0])
				return false;
			// Copy source block to destination stack
			blocks[destination].unshift(blocks[source][0]);

			// Delete and reorder source stack
			blocks[source].splice(0, 1);
			moves++;
			draw();

			if (blocks[0].length == 0 && blocks[1].length == 0)
				winScreen();
			else
				return true;
		}
		else
			return false;
	}
	else
		return false;
}

function draw() {
	if (playing) {
		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the time
		context.font = "20px Georgia";
		context.fillStyle = "black";
		var txt = "Time: " + seconds;
		context.fillText(txt, canvas.width / 2 - (context.measureText(txt).width / 2), 15);

		// Draw the three colour backgrounds
		context.fillStyle = "red";
		context.fillRect(0, 40, canvas.width / 3, canvas.height - 40);
		context.fillStyle = "green";
		context.fillRect(canvas.width / 3, 40, canvas.width / 3, canvas.height - 40);
		context.fillStyle = "blue";
		context.fillRect(canvas.width / 3 * 2, 40, canvas.width / 3, canvas.height - 40);
		context.fillStyle = "white";

		// Draw the blocks
		for (var i = 0; i < 3; i++) {
			if (blocks[i][0]) {
				for (var j = 0; j < blocks[i].length; j++) {
					var x = (i * (canvas.width / 3) + (canvas.width / 3 - AMOUNT_OF_BLOCKS * 10) / 2) + ((AMOUNT_OF_BLOCKS * 10 / 2)) - (blocks[i][j] / 2);
					if (select[0] == i && j == 0) {
						context.fillStyle = "black";
					}
					else
						context.fillStyle = "white";
					context.fillRect(x, canvas.height - blocks[i].length * 10 + (j * 10) - 10, blocks[i][j], 10);
				}
			}
		}
		return true;
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

document.addEventListener("mousedown", function (e) {
	if (playing) {
		var mousePos = getMousePos(canvas, e);
		if (mousePos.y > canvas.height)
			select = [];
		else if (mousePos.x < canvas.width / 3) {
			if (select.length == 0)
				select[0] = 0;
			else if (select.length == 1) {
				select[1] = 0;
				move(select[0], select[1]);
				select = [];
			}
		}
		else if (mousePos.x > canvas.width / 3 && mousePos.x < (canvas.width - canvas.width / 3)) {
			if (select.length == 0)
				select[0] = 1;
			else if (select.length == 1) {
				select[1] = 1;
				move(select[0], select[1]);
				select = [];
			}
		}
		else {
			if (select.length == 0)
				select[0] = 2;
			else if (select.length == 1) {
				select[1] = 2;
				move(select[0], select[1]);
				select = [];
			}
		}

		draw();
	}
});

