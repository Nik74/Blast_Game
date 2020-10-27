/* CUSTOMIZATION */
const widthWindow = $(window).width();  // Width of the browser window
const heightWindow = $(window).height();  // Height of the browser window

const tileSize = Math.floor(heightWindow / 15.21875);  // Size of the tile

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

// Constants for the location of the objects with different resolutions of the browser window
const marginWidth = Math.floor(widthWindow / 128);  // Width indent from the edges of the browser window for totalfield
const marginHeight = Math.floor(heightWindow / 57.29);  // Height offset from the edges of the browser window for totalfield
const widthIncr = Math.floor(widthWindow / 96);  // The number by which the field width is increased fieldfortile, and indent to the right 
												//  for button_reload, button_bomb, button_sound_off, button_sound_on
const heightIncr = Math.floor(heightWindow / 48.45);  // The number by which the height of the fields is increased fieldfortile, fieldfortext
const leftIndent = Math.floor(widthWindow / 4.26);  // Indented to the right to fieldfortile
const topIndent = Math.floor(heightWindow / 11.195);  // Top indent for fieldfortile
const topIndentFieldForText = Math.floor(heightWindow / 1.403);  // Top indent for fieldfortext
const widthIncrFieldFortext = Math.floor(widthWindow / 4.1);  // Field width fieldfortext
const leftIndentInfField = Math.floor(widthWindow / 19.2);  // Left indent for inf_field, text_start_stop and button button_start
const topIndentInfField = Math.floor(heightWindow / 3.876);  // Top indent for inf_field
const widthIncrInfField = Math.floor(widthWindow / 7);  // Field width inf_field
const heightIncrInfFied = Math.floor(heightWindow / 4.4);  // The height of the field inf_field
const fontSize = Math.floor(widthWindow / 106.6);  // Font size
const leftIndentFieldForText = Math.floor(widthWindow / 3.2);  // Number to increase the left margin for fieldfortext
const borderRadius = Math.floor(widthWindow / 192);  // Border radius for inf_field, text_booster_bomb, text_points, text_reload, text_moves, text_start_stop; 
													// Left indent for gamefield; number of width changes for winfield and tiles
const topIndentGameField = Math.floor(heightWindow / 96.9);  // Top indent for gamefield, losefield, winfield; number of height changes for тайлов;
const leftIndentText = Math.floor(widthWindow / 10.6);  // Left indent for text_booster_bomb, text_reload, text_points, text_movestext_moves
const topIndentBoosterBomb = Math.floor(heightWindow / 10);   // Top indent for text_booster_bomb
const windthIncrBoosterBomb = Math.floor(widthWindow / 12.8);  // Width for text_booster_bomb, text_points
const heightBoosterBomb = Math.floor(heightWindow / 18);  // Height for text_booster_bomb
const topIndentReload = Math.floor(heightWindow / 64.6);  // Top indent for text_reload
const windthIncrReload = Math.floor(widthWindow / 7.68);  // Width for text_reload, text_moves
const heightIncrReload = Math.floor(heightWindow / 17.62);  // Height for text_reload
const topIndentPoints = Math.floor(heightWindow / 5.8);  // Top indent for text_points
const heightIncrPoints = Math.floor(heightWindow / 36);  // Height for text_points, text_moves
const topIndentMoves = Math.floor(heightWindow / 4.6);  // Top indent for text_moves
const topIndentStartStop = Math.floor(heightWindow / 3.5);  // Top indent for text_start_stop
const widthIncrStartStop = Math.floor(widthWindow / 7.1);  // Width for text_start_stop
const heightIncrStartStop = Math.floor(heightWindow / 34);  // Height for text_start_stop
const topIndentStartButton = Math.floor(heightWindow / 2);  // Top indent for start_button
const widthIncrStartButton = Math.floor(widthWindow / 10);  // Width for start_button
const leftIndentStartButton = Math.floor(widthWindow / 13.5);  // Left indent for start_button
const heightIncrStartButton = Math.floor(heightWindow / 15);  // Height for start_button
const topIndentButtonReload = Math.floor(heightWindow / 38.76);  // Top indent for button_reload
const widthIncrButtonReload = Math.floor(widthWindow / 13.91);  // Width for button_reload, button_bomb
const heightIncrButtonReload = Math.floor(heightWindow / 32.3);  // Height for button_reload, button_bomb, button_start, button_stop
const topIndentButtonBomb = Math.floor(heightWindow / 9.69);  // Top indent for button_bomb
const bottomIndentButtonMute = Math.floor(heightWindow / 35);  // Bottom indent and height for button_sound_off, button_sound_on
const widthIncrButtonMute = Math.floor(widthWindow / 60);  // Width for button_sound_off, button_sound_on
const topIndentButtonStart = Math.floor(heightWindow / 3);  // Top indent for button_start, button_stop
const widthIncrButtonStart = Math.floor(widthWindow / 40.85);  // Width for button_start
const leftIndentButtonEnd = Math.floor(widthWindow / 6.194);  // Left indent for button_stop
const widthIncrButtonEnd = Math.floor(widthWindow / 33.1);  // Width for button_stop
const topIndentTile = Math.floor(heightWindow / 242.25);  // The number for the top indent for tiles
const leftIndentTile = Math.floor(widthWindow / 480);  // Number to indent on the left for tiles

