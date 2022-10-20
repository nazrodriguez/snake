// When browser finishes loading everything...
window.onload = function () {
	// Listen to key presses.
	document.addEventListener("keydown", keyPush);

	// Update the game board every 15th's of a second.
	setInterval(() => {
		// Grab reference to the canvas element.
		let canv = document.getElementById("mainCanvas");
		
		// Get "drawing context" from canvas.
		let ctx = canv.getContext("2d");

		// Execute game.
		updateGameBoard(ctx, canv);
	}, 1000 / 15);
}

// Position of snake head IN SQUARES.
var snakeHeadX = snakeHeadY = 5;

// Grid dimensions. (20square x 20squares)
var gridSize = 20;

// Square dimensions (also 20px x 20px)
var squareSize = 20;

// Position of mouse IN SQUARES.
var mouseX = mouseY = 15;

// Acceleration of snake IN SQUARES.
var accelerationX = accelerationY = 0;

var trail = [];
var tailLength = 5;

/**
 * Updates the position of the snake in the board.
 * Shows "edible" square.
 * Proccesses the event of eating the square.
 * Proccesses collision.
 * Styles the canvas.
 * Calculates trail, and resets it when colliding.
 * 
 * @param {*} context This should be the JavaScript drawing context.
 * @param {*} canv  This should be a reference to the HTML canvas element to draw in.
 */
function updateGameBoard(context, canv) {
	// Change position according to direction.
	snakeHeadX += accelerationX; // 0
	snakeHeadY += accelerationY; // 0

	// If collides with left bound.
	if (snakeHeadX < 0) {
		snakeHeadX = squareSize - 1;
	}

	// If collides with right bound.
	if (snakeHeadX > squareSize - 1) {
		snakeHeadX = 0;
	}

	// If collides with upper bound.
	if (snakeHeadY < 0) {
		snakeHeadY = squareSize - 1;
	}

	// If collides with bottom bound.
	if (snakeHeadY > squareSize - 1) {
		snakeHeadY = 0;
	}

	// Paint game board.
	context.fillStyle = "black";
	context.fillRect(0, 0, canv.width, canv.height);

	// Set paint color for snake.
	context.fillStyle = "white";

	// For each square in the trail...
	for (var i = 0; i < trail.length; i++) {
		
		// Draw each trail square...
		context.fillRect(
			trail[i].coordinates.x * gridSize, // X? cuadrado N°10 * 20
			trail[i].coordinates.y * gridSize, // Y? cuadrado N°3 * 20
			gridSize - 3, // WIDTH
			gridSize - 3 // HEIGHT
		);
		
		// You lost! Snake Ate itself. Cut tail back to 5.
		if (trail[i].x == snakeHeadX && trail[i].y == snakeHeadY) {
			tailLength = 5;
		}
	}

	trail.push({
		coordinates: {
			x: snakeHeadX,
			y: snakeHeadY
		}
	});

	while (trail.length > tailLength) {
		trail.shift();
	}

	// We ate a square. Add to tailLength.
	if (mouseX == snakeHeadX && mouseY == snakeHeadY) {
		tailLength++;

		// Randomize NEW position of square.
		mouseX = Math.floor(Math.random() * squareSize);
		mouseY = Math.floor(Math.random() * squareSize);
	}

	// Paint "edible" square.
	context.fillStyle = "gray";
	context.fillRect(mouseX * gridSize, mouseY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPush(evt) {
	switch (evt.keyCode) {
		case 37: { // LEFT
			// If I was going right... can't go left.
			if (accelerationX === 1) {
				break;
			}

			// Go left.
			accelerationX=-1;accelerationY=0;
			break;
		}
		case 38: { // UP
			// If I was going down... can't go up.
			if (accelerationY === 1) {
				break;
			}

			accelerationX=0;accelerationY=-1;
			break;
		}
		case 39: { // RIGHT
			// If I was going left... can't go right.
			if (accelerationX === -1) {
				break;
			}

			accelerationX=1;accelerationY=0;
			break;
		}
		case 40: { // DOWN
			// If I was going up... can't go down.
			if (accelerationY === -1) {
				break;
			}

			accelerationX=0;accelerationY=1;
			break;
		}
	}
}
