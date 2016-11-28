
/** ***************************************************************************** */
// Food
const numberOfShit = 300;
var food;
const shitRadius = 5;

/** ***************************************************************************** */
 // Snake Variable

var initCoordinate = {x:500,y:500};
const colors = ["Yellow","Blue","Black","Green", "Pink","Violet","Brown", "Gray","DarkCyan","Maroon" ,"GreenYellow "];
var   myColorIndex = Math.floor(Math.random()*4);
const snakeWidth = 8;
const heightOfCell = 2;
const initialSnakeLength =50;
const snakeColor = "red";
const snakeSpeed = 2;
const snakeSpeedIncresing = 3;
var   mySnake;
const headRadius = 8;
/** ****************************************************************************** */
/** ***************************************************************************** */
 // PacMan Variable

var   pacManInitCoordinate = {x:500,y:250};
const pacManColor = "black"; 
const pacManSpeed = 3.5;
var   pacMan;
const pacManHeadRadius = 40;
/** ****************************************************************************** */
   //Bomb Variable
var bomb;

/** ****************************************************************************** */
// Snake shit variables
const snakeShitRadius = 20;
/** ****************************************************************************** */
// Canvas variable
const canvasHeight = 500;
const canvasWidth = window.innerWidth-100;

function startGame() {
	mySnake = new Snake(colors[myColorIndex]);
	mySnake.initLengthAndCoordinate(initialSnakeLength, initCoordinate);
	pacMan = new PacMan(pacManColor);
	pacMan.initPacMan(pacManInitCoordinate);
	food = new Food();
	food.initFood(numberOfShit);
	bomb = new Bomb();
	myGameArea.start();
}

function Snake(color) {
	this.color = color, this.snakeArray = [], this.speed = snakeSpeed,
			this.angle = 0, this.moveAngle = 0, this.width = snakeWidth, this.isPood = false,this.isStop =false,
			this.headRadius = headRadius, this.length = initialSnakeLength,
			this.newHead = {
				x : 0,
				y : 0,
				radius : this.headRadius
			},

			this.initLengthAndCoordinate = function(initialSnakeLength,
					initCoordinate) {
				for ( var i = 0; i < initialSnakeLength; i++) { 
					if (i==0)
					{
					this.snakeArray.push({
						x : (initCoordinate.x + i * this.headRadius / 2),
						y : (initCoordinate.y),
						radius: this.headRadius
					});
					}
					else
					{
					this.snakeArray.push({
						x : (initCoordinate.x + i * this.headRadius / 2),
						y : (initCoordinate.y),
						radius: this.headRadius
					});	
					
					}
				}
			},

			this.update = function() {

				var tail = this.snakeArray.pop();
				tail.x = this.newHead.x;
				tail.y = this.newHead.y;
				tail.radius = this.headRadius;
				this.snakeArray.unshift(tail);

			}, 
			this.drawSnake = function() {
				ctx = myGameArea.context;
				ctx.fillStyle = color;
				for ( var i = 0; i < this.snakeArray.length; i++) {

					if (i == 0) {
						ctx.beginPath();
						ctx.arc(this.snakeArray[i].x, this.snakeArray[i].y,
								this.headRadius +2, 0, 2 * Math.PI, false);
						ctx.fill();
					} else {
						ctx.beginPath();
						ctx.arc(this.snakeArray[i].x, this.snakeArray[i].y,
								this.headRadius , 0, 2 * Math.PI, false);
						ctx.fill();
					}

				}
			},

			this.newPos = function() {
				this.angle += this.moveAngle * Math.PI / 180;

				this.newHead.x = this.snakeArray[0].x + Math.sin(this.angle)
						* 2;
				this.newHead.y = this.snakeArray[0].y - Math.cos(this.angle)
						* 2;
				this.newHead.radius = this.headRadius;
				
				if (this.newHead.x <=10)
				{this.newHead.x=10;}
			if (this.newHead.x >= canvasWidth-10)
				{this.newHead.x = canvasWidth-10;}
			if (this.newHead.y <= 10)
				{this.newHead.y = 10;}
			if (this.newHead.y >= canvasHeight-10)
			{this.newHead.y = canvasHeight-10;}
		

				return this.newHead;
			}, 
			this.canEat= function(object) {
				if (Math.abs(this.snakeArray[0].x-object.x)>50 || Math.abs(this.snakeArray[0].y-object.y)>50 )
				{
				return false;
				}
				else
				{
				var SquareOfDistanceOfHeadAndShit = Math.pow((this.snakeArray[0].x - object.x), 2)
												  + Math.pow((this.snakeArray[0].y - object.y), 2);
				var SquareOfTwoRadius = Math.pow(
						(this.headRadius + object.radius), 2);
			
			    return (SquareOfDistanceOfHeadAndShit <= SquareOfTwoRadius);
				}
			},
			this.increaseLength = function(numberOfDot)
 			{
				while (numberOfDot--) {
					this.length += 1;
					this.snakeArray.unshift({
						x : this.newPos().x,
						y : this.newPos().y,
						radius: this.headRadius
					});
				}
			},
			this.checkFood = function (food)
			{
				for ( var i = 0; i < food.foodArray.length; i++) {
					if (this.canEat(food.foodArray[i])) {
					    this.increaseLength(2);   
						food.foodArray.splice(i, 1);
						break;
					}
				}
				
			},
			this.checkBomb = function (bomb)
			{
				for ( var i = 0; i < bomb.bombArray.length; i++) {
					if (this.canEat(bomb.bombArray[i])) {
					    return true;
					}
				}
				return false;
				
			},
			this.stop = function()
			{
			this.isStop=true;
			}

}

