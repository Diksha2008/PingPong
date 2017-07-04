var ball = document.getElementById("ball");
var paddle1 = document.getElementById("paddle1");
var paddle2 = document.getElementById("paddle2");
var score = document.getElementById("score");

var dx = 4;
var dy = 4;

var maxWidth = document.body.clientWidth;
var maxHeight = document.body.clientHeight;

var ballRadius = 50;
var paddleHeight = 120;
var paddleWidth = 20;

var upfirst = false;
var downfirst = false;

var upsecond = false;
var downsecond = false;

var score1 = 0;
var score2 = 0;

ball.style.top = '250px';
ball.style.left = '500px';

paddle1.style.top = '0px';
paddle1.style.left = '0px'

paddle2.style.top = '0px';
paddle2.style.right = '0px';

function currentTop(element) {
	return parseFloat(element.style.top.slice(0,-2))
}

function currentLeft(element) {
	return parseFloat(element.style.left.slice(0,-2))
}
function move() {
	var currentY = currentTop(ball) + dy;
	var currentX = currentLeft(ball) + dx;
	ball.style.top = currentY + 'px';
	ball.style.left = currentX + 'px';

	score.innerHTML = score1 + ' : SCORE : ' + score2;
	//collision with left bar it should touch only the bar
	if (currentY + ballRadius > currentTop(paddle1) && currentY < currentTop(paddle1) + paddleHeight) {
			//check if its colliding
			if(currentX < paddleWidth){
				dx = -dx;
			}
	} 

	//collision with right bar it should touch only the bar
	if (currentY + ballRadius > currentTop(paddle2) && currentY < currentTop(paddle2) + paddleHeight) {
			//check if its colliding
			if(currentX > maxWidth - ballRadius - paddleWidth){
				dx = -dx;
			}
	} 

	//collision with wall
	if(currentX < 0 || currentX > maxWidth - ballRadius){
		if(currentX < 0 ){
			score2 ++;
			dx = -dx;
		}
		if(currentX > maxWidth - ballRadius){
			score1 ++;
			dx = -dx;
		}
		//if score of player1 is 10 and difference betwwen theirs scores is greate than 1 otherwise continue the game.
		if (score1 >= 2 && score1 - score2 > 1) {
			alert("Player1 wins!!!\n Player1: " + score1 + "pts   Player2: " + score2 + "pts");
			document.location.reload();
		}
		if (score2 >= 2 && score2 - score1 > 1) {
			alert("Player2 wins!!!\n Player1: " + score1 + "pts   Player2: " + score2 + "pts");
			document.location.reload();
		}	
		// alert("Game Over");
		// document.location.reload();
	}

	if(currentY < 0 || currentY > maxHeight - ballRadius){
		dy = -dy;
	}

	//move if key is pressed i.e. if it is true
	if(upfirst && currentTop(paddle1) > 0 ){
		paddle1.style.top = (currentTop(paddle1) - 7) + 'px';
	}
	if(downfirst && currentTop(paddle1) < maxHeight - paddleHeight){
		paddle1.style.top = (currentTop(paddle1) + 7) + 'px';
	}

	if(upsecond && currentTop(paddle2) > 0 ){
		paddle2.style.top = (currentTop(paddle2) - 7) + 'px';
	}
	if(downsecond && currentTop(paddle2) < maxHeight - paddleHeight){
		paddle2.style.top = (currentTop(paddle2) + 7) + 'px';
	}
}

function keyUpHandler(e){
	console.log(e);
	if (e.keyCode == 83) {
		downfirst = false;
	}
	if (e.keyCode == 87) {
		upfirst = false;
	}
	//S
	if (e.keyCode == 40) {
		downsecond = false;
	}
	//W
	if (e.keyCode == 38) {
		upsecond = false;
	}
}

function keyDownHandler(e){
	if (e.keyCode == 83) {
		downfirst = true;
	}
	if (e.keyCode == 87) {
		upfirst = true;
	}
	if (e.keyCode == 40) {
		downsecond = true;
	}
	if (e.keyCode == 38) {
		upsecond = true;
	}

}
setInterval(move,10);
document.addEventListener("keyup",keyUpHandler);
document.addEventListener("keydown",keyDownHandler);