/* Background tiles */
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

var idStart = 0;  // ID that started again
var points = 0;  // Points
var playStopButtons = 1;  // 1 - off, 2 - on
var movingItems = 0;  // Number of tiles currently being moved
var rowSuperTile = -1;  // Row of super tile
var colSuperTile = -1;  // Col of super tile
var selectedRow = -1;  // Selected row
var selectedCol = -1;  // Selected column

var countBoosterBomb = bomb;  // Number of bombs
var countReload = reload;  // Number of remaining mixing
var remainingMoves = moves;  // Number of remaining moves

var jewels = new Array();  // Two-dimensional array of tiles on the field

var flagBoosterBomb = false;  //For activating booster bomb
var flagSuperTile = false;  // For activating super tile
var flagSuperTileImg = false;

var gameState = "pick";  // Current state of the field - waiting for tile selection

var audioSound = new Audio();
	
audioSound.src = 'sound/sound.mp3';


/* FIELDS AND BUTTONS*/

/* Field creation template */
class Template{
	constructor(object, name_id, css, title)
	{
		this.container = document.createElement(object);
	
		this.container.setAttribute("id", name_id);
	
		FuncForTemplate(this.container, css, title);
	}
	
	// Deleting a field
	Del()
	{
		this.container.remove();
	}
	
	// Changing the title
	TitleChange(title)
	{
		$(this.container).html(title);
	}
}


/* TILES */
class TemplateTile
{
	constructor(name_class, name_id, add_class,  css, title)
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
}


// Main field
const totalField = new Template("div", "totalfield", {"background-color": "#071627", "position": "relative",
	"width": (widthWindow - marginWidth) + "px", "height": (heightWindow - marginHeight) + "px"}, {});
	
// Field for displaying tiles
const fieldForTile = new Template("div", "fieldfortile", {"background": "url(img/field.gif",
	"background-size": (numCols * tileSize + widthIncr) + "px " + (numRows * tileSize  + heightIncr) + "px",
	"position": "relative", "width": (numCols * tileSize + widthIncr) + "px",
	"height": (numRows * tileSize + heightIncr) + "px", "left": leftIndent + "px", "top": topIndent + "px"}, {});
	
// Field for displaying game data
const fieldForText = new Template("div", "fieldfortext", {"left": (numCols * tileSize + leftIndentFieldForText) + "px",
	"top": -(topIndentFieldForText) + "px", "background": "url(img/field.gif",
	"background-size": widthIncrFieldFortext + "px " + (numRows * tileSize + heightIncr) + "px",
	"position": "relative", "width": widthIncrFieldFortext + "px", "height": (numRows * tileSize + heightIncr) + "px"}, {});