function PacMan(color) {
	this.color = color, this.speed = pacManSpeed, this.angle = 0, this.count = 0,
			this.moveAngle = 0, this.pacManHeadRadius = pacManHeadRadius,this.isStop = false,
			this.closeMountImg = document.getElementById("PacManCloseMounth"),
			this.openMountImg = document.getElementById("PacManOpenMounth"),

			this.pacManCoordidante = {
				x : 0,
				y : 0
			}, this.initPacMan = function(pacManInitCoordinate) {
				this.pacManCoordidante.x = pacManInitCoordinate.x;
				this.pacManCoordidante.y = pacManInitCoordinate.y;
			},

			this.drawPacman = function() {
				ctx = myGameArea.context;
				ctx.fillStyle = color;
				ctx.beginPath();
				this.count +=1;
				if (this.count<20)
				{
				
					ctx.save();
			        ctx.translate(this.pacManCoordidante.x , this.pacManCoordidante.y ); 
			        ctx.rotate(this.angle - Math.PI/2);
					ctx.drawImage(this.closeMountImg, -40, -30);
					ctx.restore(); 
				}
				else
 				{
					if (this.count > 40) {
						this.count =0;
						
			}
					
					ctx.save();
			        ctx.translate(this.pacManCoordidante.x , this.pacManCoordidante.y ); 
			        ctx.rotate(this.angle - Math.PI/2);
			        ctx.drawImage(this.openMountImg, -40, -30);
					ctx.restore()
				}

			},

			this.newPos = function() {
				if (!this.isStop)
				{
				this.angle = Math.atan2(mySnake.snakeArray[0].y
						- this.pacManCoordidante.y, mySnake.snakeArray[0].x
						- this.pacManCoordidante.x)
				this.angle += Math.PI / 2;
				}
				else
				{
				this.speed=0;
				}
				
				this.pacManCoordidante.x = this.pacManCoordidante.x
						+ Math.sin(this.angle) * this.speed;
				this.pacManCoordidante.y = this.pacManCoordidante.y
						- Math.cos(this.angle) * this.speed;
				if (this.pacManCoordidante.x <=0)
					{this.pacManCoordidante.x=0;}
				if (this.pacManCoordidante.x >= canvasWidth)
					{this.pacManCoordidante.x = canvasWidth;}
				if (this.pacManCoordidante.y <= 0)
					{this.pacManCoordidante.y = 0;}
				if (this.pacManCoordidante.y >= canvasHeight)
				{this.pacManCoordidante.y = canvasHeight;}
			
				return this.pacManCoordidante;
			},
			this.canEat = function (object)
			{  if (Math.abs(object.x-this.pacManCoordidante.x)>60|| Math.abs(object.y-this.pacManCoordidante.y)>60)
				{
				return false;
				}
				else
				{
				
				var SquareOfDistanceOfPacManAndObject = Math.pow((object.x - this.pacManCoordidante.x), 2)
												  + Math.pow((object.y - this.pacManCoordidante.y), 2);
				var SquareOfTwoRadius = Math.pow(
						(this.pacManHeadRadius + object.radius-20), 2);/*HardCode*/
			
			    return (SquareOfDistanceOfPacManAndObject <= SquareOfTwoRadius);
				}
			},
			this.canEatSnakeHead = function(mySnake)
			    {
				for (var i =0; i< mySnake.snakeArray.length ; i++)
					{
					if(this.canEat(mySnake.snakeArray[i]))
						{
						if (i==0)						
						{
							return true;
						}
						else
						{
						mySnake.snakeArray.splice(i,mySnake.snakeArray.length-i+1);
						}
						}
					}
					return false;
				},
			this.canEatBomb  =  function(bomb)
			{
			
			for (var i =0; i< bomb.bombArray.length ; i++)
				{
				if (this.canEat(bomb.bombArray[i]))
					{return true;
					}
				}
				return false;
			},
			this.stop = function ()
			{
			this.isStop=true;
			}
			
			 
			}
	
