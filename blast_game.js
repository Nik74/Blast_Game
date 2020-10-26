/* CUSTOMIZATION */


const widthWindow = $(window).width();  // Width of the browser window
const heightWindow = $(window).height();  // Height of the browser window

const tileSize = Math.floor($(window).height() / 15.21875);  // Size of the tile

const tileClass = "tile";  // Tile element class
const tileIdPrefix = "tile";  // Prefix for identifiers

const numRows = 12;  // Number of rows
const numCols = 7;  // Number of columns
const finishPoints = 1500;  // The number of points required to win
const moves = 100;  // The number of moves
const bomb = 2;  // The number of booster bomb
const reload = 5;  // The number of remaining mixing
const increasePoints = 5;  // The number by which points are increased when the tile is destroyed
const radiusBomb = 2;  // Radius of booster bomb
const superTile = 5;  // Number of tiles to be "destroyed" to get a super tile

/* Tiles */
const bgColors = new Array(
	"yellow.gif",
	"red.gif",
	"purple.gif",
	"blue.gif",
	"green.gif",
	"orange.gif",
	"turquoise.gif",
	"magenta.gif",
	"unknown.gif"
);

let idStart = 0;  // ID that started again
let points = 0;  // Points
let playStopButtons = 1;  // 1 - off, 2 - on
let movingItems = 0;  // Number of tiles currently being moved
let rowSuperTile = -1;  // Row of super tile
let colSuperTile = -1;  // Col of super tile
let selectedRow = -1;  // Selected row
let selectedCol = -1;  // Selected column

let countBoosterBomb = bomb;  // Number of bombs
let countReload = reload;  // Number of remaining mixing
let remainingMoves = moves;  // Number of remaining moves

let jewels = new Array();  // Two-dimensional array of tiles on the field

let flagBoosterBomb = false;  //For activating booster bomb
let flagSuperTile = false;  // For activating super tile
let flagSuperTileImg = false;

let gameState = "pick";  // Current state of the field - waiting for tile selection

let audioSound = new Audio();
	
audioSound.src = 'sound/sound.mp3';

// Main field
const totalField = new TemplateField("totalfield", {"background-color": "#071627", "position": "relative",
	"width": (widthWindow - Math.floor($(window).width() / 128)) + "px", 
	"height": (heightWindow - Math.floor($(window).height() / 57.29)) + "px"}, {});
	
// Field for displaying tiles
const fieledForTile = new TemplateField("fieledfortile", {"background": "url(img/field.gif",
	"background-size": (numCols * tileSize + Math.floor(widthWindow / 96)) + "px " + (numRows * tileSize  + Math.floor(heightWindow / 48.45)) + "px",
	"position": "relative", "width": (numCols * tileSize + Math.floor(widthWindow / 96)) + "px",
	"height": (numRows * tileSize + Math.floor(heightWindow / 48.45)) + "px",
	"left": Math.floor(widthWindow / 4.26) + "px", "top": Math.floor(heightWindow / 11.195) + "px"}, {});
	
// Field for displaying game data
const fieldForText = new TemplateField("fieldfortext", {"left": (numCols * tileSize + Math.floor(widthWindow / 3.2)) + "px",
	"top": -(Math.floor(heightWindow / 1.403)) + "px", "background": "url(img/field.gif",
	"background-size": Math.floor(widthWindow / 4.1) + "px " + (numRows * tileSize + Math.floor(heightWindow / 48.45)) + "px",
	"position": "relative", "width": Math.floor(widthWindow / 4.1) + "px",
	"height": (numRows * tileSize + Math.floor(heightWindow / 48.45)) + "px"}, {});