// Information field
let informationField = new Template("div", "inf_field", {"position": "absolute",
	"left": leftIndentInfField + "px", "top": topIndentInfField + "px",
	"color": "white", "width": widthIncrInfField + "px",
	"height": heightIncrInfFied + "px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": widthIncrInfField + "px " + heightIncrInfFied + "px",
	"border-radius": borderRadius + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"},
	'<p>Приветствую Вас! <p>Для победы Вам нужно набрать ' + finishPoints + ' очков за ' + moves + ' ходов, "уничтожая" группы в минимум два блока.');

// Game field
const gameField = new Template("div", "gamefield", {"left": borderRadius + "px",
	"top": topIndentGameField + "px", "position": "relative",
	"width": (numCols * tileSize) + "px", "height": (numRows * tileSize) + "px"}, {});

// Text for booster bomb
const textBoosterBomb = new Template("div", "text_booster_bomb", {"position": "absolute",
	"left": leftIndentText + "px", "top": topIndentBoosterBomb + "px",
	"color": "white", "width": windthIncrBoosterBomb + "px",
	"height": heightBoosterBomb + "px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": windthIncrBoosterBomb + "px " + heightBoosterBomb + "px",
	"border-radius": borderRadius + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"}, 'Количество бомб: ' + countBoosterBomb);
	
// Text for reload
const textReload = new Template("div", "text_reload", {"position": "absolute",
	"left": leftIndentText + "px", "top": topIndentReload + "px",
	"color": "white", "width": windthIncrReload + "px",
	"height": heightIncrReload + "px", "font-size":fontSize + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": windthIncrReload + "px " + heightIncrReload + "px",
	"border-radius": borderRadius + "px", "text-align": "center",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, 'Количество перемешиваний: ' + countReload);
	
// Text for points
const textPoints = new Template("div", "text_points", {"position": "absolute",
	"left": leftIndentText + "px", "top": topIndentPoints + "px",
	"color": "white", "width": windthIncrBoosterBomb + "px",
	"height": heightIncrPoints + "px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": windthIncrBoosterBomb + "px " + heightIncrPoints + "px",
	"border-radius": borderRadius + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"}, 'Очки: ' + points);
	
// Text for moves
const textMoves = new Template("div", "text_moves", {"position": "absolute",
	"left": leftIndentText + "px", "top": topIndentMoves + "px",
	"color": "white", "width": windthIncrReload + "px",
	"height": heightIncrPoints + "px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": windthIncrReload + "px " + heightIncrPoints + "px",
	"border-radius": borderRadius + "px",
	"text-align": "center", "-webkit-touch-callout": "none", "-webkit-user-select": "none",
	"-khtml-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none",
	"user-select": "none"}, 'Оставшиеся ходы: ' + remainingMoves);
	
// Block with the output of loss
const lose = new Template("div", "losefield", {"top": topIndentGameField + "px",
	"position": "relative", "width": (numCols * tileSize) + "px",
	"height": (numRows * tileSize) + "px", "background": "url(img/lose.gif)",
	"background-size": (numCols * tileSize) + "px " + (numRows * tileSize) + "px"}, {});
	
// Block with withdrawal of winnings
const win = new Template("div", "winfield", {"top": topIndentGameField + "px",
	"position": "relative", "width": (numCols * tileSize - borderRadius) + "px",
	"height": (numRows * tileSize) + "px", "background": "url(img/win.gif)",
	"background-size": (numCols * tileSize - borderRadius) + "px " + (numRows * tileSize) + "px"}, {});
	
// Displays a question about another game
const textStartStop = new Template("div", "text_start_stop", {"position": "absolute",
	"left": leftIndentInfField + "px", "top": topIndentStartStop + "px",
	"color": "white", "width": widthIncrStartStop + "px",
	"height": heightIncrStartStop + "px", "font-size": fontSize + "pt", "color": "white",
	"font-family": "Marvin", "background": "url(img/field_for_text.gif",
	"background-size": widthIncrStartStop + "px " + heightIncrStartStop + "px",
	"border-radius": borderRadius + "px", "text-align": "center",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, "Хотите сыграть еще раз?");

// Start button
const startButton = new Template("button", "start_button", {"position": "absolute", "left": leftIndentStartButton + "px",
	"top": topIndentStartButton + "px", "background": "url(img/button.gif)",
	"background-size": widthIncrStartButton + "px " + heightIncrStartButton + "px",
	"border": "0px", "font-size": fontSize + "pt", "color": "white",
	"font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrStartButton + "px", "height": heightIncrStartButton + "px"}, "Начать игру!");
	
// Button reload
const buttonReload = new Template("button", "button_reload", {"position": "absolute",
	"left": widthIncr + "px", "top": topIndentButtonReload + "px",
	"background": "url(img/button.gif)", "background-size": widthIncrButtonReload + "px " + heightIncrButtonReload + "px",
	"border": "0px", "font-size": fontSize + "pt", "color": "white",
	"font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrButtonReload + "px", "height": heightIncrButtonReload + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, "Перемешать");
	
// Button for bomb
const buttonBomb = new Template("button", "button_bomb", {"position": "absolute",
	"left": widthIncr + "px", "top": topIndentButtonBomb + "px",
	"background": "url(img/button.gif)", "background-size": widthIncrButtonReload + "px " + heightIncrButtonReload + "px",
	"border": "0px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrButtonReload + "px", "height": heightIncrButtonReload + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, "Бомба");
	
// Button for mute the music
const buttonSoundOff = new Template("button", "button_sound_off", {"position": "absolute",
	"left": widthIncr + "px", "bottom": bottomIndentButtonMute + "px",
	"background": "url(img/sound_off.gif)",
	"background-size": widthIncrButtonMute + "px " + bottomIndentButtonMute + "px",
	"border": "0px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrButtonMute + "px", "height": bottomIndentButtonMute + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, {});
	
// Button for launch music
const buttonSoundOn = new Template("button", "button_sound_on", {"position": "absolute",
	"left": widthIncr + "px", "bottom": bottomIndentButtonMute + "px",
	"background": "url(img/sound_on.gif)",
	"background-size": widthIncrButtonMute + "px " + bottomIndentButtonMute + "px",
	"border": "0px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrButtonMute + "px", "height": bottomIndentButtonMute + "px",
	"-webkit-touch-callout": "none", "-webkit-user-select": "none", "-khtml-user-select": "none",
	"-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none"}, {});
	
// Buttons to start a new game
const buttonStart = new Template("button", "button_start", {"position": "absolute",
	"left": leftIndentInfField + "px", "top": topIndentButtonStart + "px",
	"background": "url(img/button.gif)",
	"background-size": widthIncrButtonStart + "px " + heightIncrButtonReload + "px",
	"border": "0px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrButtonStart + "px", "height": heightIncrButtonReload + "px"}, "Да!");
	
// Button end the game
const buttonEnd = new Template("button", "button_stop", {"position": "absolute",
	"left": leftIndentButtonEnd + "px", "top": topIndentButtonStart + "px",
	"background": "url(img/button.gif)",
	"background-size": widthIncrButtonEnd + "px " + heightIncrButtonReload + "px",
	"border": "0px", "font-size": fontSize + "pt",
	"color": "white", "font-family": "Marvin", "outline": "none", "cursor": "pointer",
	"width": widthIncrButtonEnd + "px", "height": heightIncrButtonReload + "px"}, "Нет!");


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

/* Function for updating the value of points scored */
function UpdTextPointsAndMoves()
{
	textPoints.TitleChange('Очки: ' + points);

	textMoves.TitleChange('Оставшиеся ходы: ' + remainingMoves);
}


/* SOUND */

/* Function to start a ringtone when stirring tiles*/
function SoundStirTile()
{	
	AuxiliarySound('sound/stirring.mp3');
}

/* Function to start a ringtone when game over */
function SoundGameOver()
{
	AuxiliarySound('sound/game_over.mp3');
}

/* Function to start a ringtone when deleting tiles */
function SoundDelTile()
{
	AuxiliarySound('sound/del_tile.mp3');
}

/* Function to start a ringtone when game win */
function SoundGameWin()
{
	AuxiliarySound('sound/game_win.mp3');
}


/* GAME */

/* The generation of the initial set of tiles */
function GenSetTile(row_min, row_max, col_min, col_max, cause, addclass)
{
	let tilesPlaced = 0;
	
	for (let i = row_min; i < row_max; i++)
	{
		for (let j = col_min; j < col_max; j++)
		{
			/*
			if the newly created chip is a collection group with the existing ones,
			replace it with a new one
			*/
			if(jewels[i][j] == -1)
			{
				jewels[i][j] = Math.floor(Math.random() * (bgColors.length - 1));		
			
				let tile = new TemplateTile(tileClass, tileIdPrefix + '_' + i + '_' + j, addclass, {"top": ((i * tileSize) + topIndentTile) + "px",
					"left": ((j * tileSize) + leftIndentTile) + "px", "width": (tileSize - borderRadius) + "px",
					"height": (tileSize - topIndentGameField) + "px", "position": "absolute", "cursor": "pointer",
					"background": "url(img/" + bgColors[jewels[i][j]] + ")",
					"background-size": (tileSize - borderRadius) + "px " + (tileSize - topIndentGameField) + "px"}, {});
				
				CreateObject("#gamefield", tile.container);
			
				if (cause == "new_tile")
				{
					tilesPlaced++;
				}
			}
		}
	}
	
	return tilesPlaced;
}