function Food() {
	this.foodArray = [], this.initFood = function(numberOfShit) {
		var i = 0, randomIndex = 0, randomX = 0, randomY = 0;
		for (i = 0; i < numberOfShit; i++) {
			randomIndex = Math.floor(Math.random() * colors.length);
			randomX = Math.floor(Math.random() * canvasWidth);
			randomY = Math.floor(Math.random() * canvasHeight);
			this.foodArray[this.foodArray.length] = (new Shit(shitRadius,colors[randomIndex], randomX, randomY));
		}
	}, this.update = function() {
		for ( var i = 0; i < this.foodArray.length; i++) {
			this.foodArray[i].update();
		}

	}
}  
function Shit(radius, color, x, y) {

	this.radius = radius, this.x = x, this.y = y,
			this.update = function() {
				ctx = myGameArea.context;
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
				ctx.fill();
			}
}

function Bomb() {
	this.bombArray = [],
	this.update = function() {
		for ( var i = 0; i < this.bombArray.length; i++) {
			this.bombArray[i].update();
		}

	}
}

function SnakeShit(x, y) {
	 this.count =0,
     this.img1 = document.getElementById("SnakeShit1"),
      this.img2 = document.getElementById("SnakeShit2"), this.x = x, this.y = y,this.radius= snakeShitRadius,
			this.update = function() {
    	        this.count+=1;
				ctx = myGameArea.context;
				if (this.count < 20) {
					ctx.drawImage(this.img1, this.x - this.radius/2, this.y -  this.radius/2);
				} else {
					if (this.count > 40) {
						this.count = 0;
					}
					ctx.drawImage(this.img2, this.x  - this.radius/2, this.y  - this.radius/2);

				}
			}
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = canvasWidth;
		this.canvas.height = canvasHeight;
		this.context = this.canvas.getContext("2d");
		$("#gameArea").append(this.canvas);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function(e) {
			e.preventDefault();
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = (e.type == "keydown");
		})
		window.addEventListener('keyup', function(e) {
			myGameArea.keys[e.keyCode] = (e.type == "keydown");
		})
	},
	stop : function() {
		clearInterval(this.interval);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}


function updateGameArea() {
	myGameArea.clear();
    var NumberOfShit = (mySnake.snakeArray.length-initialSnakeLength-10)/10
	NumberOfShit = Math.floor(NumberOfShit);
	if(NumberOfShit>0)
	{
	$("#NumberOfShit").text(NumberOfShit); 
	}
	else
	{
	$("#NumberOfShit").text(0); 
	
	}
	$("#SnakeLength").text(mySnake.snakeArray.length);
	mySnake.moveAngle = 0;
	mySnake.speed = 2;	
	var mySnakeCounter = 0;
	if (myGameArea.keys && myGameArea.keys[37]) {
		mySnake.moveAngle = -3;
	}
	if (myGameArea.keys && myGameArea.keys[39]) {
		mySnake.moveAngle = 3;
	}
	
	if (myGameArea.keys && myGameArea.keys[38]) {

		if (mySnake.snakeArray.length > initialSnakeLength) {
			mySnake.speed = snakeSpeedIncresing;
			mySnake.length -= 1;
			mySnake.snakeArray.pop();
		}
	}
	
	if (myGameArea.keys && myGameArea.keys[32]) {
		if (!mySnake.isPoo && (mySnake.snakeArray.length >initialSnakeLength+10) ) {
			var snakeShitX = mySnake.snakeArray[mySnake.snakeArray.length - 1].x;
			var snakeShitY = mySnake.snakeArray[mySnake.snakeArray.length - 1].y;
			var snakeShit = new SnakeShit(snakeShitX, snakeShitY);
			bomb.bombArray.push(snakeShit);
			mySnake.snakeArray.splice(mySnake.snakeArray.length -1-20,20);
			
		}
		mySnake.isPoo = true;
	
	}	
	if (myGameArea.keys && (!myGameArea.keys[32])) {
		mySnake.isPoo = false;
	}
	
	if (mySnake.isStop)
	{
	mySnake.speed = 0;
	mySnake.angle = 0 ;
	}
	
	if (pacMan.isStop)
	{
	pacMan.speed =0 ;
	pacMan.angle = Math.PI/2 ;
	}
	while (mySnakeCounter < mySnake.speed) {
		mySnakeCounter += 1;
		mySnake.newPos();
		mySnake.update();
		}
    mySnake.checkFood(food);
	if(mySnake.checkBomb(bomb))
	{
	   $("#EndGameDialogText").text("End Game : You Lose");
		mySnake.stop();
		pacMan.stop();
	}
	mySnake.drawSnake();	
	food.update();
	bomb.update();	
	pacMan.newPos();
	
	if ( pacMan.canEatSnakeHead(mySnake))
	{
		$("#EndGameDialogText").text("End Game : You Lose");
		mySnake.stop();
		pacMan.stop();
		
	}
	
	if ( pacMan.canEatBomb(bomb))
	{
		$("#EndGameDialogText").text("End Game : You Win");	
		mySnake.stop();
		pacMan.stop();
	}
	
	pacMan.drawPacman();

}