// Information field
let informationField = new TemplateField("inf_field", {"position": "absolute",
	"left": Math.floor(widthWindow / 19.2) + "px", "top": Math.floor(heightWindow / 3.876) + "px",
	"color": "white", "width": Math.floor(widthWindow / 7) + "px",
	"height": Math.floor(heightWindow / 4.4) + "px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": Math.floor(widthWindow / 7) + "px " + Math.floor(heightWindow / 4.4) + "px",
	"border-radius": Math.floor(widthWindow / 192) + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"},
	'<p>Приветствую Вас! <p>Для победы Вам нужно набрать ' + finishPoints + ' очков за ' + moves + ' ходов, "уничтожая" группы в минимум два блока.');

// Game field
const gameField = new TemplateField("gamefield", {"left": Math.floor(widthWindow / 192) + "px",
	"top": Math.floor(heightWindow / 96.9) + "px", "position": "relative",
	"width": (numCols * tileSize) + "px", "height": (numRows * tileSize) + "px"}, {});

// Text for booster bomb
const textBoosterBomb = new TemplateField("text_booster_bomb", {"position": "absolute",
	"left": Math.floor(widthWindow / 10.6) + "px", "top": Math.floor(heightWindow / 10) + "px",
	"color": "white", "width": Math.floor(widthWindow / 12.8) + "px",
	"height": Math.floor(heightWindow / 18) + "px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": Math.floor(widthWindow / 7.68) + "px " + Math.floor(heightWindow / 18) + "px",
	"border-radius": Math.floor(widthWindow / 192) + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"}, 'Количество бомб: ' + countBoosterBomb);
	
// Text for reload
const textReload = new TemplateField("text_reload", {"position": "absolute",
	"left": Math.floor(widthWindow / 10.6) + "px", "top": Math.floor(heightWindow / 64.6) + "px",
	"color": "white", "width": Math.floor(widthWindow / 7.68) + "px",
	"height": Math.floor(heightWindow / 17.62) + "px", 
	"font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": Math.floor(widthWindow / 7.68) + "px " + Math.floor(heightWindow / 17.62) + "px",
	"border-radius": Math.floor(widthWindow / 192) + "px", "text-align": "center",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, 'Количество перемешиваний: ' + countReload);
	
// Text for points
const textPoints = new TemplateField("text_points", {"position": "absolute",
	"left": Math.floor(widthWindow / 10.6) + "px", "top": Math.floor(heightWindow / 5.8) + "px",
	"color": "white", "width": Math.floor(widthWindow / 12.8) + "px",
	"height": Math.floor(heightWindow / 36) + "px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": Math.floor(widthWindow / 7.68) + "px " + Math.floor(heightWindow / 36) + "px",
	"border-radius": Math.floor(widthWindow / 192) + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"}, 'Очки: ' + points);
	
// Text for moves
const textMoves = new TemplateField("text_moves", {"position": "absolute",
	"left": Math.floor(widthWindow / 10.6) + "px", "top": Math.floor(heightWindow / 4.6) + "px",
	"color": "white", "width": Math.floor(widthWindow / 7.68) + "px",
	"height": Math.floor(heightWindow / 36) + "px",
	"font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": Math.floor(widthWindow / 7.68) + "px " + Math.floor(heightWindow / 36) + "px",
	"border-radius": Math.floor(widthWindow / 192) + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"}, 'Оставшиеся ходы: ' + remainingMoves);
	
// Block with the output of loss
const lose = new TemplateField("losefield", {"top": Math.floor(heightWindow / 96.9) + "px",
	"position": "relative", "width": (numCols * tileSize) + "px",
	"height": (numRows * tileSize) + "px", "background": "url(img/lose.gif)",
	"background-size": (numCols * tileSize) + "px " + (numRows * tileSize) + "px"}, {});
	
// Block with withdrawal of winnings
const win = new TemplateField("winfield", {"top": Math.floor(heightWindow / 96.9) + "px",
	"position": "relative",
	"width": (numCols * tileSize - Math.floor(widthWindow / 192)) + "px",
	"height": (numRows * tileSize) + "px", "background": "url(img/win.gif)",
	"background-size": (numCols * tileSize - Math.floor(widthWindow / 192)) + "px " + (numRows * tileSize) + "px"}, {});
	
// Displays a question about another game
const textStartStop = new TemplateField("text_start_stop", {"position": "absolute",
	"left": Math.floor(widthWindow / 19.2) + "px", "top": Math.floor(heightWindow / 3.5) + "px",
	"color": "white", "width": Math.floor(widthWindow / 7.1) + "px",
	"height": Math.floor(heightWindow / 34) + "px",
	"font-size": Math.floor(widthWindow / 106.6) + "pt", "color": "white",
	"font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": Math.floor(widthWindow / 7.1) + "px " + Math.floor(heightWindow / 34) + "px",
	"border-radius": Math.floor(widthWindow / 192) + "px", "text-align": "center",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, "Хотите сыграть еще раз?");

// Start button
const startButton = new TemplateButton("start_button", {"position": "absolute", "left": Math.floor(widthWindow / 13.5) + "px",
	"top": Math.floor(heightWindow / 2) + "px", "background": "url(img/button.gif)",
	"background-size": Math.floor(widthWindow / 10) + "px " + Math.floor(heightWindow / 15) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt", "color": "white",
	"font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 10) + "px", "height": Math.floor(heightWindow / 15) + "px"}, "Начать игру!");
	
// Button reload
const buttonReload = new TemplateButton("button_reload", {"position": "absolute",
	"left": Math.floor(widthWindow / 96) + "px", "top": Math.floor(heightWindow / 38.76) + "px",
	"background": "url(img/button.gif)", "background-size": Math.floor(widthWindow / 13.91) + "px " + Math.floor(heightWindow / 32.3) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt", "color": "white",
	"font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 13.91) + "px", "height": Math.floor(heightWindow / 32.3) + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, "Перемешать");
	
// Button for bomb
const buttonBomb = new TemplateButton("button_bomb", {"position": "absolute",
	"left": Math.floor(widthWindow / 96) + "px", "top": Math.floor(heightWindow / 9.69) + "px",
	"background": "url(img/button.gif)", "background-size": Math.floor(widthWindow / 13.91) + "px " + Math.floor(heightWindow / 32.3) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 13.91) + "px", "height": Math.floor(heightWindow / 32.3) + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, "Бомба");
	
// Button for mute the music
const buttonSoundOff = new TemplateButton("button_sound_off", {"position": "absolute",
	"left": Math.floor(widthWindow / 96) + "px", "bottom": Math.floor(heightWindow / 35) + "px",
	"background": "url(img/sound_off.gif)",
	"background-size": Math.floor(widthWindow / 60) + "px " + Math.floor(heightWindow / 35) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 60) + "px", "height": Math.floor(heightWindow / 35) + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, {});
	
// Button for launch music
const buttonSoundOn = new TemplateButton("button_sound_on", {"position": "absolute",
	"left": Math.floor(widthWindow / 96) + "px", "bottom": Math.floor(heightWindow / 35) + "px",
	"background": "url(img/sound_on.gif)",
	"background-size": Math.floor(widthWindow / 60) + "px " + Math.floor(heightWindow / 35) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 60) + "px", "height": Math.floor(heightWindow / 35) + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, {});
	
// Buttons to start a new game
const buttonStart = new TemplateButton("button_start", {"position": "absolute",
	"left": Math.floor(widthWindow / 19.2) + "px", "top": Math.floor(heightWindow / 3) + "px",
	"background": "url(img/button.gif)",
	"background-size": Math.floor(widthWindow / 40.85) + "px " + Math.floor(heightWindow / 32.3) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 40.85) + "px", "height": Math.floor(heightWindow / 32.3) + "px"}, "Да!");
	
// Button end the game
const buttonEnd = new TemplateButton("button_stop", {"position": "absolute",
	"left": Math.floor(widthWindow / 6.194) + "px", "top": Math.floor(heightWindow / 3) + "px",
	"background": "url(img/button.gif)",
	"background-size": Math.floor(widthWindow / 33.1) + "px " + Math.floor(heightWindow / 32.3) + "px",
	"border": "0px", "font-size": Math.floor(widthWindow / 106.6) + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": Math.floor(widthWindow / 33.1) + "px", "height": Math.floor(heightWindow / 32.3) + "px"}, "Нет!");
	
/* Creating a field grid */
for(let i = 0; i < numRows; i++)
{
	jewels[i] = new Array();
    
	for(let j = 0; j < numCols; j++)
	{
		jewels[i][j] = -1;
	}
};


/* AUXILIARY FUNCTIONS */
function FuncForTemplate(container, css, title)
{
	if (!css)
	{
		css = {};
	}
    
	if (!title)
	{
		title = {};
	}
	
    $(container).css(css);
	
    $(container).html(title);
}

/* Create field and button and tile */
function CreateObject(parent_field, child_field)
{
	$(parent_field).append(child_field);
}

/* Just an auxiliary function) */
function AuxiliaryFunction()
{
	DelAllTile();
	
	CreateObject("#fieldfortext", textStartStop.container);
	
	CreateObject("#fieldfortext", buttonStart.container);
	
	CreateObject("#fieldfortext", buttonEnd.container);
		
	let button_start = document.getElementById('button_start');
		
	let button_stop = document.getElementById('button_stop');

	button_start.onclick = ClickForStart;
		
	button_stop.onclick = ClickForStop;
}

function AuxiliaryFunction2()
{
	CreateObject("#fieledfortile", gameField.container);  // Creating a playing field
		
	CreateObject("#fieldfortext", buttonReload.container);  // Creating a button for shuffling tiles
	
	CreateObject("#fieldfortext", buttonBomb.container);  // Creating a button for booster bomb
	
	CreateObject("#fieldfortext", textBoosterBomb.container);  // Creating a label with the output count booster bomb
		
	CreateObject("#fieldfortext", textReload.container);  // Creating a label with the output of the shuffle counter
	
	CreateObject("#fieldfortext", textPoints.container);  // Creating a label with the output of points earned
	
	CreateObject("#fieldfortext", textMoves.container);  // Creating a label with the remaining moves output
	
		
	GenSetTile();  // The generation of the initial set of tiles

	if (idStart == 0)
	{
		document.getElementById('inf_field').remove();
		
		document.getElementById('start_button').remove();
		
		audioSound.play();
	
		audioSound.loop = "on";
	}
	
	if (playStopButtons == 1)
	{
		CreateObject("#fieldfortext", buttonSoundOff.container);
		
		document.getElementById("button_sound_off").onclick = SoundInGameStop;
	}
	else
	{
		CreateObject("#fieldfortext", buttonSoundOn.container);
		
		document.getElementById("button_sound_on").onclick = SoundInGame;
	}
		
	let button_reload = document.getElementById('button_reload');

	button_reload.onclick = ClickForReload;
	
	let button_booster_bomb = document.getElementById('button_bomb');
	
	button_booster_bomb.onclick = ClickBoosterBomb;

	/* tracking the player's actions */
	$("#gamefield").swipe({
		tap: TapHandler
	});
}

/* Auxiliary function for super tile */
function AuxiliaryFunction3()
{
	let random_function = Math.floor(Math.random() * 4);
			
	switch(random_function)
	{
		case 0:
			DelRow(rowSuperTile);
					
			break;
					
		case 1:
			DelCol(colSuperTile);
					
			break;
					
		case 2:
			DelTileAfterBoosterBomb(rowSuperTile, colSuperTile);
					
			break;
					
		case 3:
			for (let i = 0; i < numRows; i++)
			{
				for (let j = 0; j < numCols; j++)
				{
					$("#" + tileIdPrefix + "_" + i + "_" + j).addClass("remove");

					jewels[i][j] = -1;
					
					points += increasePoints;
				}
			}
					
			break;
	}
}


/* CLICKS FUNCTION*/
function ClickForStart()
{
	let del_all = document.getElementById("totalfield");
	
	del_all.remove();
	
	gameState = "pick";
	
	selectedRow = -1; 
	selectedCol = -1;  
	movingItems = 0;
	points = 0; 
	rowSuperTile = -1;
	colSuperTile = -1;
	
	countReload = reload;
	countBoosterBomb = bomb;
	remainingMoves = moves;
	
	flagBoosterBomb = false;
	flagSuperTile = false;
	flagSuperTileImg = false;
	
	idStart = 1;
	
	StartGame();
}

/* Function for booster bomb */
function ClickBoosterBomb()
{
	if (document.getElementById("losefield") == null && document.getElementById("winfield") == null)
	{
		if (countBoosterBomb > 0 && movingItems == 0)
		{
			if (flagBoosterBomb == false)
			{
				countBoosterBomb--;
			
				let text_booster_bomb_del = document.getElementById("text_booster_bomb");
				
				$(text_booster_bomb_del).html('Количество бомб: ' + countBoosterBomb);
			
				flagBoosterBomb = true;
			}
		}
	}
}

/* Function for closing the tab at the end of the game */
function ClickForStop()
{
	window.open(window.location,'_self','').close();
}


/* FUNCTIONS DELETE */

/* A function to remove the tiles at a loss */
function DelAllTile()
{	
	for (let i = 0; i < numRows; i++)
	{
		for (let j = 0; j < numCols; j++)
		{
			$("#" + tileIdPrefix + "_" + i + "_" + j).addClass("remove");

			jewels[i][j] = -1;
		}
	}
	
	$.each($(".remove"), function(){
		movingItems++;
    
		$(this).animate({
			opacity:0
		},
		{
			duration: 600,
			complete: function() {
				$(this).remove();
			}
		});
	});
}

/* Function for super tile. Delete row */
function DelRow(row_del_s_t)
{
	for (let i = 0; i < numCols; i++)
	{
		$("#" + tileIdPrefix + "_" + row_del_s_t + "_" + i).addClass("remove");

		jewels[row_del_s_t][i] = -1;
			
		points += increasePoints;
	}
}

/* Function for super tile. Delete col */
function DelCol(col_del_s_t)
{
	for (let i = 0; i < numRows; i++)
	{
		$("#" + tileIdPrefix + "_" + i + "_" + col_del_s_t).addClass("remove");

		jewels[i][col_del_s_t] = -1;
			
		points += increasePoints;
	}
}

/* Function for booster bomb. Delete tile */
function DelTileAfterBoosterBomb(row_boost_bomb, col_boost_bomb)
{
	let tmp_row_top = row_boost_bomb - radiusBomb;
	let tmp_row_bottom = row_boost_bomb + radiusBomb;
	let tmp_col_left = col_boost_bomb - radiusBomb;
	let tmp_col_right = col_boost_bomb + radiusBomb;
	
	if (tmp_row_top < 0)
	{
		tmp_row_top = 0;
	}
	
	if (tmp_row_bottom > numRows - 1)
	{
		tmp_row_bottom = numRows - 1;
	}
	
	if (tmp_col_left < 0)
	{
		tmp_col_left = 0;
	}
	
	if (tmp_col_right > numCols - 1)
	{
		tmp_col_right = numCols - 1;
	}
	
	for (let i = tmp_row_top; i <= tmp_row_bottom; i++)
	{
		for (let j = tmp_col_left; j <= tmp_col_right; j++)
		{
			$("#" + tileIdPrefix + "_" + i + "_" + j).addClass("remove");

			jewels[i][j] = -1;
			
			if ((rowSuperTile < i) && (colSuperTile == j))
			{
				rowSuperTile++;
			}
			
			points += increasePoints;
		}
	}
}

/* Function for updating the value of points scored */
function DelTextPointsAndMoves()
{
	let text_points_del = document.getElementById("text_points");
	
	$(text_points_del).html('Очки: ' + points);

	let text_moves_del = document.getElementById("text_moves");
	
	$(text_moves_del).html('Оставшиеся ходы: ' + remainingMoves);
}


/* FIELDS */

/* Field creation template */
function TemplateField(name_field, css, title)
{
	this.container = document.createElement("div");
	
	this.container.setAttribute("id", name_field);
	
	FuncForTemplate(this.container, css, title);
}


/* BUTTONS */

/* Button creation template */
function TemplateButton(name_button, css, title)
{
	this.container = document.createElement("button");
	
	this.container.setAttribute("id", name_button);
	
	FuncForTemplate(this.container, css, title);
}


/* TILES */
function TemplateTile(name_class, name_id, add_class,  css, title)
{
	this.container = document.createElement("div");
	
	this.container.setAttribute("id", name_id);
	
	this.container.setAttribute("class", name_class);
	
	if (add_class)
	{
		$(this.container).addClass(add_class);
	}
	
	FuncForTemplate(this.container, css, title);
}


/* SOUND */

/* Function to start a ringtone when stirring tiles*/
function SoundStirTile()
{	
	let audio_stirring = new Audio();
	
	audio_stirring.src = 'sound/stirring.mp3';

	audio_stirring.autoplay = true;
}

/* Function to start a ringtone when game over */
function SoundGameOver()
{
	let audio_game_over = new Audio();
	
	audio_game_over.src = 'sound/game_over.mp3';
	
	audio_game_over.autoplay = true;
}

/* Function to start a ringtone when deleting tiles */
function SoundDelTile()
{
	let audio_del_tile = new Audio();
	
	audio_del_tile.src = 'sound/del_tile.mp3';
	
	audio_del_tile.autoplay = true;
}

/* Function to start a ringtone when game win */
function SoundGameWin()
{
	let audio_game_win = new Audio();
	
	audio_game_win.src = 'sound/game_win.mp3';
	
	audio_game_win.autoplay = true;
}


/* CLICKS FUNCTION*/

/* Function to stop a ringtone in game */
function SoundInGameStop()
{
	playStopButtons = 2;
	
	document.getElementById("button_sound_off").remove();
	
	CreateObject("#fieldfortext", buttonSoundOn.container);
	
	audioSound.pause();
	
	document.getElementById("button_sound_on").onclick = SoundInGame;
}

/* Function to start a ringtone in game */
function SoundInGame()
{
	playStopButtons = 1;
	
	audioSound.play();
		
	audioSound.loop = "on";
		
	document.getElementById("button_sound_on").remove();
	
	CreateObject("#fieldfortext", buttonSoundOff.container);
	
	document.getElementById("button_sound_off").onclick = SoundInGameStop;
}

/* Function for shuffling tiles and changing the number of shuffles */
function ClickForReload() 
{
	if (document.getElementById("losefield") == null && document.getElementById("winfield") == null)
	{
		if (countReload > 0 && movingItems == 0)
		{
			let count_isStreak = 0;
			
			countReload--;
	
			let text_reload_del = document.getElementById("text_reload");
			
			$(text_reload_del).html('Количество перемешиваний: ' + countReload);
	
			for (let i = 0; i < numRows; i++)
			{
				for (let j = 0; j < numCols; j++)
				{
					let del_element = document.getElementById(tileIdPrefix + '_' + i + '_' + j);

					del_element.remove();
				}
			}
		
			GenSetTile();
		
			SoundStirTile();
			
			/* Checking that there is a group of tiles on the field */
			for (let i = 0; i < numRows; i++)
			{
				for (let j = 0; j < numCols; j++)
				{
					if(!IsStreak(i, j))
					{
						count_isStreak++;
					}
				}
			}
			
			if (count_isStreak == (numRows * numCols))
			{
				CreateObject("#gamefield", lose.container);
		
				SoundGameOver();
		
				AuxiliaryFunction();
			}
		}
	}
};


/* GAME */

/* The generation of the initial set of tiles */
function GenSetTile()
{
	for (let i = 0; i < numRows; i++)
	{
		for (let j = 0; j < numCols; j++)
		{
			/*
			if the newly created chip is a collection group with the existing ones,
			replace it with a new one
			*/
			jewels[i][j] = Math.floor(Math.random() * (bgColors.length - 1));		
			
			let tile = new TemplateTile(tileClass, tileIdPrefix + '_' + i + '_' + j, "start", {"top": ((i * tileSize) + Math.floor(heightWindow / 242.25)) + "px",
				"left": ((j * tileSize) + Math.floor(widthWindow / 480)) + "px",
				"width": (tileSize - Math.floor(widthWindow / 192)) + "px",
				"height": (tileSize - Math.floor(heightWindow / 96.9)) + "px",
				"position": "absolute", "cursor": "pointer",
				"background": "url(img/" + bgColors[jewels[i][j]] + ")",
				"background-size": (tileSize - Math.floor(widthWindow / 192)) + "px " + (tileSize - Math.floor(heightWindow / 96.9)) + "px"}, {});
				
			CreateObject("#gamefield", tile.container);
		}
	}
}

/* Marking the tiles to be deleted with the remove class */
function CheckTiles(row_del, col_del, checkTile)
{
	let tmp = row_del;

	if (jewels[row_del][col_del] != -1)
	{
		$("#" + tileIdPrefix + "_" + row_del + "_" + col_del).addClass("remove");
	
		jewels[row_del][col_del] = -1;
		
		if ((rowSuperTile < row_del) && (colSuperTile == col_del))
		{
			rowSuperTile++;
		}
	
		points += increasePoints;
	}

	if(tmp > 0 && jewels[tmp - 1][col_del] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + (tmp - 1) + "_" + col_del).addClass("remove");

		jewels[tmp - 1][col_del] = -1;
		
		if ((rowSuperTile < row_del) && (colSuperTile == col_del))
		{
			rowSuperTile++;
		}
			
		points += increasePoints;
			
		tmp--;

		CheckTiles(tmp, col_del, checkTile);
	}
		
	tmp = row_del;

	if(tmp < numRows - 1 && jewels[tmp + 1][col_del] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + (tmp + 1) + "_" + col_del).addClass("remove");

		jewels[tmp + 1][col_del] = -1;
		
		if ((rowSuperTile < row_del) && (colSuperTile == col_del))
		{
			rowSuperTile++;
		}
			
		points += increasePoints;
			
		tmp++;

		CheckTiles(tmp, col_del, checkTile);
	}

	tmp = col_del;

	if(tmp > 0 && jewels[row_del][tmp - 1] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + row_del + "_" + (tmp - 1)).addClass("remove");

		jewels[row_del][tmp - 1] = -1;
		
		if ((rowSuperTile < row_del) && (colSuperTile == col_del))
		{
			rowSuperTile++;
		}
			
		points += increasePoints;

		tmp--;

		CheckTiles(row_del, tmp, checkTile);
	}
		
	tmp = col_del;

	if(tmp < numCols - 1 && jewels[row_del][tmp + 1] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + row_del + "_" + (tmp + 1)).addClass("remove");

		jewels[row_del][tmp + 1] = -1;
		
		if ((rowSuperTile < row_del) && (colSuperTile == col_del))
		{
			rowSuperTile++;
		}
			
		points += increasePoints;
			
		tmp++;

		CheckTiles(row_del, tmp, checkTile);
	}
}

/* Removing them from the grid */
function RemoveTiles(row, col) 
{
	if (flagBoosterBomb == false)
	{
		if (rowSuperTile == row && colSuperTile == col)
		{
			if (flagSuperTile == true)
			{
				AuxiliaryFunction3();
			
				flagSuperTile = false;
			
				rowSuperTile = -1;
				colSuperTile = -1;
			}
		}
		else
		{
			let tileValue = jewels[row][col];
			
			let check_points = points;

			CheckTiles(row, col, tileValue);
			
			if ((((points - check_points) / increasePoints) >= superTile) && (flagSuperTile == false))
			{
				flagSuperTile = true;
				flagSuperTileImg = true;
				
				rowSuperTile = row;
				
				colSuperTile = col;
			}
		}
	}
	else
	{		
		DelTileAfterBoosterBomb(row, col);
		
		flagBoosterBomb = false;
	}
	
	remainingMoves--;

	SoundDelTile();
	
	DelTextPointsAndMoves()
	
	if (remainingMoves >= 0 && points >= finishPoints)
	{
		CreateObject("#gamefield", win.container);
		
		SoundGameWin();
		
		AuxiliaryFunction();
	}
	
	if (remainingMoves == 0 && points < finishPoints)
	{
		AuxiliaryFunction();
	
		CreateObject("#gamefield", lose.container);
		
		SoundGameOver();
	}	
}

/* Removing tiles from the field */
function TileFade()
{
	$.each($(".remove"), function(){
		movingItems++;
    
		$(this).animate({
			opacity:0
		},
		{
			duration: 450,
			complete: function() {
				$(this).remove();
				
				// check the field status again
				CheckRemove();
			}
		});
	});
}

/* Checking for vertical collection groups */
function IsVerticalStreak(row_ver_streak, col_ver_streak)
{
	if (row_ver_streak != -1 && col_ver_streak != -1)
	{
		let tileValue = jewels[row_ver_streak][col_ver_streak];
		let streak = 0;
		let tmp = row_ver_streak;

		while (tmp > 0 && jewels[tmp - 1][col_ver_streak] == tileValue)
		{
			streak++;
			tmp--;
		}

		while (tmp < numRows - 1 && jewels[tmp + 1][col_ver_streak] == tileValue)
		{
			streak++;
			tmp++;
		}

		return streak > 0;
	}
	else
	{
		return false;
	}
	
}

/* Checking for horizontal collection groups */
function IsHorizontalStreak(row_hor_streak, col_hor_streak)
{
	if (row_hor_streak != -1 && col_hor_streak != -1)
	{
		let tileValue = jewels[row_hor_streak][col_hor_streak];
		let streak = 0;
		let tmp = col_hor_streak;

		while(tmp > 0 && jewels[row_hor_streak][tmp - 1] == tileValue)
		{
			streak++;
			tmp--;
		}
  
		tmp = col_hor_streak;
  
		while(tmp < numCols - 1 && jewels[row_hor_streak][tmp + 1] == tileValue)
		{
			streak++;
			tmp++;
		}
		
		return streak > 0;
	}
	else
	{
		return false;
	}
}

function IsStreak(row_streak, col_streak)
{
	return IsVerticalStreak(row_streak, col_streak) || IsHorizontalStreak(row_streak, col_streak);
}

/* Shifting tiles */
function CheckFalling() 
{
	let fellDown = 0;

	for(let j = 0; j < numCols; j++) 
	{
		for(let i = numRows - 1; i > 0; i--) 
		{
			if(jewels[i][j] == -1 && jewels[i - 1][j] >= 0) 
			{
				$("#" + tileIdPrefix + "_" + (i - 1) + "_" + j).addClass("fall").attr("id", tileIdPrefix + "_" + i + "_" + j);
				
				jewels[i][j] = jewels[i - 1][j];
				jewels[i - 1][j] = -1;
				
				fellDown++;
			}
		}
	}
	
	$.each($(".fall"), function() {	
		movingItems++;	
		
		$(this).animate({
			top: "+=" + tileSize
		},
		{
			duration: 100,
		
			complete: function() {
				$(this).removeClass("fall");
				
				CheckRemove();
			}
		});
	});
    
	// if there is nothing else to fall, change the game state
	if(fellDown == 0)
	{
		gameState = "refill";
		
		movingItems++;
		
		CheckRemove();
	}
}

/* Fills the resulting voids */
function PlaceNewTiles()
{
	let tilesPlaced = 0;
  
	for(let i = 0; i < numCols; i++) 
	{
		if(jewels[0][i] == -1) 
		{			
			jewels[0][i] = Math.floor(Math.random() * (bgColors.length - 1));
			
			let tile = new TemplateTile(tileClass, tileIdPrefix + '_0_' + i, {}, {"top": Math.floor(heightWindow / 242.25) + "px",
				"left": ((i * tileSize) + Math.floor(widthWindow / 480)) + "px",
				"width": (tileSize - Math.floor(widthWindow / 192)) + "px",
				"height": (tileSize - Math.floor(heightWindow / 96.9)) + "px",
				"position": "absolute",
				"cursor": "pointer",
				"background": "url(img/" + bgColors[jewels[0][i]] + ")",
				"background-size": (tileSize - Math.floor(widthWindow / 192)) + "px " + (tileSize - Math.floor(heightWindow / 96.9)) + "px"}, {});
				
			CreateObject("#gamefield", tile.container);
      
			tilesPlaced++;
		}
	}
	
	/* if there are new tiles, check whether you need to lower something down */
	if(tilesPlaced) 
	{
		gameState = "remove";
		CheckFalling();
	}
	else
	{			
		if (flagSuperTileImg == true)
		{		
			let super_tile_id = document.getElementById(tileIdPrefix + "_" + rowSuperTile + "_" + colSuperTile);
			
			super_tile_id.remove();
			
			jewels[rowSuperTile][colSuperTile] = bgColors.length + 1;
			
			let tile = new TemplateTile(tileClass, tileIdPrefix + '_' + rowSuperTile + '_' + colSuperTile, {}, {"top": ((rowSuperTile * tileSize) + Math.floor(heightWindow / 242.25)) + "px",
				"left": ((colSuperTile * tileSize) + Math.floor(widthWindow / 480)) + "px",
				"width": (tileSize - Math.floor(widthWindow / 192)) + "px",
				"height": (tileSize - Math.floor(heightWindow / 96.9)) + "px",
				"position": "absolute",
				"cursor": "pointer",
				"background": "url(img/" + bgColors[bgColors.length - 1] + ")",
				"background-size": (tileSize - Math.floor(widthWindow / 192)) + "px " + (tileSize - Math.floor(heightWindow / 96.9)) + "px"}, {});
				
			CreateObject("#gamefield", tile.container);
			
			flagSuperTileImg = false;
		}

		gameState = "pick";
		selectedRow= -1;
	}
}

/* Checks the field after each action for the game state */
function CheckRemove() 
{
	movingItems--;

	if(movingItems == 0) 
	{
		switch(gameState) 
		{
			case "switch":
			case "revert":
				if (flagBoosterBomb == false)
				{
					if (rowSuperTile == selectedRow && colSuperTile == selectedCol)
					{
						gameState = "remove";

						RemoveTiles(selectedRow, selectedCol);

						TileFade();
					}
					else
					{
						// checking if there are any collection groups
						if(IsStreak(selectedRow, selectedCol)) 
						{
							// if there are collection groups, you need to delete them
							gameState = "remove";
        
							// first we mark all tiles that are being deleted
							RemoveTiles(selectedRow, selectedCol);
							
							// and then remove them from the field
							TileFade();
						}
						else
						{
							gameState = "pick";
					
							selectedRow = -1;
						}
					}
				}
				
				if (flagBoosterBomb == true)
				{
					gameState = "remove";

					RemoveTiles(selectedRow, selectedCol);

					TileFade();
				}
				
				break;
			
			// after deleting, you need to "drop" the remaining tiles to fill the voids
			case "remove":
				CheckFalling();
			
				break;
			
			// when all tiles are lowered down, fill in the voids
			case "refill":
				PlaceNewTiles();
			
				break;
		}
	}
}

/* The processing function of the player's actions */
function TapHandler(event, target) 
{ 
	/* click on the title */
	if($(target).hasClass("tile"))
	{
		/* tile selection is expected */
		if(gameState == "pick")
		{			
			// define a row and column
			let row = parseInt($(target).attr("id").split("_")[1]);
			let col =  parseInt($(target).attr("id").split("_")[2]);
		
			// if no tile is selected, save the position of the selected tile
			if(selectedRow == -1)
			{
				selectedRow = row;
				selectedCol = col;
			}
			
			movingItems++;

			gameState = "switch";
		
			CheckRemove();
		}
	}
}


/* START GAME */

function StartGame()
{ 
	CreateObject("body", totalField.container);  // Creating main field
	
	CreateObject("#totalfield", fieledForTile.container);  //Creating a field for tiles
	
	CreateObject("#totalfield", fieldForText.container);  // Creating a field for displaying game data
	
	if (idStart == 0)
	{
		CreateObject("#fieledfortile", informationField.container);  // Creating starting field
		
		CreateObject("#fieledfortile", startButton.container);  // Creating starting button
		
		let button_start_game = document.getElementById('start_button');
		
		button_start_game.onclick = AuxiliaryFunction2;
	}
	else
	{
		AuxiliaryFunction2();
	}
}

$(document).ready(StartGame);