/* Customization */
const width_window = $(window).width();  // Width of the browser window
const height_window = $(window).height();  // Height of the browser window

const tileSize = Math.floor($(window).height() / 15.21875);   // Size of the tile

const numRows = 12;  // Number of rows
const numCols = 7;  // Number of columns
const finish_points = 1000;  // The number of points required to win
const increase_points = 5;  // The number by which points are increased when the tile is destroyed
const moves = 80;  // The number of moves

const tileClass = "tile";  // Tile element class
const tileIdPrefix = "tile";  // Prefix for identifiers

let gameState = "pick";  // Current state of the field - waiting for tile selection

let selectedRow = -1;  // Selected row
let selectedCol = -1;  // Selected column
let movingItems = 0;  // Number of tiles currently being moved
let count_reload = 5;  // The number of remaining mixing. If you change this parameter, you also need to change the value in the click_for_start function
let points = 0;  // Points
let remaining_moves = moves;  // The number of remaining moves. If you change this parameter, you also need to change the value in the click_for_start function
let id_start = 0;  // ID that started again
	
let jewels = new Array();  // Two-dimensional array of tiles on the field
	
/* Tiles */
let bgColors = new Array(
	"yellow.gif",
	"red.gif",
	"purple.gif",
	"blue.gif",
	"green.gif",
	"orange.gif",
	"turquoise.gif",
	"magenta.gif"
);

/* Creating a field grid */
for(i = 0; i < numRows; i++)
{
	jewels[i] = new Array();
    
	for(j = 0; j < numCols; j++)
	{
		jewels[i][j] = -1;
	}
};

/* Creating a field */
function create_field()
{
	$("body").append('<div id = "totalfield"></div>');

	$("#totalfield").css({
		"background-color": "#071627",
		"position": "relative",		
		"width": (width_window - Math.floor($(window).width() / 128)) + "px",
		"height": (height_window - Math.floor($(window).height() / 57.29)) + "px"
    });	
}

/* Creating a field for displaying tiles */
function create_field_for_tile()
{
	$("#totalfield").append('<div id = "fieledfortile"></div>');

	$("#fieledfortile").css({
		"background": "url(img/field.gif",
		"background-size": (numCols * tileSize + Math.floor(width_window / 96)) + "px " + (numRows * tileSize  + Math.floor(height_window / 48.45)) + "px",
		"position": "relative",
		"width": (numCols * tileSize + Math.floor(width_window / 96)) + "px",
		"height": (numRows * tileSize + Math.floor(height_window / 48.45)) + "px",
		"left": Math.floor(width_window / 4.26) + "px",
		"top": Math.floor(height_window / 11.195) + "px"
    });
}

/* Creating an information field */
function information_field()
{
	$("#fieledfortile").append('<div id = "inf_field"><p>Приветствую Вас! <p>Для победы Вам нужно набрать ' + finish_points + ' очков за ' + moves + ' ходов.</div>');
	
	$("#inf_field").css({
		"position": "absolute",
		"left": Math.floor(width_window / 19.2) + "px",
		"top": Math.floor(height_window / 3.876) + "px",
		"color": "white",
		"width": Math.floor(width_window / 7) + "px",
		"height": Math.floor(height_window / 5.5) + "px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"background": "url(img/field_for_text.gif",
		"background-size": Math.floor(width_window / 7) + "px " + Math.floor(height_window / 5.5) + "px",
		"border-radius": Math.floor(width_window / 192) + "px",
		"text-align": "center",
		"-webkit-touch-callout": "none",
		"-webkit-user-select": "none",
		"-khtml-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none"
    });
}

/* Creating start button */
function start_button()
{
	$("#fieledfortile").append('<button id="start_button">Начать игру!</button>');
	
	$("#start_button").css({
		"position": "absolute",
		"left": Math.floor(width_window / 13.5) + "px",
		"top": Math.floor(height_window / 2) + "px",
		"background": "url(img/button.gif)",
		"background-size": Math.floor(width_window / 10) + "px " + Math.floor(height_window / 15) + "px",
		"border": "0px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"outline": "none",
		"cursor": "pointer",
		"width": Math.floor(width_window / 10) + "px",
		"height": Math.floor(height_window / 15) + "px"
	});
}

/* Creating a playing field */
function create_game_field()
{	
	$("#fieledfortile").append('<div id = "gamefield"></div>');

	$("#gamefield").css({
		"left": Math.floor(width_window / 192) + "px",
		"top": Math.floor(height_window / 96.9) + "px",
		"position": "relative",
		"width": (numCols * tileSize) + "px",
		"height": (numRows * tileSize) + "px"
    });
}

/* Creating a field for displaying game data */
function field_for_text()
{
	$("#totalfield").append('<div id = "fieldfortext"></div>');
		
	$("#fieldfortext").css({
		"left": (numCols * tileSize + Math.floor(width_window / 3.2)) + "px",
		"top": -(Math.floor(height_window / 1.403)) + "px",
		"background": "url(img/field.gif",
		"background-size": Math.floor(width_window / 4.1) + "px " + (numRows * tileSize + Math.floor(height_window / 48.45)) + "px",
		"position": "relative",
		"width": Math.floor(width_window / 4.1) + "px",
		"height": (numRows * tileSize + Math.floor(height_window / 48.45)) + "px"
    });
}

/* Creating a button for shuffling tiles */
function create_button_reload()
{	
	$("#fieldfortext").append('<button id="button_reload">Перемешать</button>');
	
	$("#button_reload").css({
		"position": "absolute",
		"left": Math.floor(width_window / 96) + "px",
		"top": Math.floor(height_window / 38.76) + "px",
		"background": "url(img/button.gif)",
		"background-size": Math.floor(width_window / 13.91) + "px " + Math.floor(height_window / 32.3) + "px",
		"border": "0px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"outline": "none",
		"cursor": "pointer",
		"width": Math.floor(width_window / 13.91) + "px",
		"height": Math.floor(height_window / 32.3) + "px",
		"-webkit-touch-callout": "none",
		"-webkit-user-select": "none",
		"-khtml-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none"
	});
}

/* Creating a label with the output of the shuffle counter */
function create_text_reload()
{
	$("#fieldfortext").append('<div id="text_reload">Количество перемешиваний: ' + count_reload + '</div>');
	
	$("#text_reload").css({
		"position": "absolute",
		"left": Math.floor(width_window / 10.6) + "px",
		"top": Math.floor(height_window / 64.6) + "px",
		"color": "white",
		"width": Math.floor(width_window / 7.68) + "px",
		"height": Math.floor(height_window / 17.62) + "px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"background": "url(img/field_for_text.gif",
		"background-size": Math.floor(width_window / 7.68) + "px " + Math.floor(height_window / 17.62) + "px",
		"border-radius": Math.floor(width_window / 192) + "px",
		"text-align": "center",
		"-webkit-touch-callout": "none",
		"-webkit-user-select": "none",
		"-khtml-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none"
	});
}

/* Creating a label with the output of points earned */
function create_text_points()
{
	$("#fieldfortext").append('<div id="text_points">Очки: ' + points + '</div>');
	
	$("#text_points").css({
		"position": "absolute",
		"left": Math.floor(width_window / 10.6) + "px",
		"top": Math.floor(height_window / 9.69) + "px",
		"color": "white",
		"width": Math.floor(width_window / 12.8) + "px",
		"height": Math.floor(height_window / 36) + "px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"background": "url(img/field_for_text.gif",
		"background-size": Math.floor(width_window / 7.68) + "px " + Math.floor(height_window / 36) + "px",
		"border-radius": Math.floor(width_window / 192) + "px",
		"text-align": "center",
		"-webkit-touch-callout": "none",
		"-webkit-user-select": "none",
		"-khtml-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none"
	});
}

/* Creating a label that displays the remaining number of moves */
function create_text_moves()
{
	$("#fieldfortext").append('<div id="text_moves">Оставшиеся ходы: ' + remaining_moves + '</div>');
	
	$("#text_moves").css({
		"position": "absolute",
		"left": Math.floor(width_window / 10.6) + "px",
		"top": Math.floor(height_window / 6.25) + "px",
		"color": "white",
		"width": Math.floor(width_window / 7.68) + "px",
		"height": Math.floor(height_window / 36) + "px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"background": "url(img/field_for_text.gif",
		"background-size": Math.floor(width_window / 7.68) + "px " + Math.floor(height_window / 36) + "px",
		"border-radius": Math.floor(width_window / 192) + "px",
		"text-align": "center",
		"-webkit-touch-callout": "none",
		"-webkit-user-select": "none",
		"-khtml-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none"
	});
}

/* A function that displays a question about another game and buttons to start a new game or end the game */
function start_stop()
{
	$("#fieldfortext").append('<div id="text_start_stop">Хотите сыграть еще раз?</div>');
	
	$("#text_start_stop").css({
		"position": "absolute",
		"left": Math.floor(width_window / 19.2) + "px",
		"top": Math.floor(height_window / 4.4) + "px",
		"color": "white",
		"width": Math.floor(width_window / 7.1) + "px",
		"height": Math.floor(height_window / 34) + "px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"background": "url(img/field_for_text.gif",
		"background-size": Math.floor(width_window / 7.1) + "px " + Math.floor(height_window / 34) + "px",
		"border-radius": Math.floor(width_window / 192) + "px",
		"text-align": "center",
		"-webkit-touch-callout": "none",
		"-webkit-user-select": "none",
		"-khtml-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none"
	});
	
	$("#fieldfortext").append('<button id="button_start">Да!</button>');
	
	$("#button_start").css({
		"position": "absolute",
		"left": Math.floor(width_window / 19.2) + "px",
		"top": Math.floor(height_window / 3.59) + "px",
		"background": "url(img/button.gif)",
		"background-size": Math.floor(width_window / 40.85) + "px " + Math.floor(height_window / 32.3) + "px",
		"border": "0px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"outline": "none",
		"cursor": "pointer",
		"width": Math.floor(width_window / 40.85) + "px",
		"height": Math.floor(height_window / 32.3) + "px"
	});
	
	$("#fieldfortext").append('<button id="button_stop">Нет!</button>');
	
	$("#button_stop").css({
		"position": "absolute",
		"left": Math.floor(width_window / 6.194) + "px",
		"top": Math.floor(height_window / 3.59) + "px",
		"background": "url(img/button.gif)",
		"background-size": Math.floor(width_window / 33.1) + "px " + Math.floor(height_window / 32.3) + "px",
		"border": "0px",
		"font-size": Math.floor(width_window / 106.6) + "pt",
		"color": "white",
		"font-family": "Marvin",
		"outline": "none",
		"cursor": "pointer",
		"width": Math.floor(width_window / 33.1) + "px",
		"height": Math.floor(height_window / 32.3) + "px"
	});
}

/* Create a block with the output of loss */
function lose()
{
	$("#gamefield").append('<div id = "losefield"></div>');
	
	$("#losefield").css({
		"top": Math.floor(height_window / 96.9) + "px",
		"position": "relative",
		"width": (numCols * tileSize) + "px",
		"height": (numRows * tileSize) + "px",
		"background": "url(img/lose.gif)",
		"background-size": (numCols * tileSize) + "px " + (numRows * tileSize) + "px"
	});
}

/* Creating a block with withdrawal of winnings */
function win()
{
	$("#gamefield").append('<div id = "winfield"></div>');
	
	$("#winfield").css({
		"top": Math.floor(height_window / 96.9) + "px",
		"position": "relative",
		"width": (numCols * tileSize) + "px",
		"height": (numRows * tileSize) + "px",
		"background": "url(img/win.gif)",
		"background-size": (numCols * tileSize) + "px " + (numRows * tileSize) + "px"
	});
}

/* Function for updating the value of points scored */
function del_text_points_and_moves()
{
	text_points_del = document.getElementById("text_points");
		
	text_points_del.remove();
	
	text_moves_del = document.getElementById("text_moves");
		
	text_moves_del.remove();
		
	create_text_points();
	
	create_text_moves();
}

/* A function to remove the tiles at a loss */
function del_all_tile()
{	
	for(i = 0; i < numRows; i++)
	{
		for(j = 0; j < numCols; j++)
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

/* Function to start a ringtone when deleting tiles */
function sound_del_tile()
{
	let audio = new Audio();
	
	audio.src = 'sound/del_tile.mp3';
	
	audio.autoplay = true;
}

/* Function to start a ringtone when stirring tiles*/
function sound_stir_tile()
{
	let audio = new Audio();
	
	audio.src = 'sound/stirring.mp3';
	
	audio.autoplay = true;
}

/* Function to start a ringtone when game over */
function sound_game_over()
{
	let audio = new Audio();
	
	audio.src = 'sound/game_over.mp3';
	
	audio.autoplay = true;
}

/* Function to start a ringtone when game win */
function sound_game_win()
{
	let audio = new Audio();
	
	audio.src = 'sound/game_win.mp3';
	
	audio.autoplay = true;
}

/* Function to start a ringtone in game */
function sound_in_game()
{
	let audio = new Audio();
	
	audio.src = 'sound/sound.mp3';
	
	audio.autoplay = true;
	
	audio.loop = "on";
}

/* The generation of the initial set of tiles */
function gen_set_tile()
{
	for(i = 0; i < numRows; i++)
	{
		for(j = 0; j < numCols; j++)
		{
			/*
			if the newly created chip is a collection group with the existing ones,
			replace it with a new one
			*/
			jewels[i][j] = Math.floor(Math.random() * 8);  // 8 because there are 8 elements in bgColors

			$("#gamefield").append('<div class = "' + tileClass + '" id = "' + tileIdPrefix + '_' + i + '_' + j + '"></div>').addClass("start");
    
			$("#" + tileIdPrefix + "_" + i + "_" + j).css({
				"top": ((i * tileSize) + Math.floor(height_window / 242.25)) + "px",
				"left": ((j * tileSize) + Math.floor(width_window / 480)) + "px",
				"width": (tileSize - Math.floor(width_window / 192)) + "px",
				"height": (tileSize - Math.floor(height_window / 96.9)) + "px",
				"position": "absolute",
				"cursor": "pointer",
				"background": "url(img/" + bgColors[jewels[i][j]] + ")",
				"background-size": (tileSize - Math.floor(width_window / 192)) + "px " + (tileSize - Math.floor(height_window / 96.9)) + "px"
			});
		}
	}
}

/* Function for shuffling tiles and changing the number of shuffles */
function click_for_reload() 
{
	if (document.getElementById("losefield") == null && document.getElementById("winfield") == null)
	{
		if (count_reload > 0)
		{
			let count_isStreak = 0;
			
			count_reload--;
	
			text_reload_del = document.getElementById("text_reload");
		
			text_reload_del.remove();
		
			create_text_reload()
	
			for(i = 0; i < numRows; i++)
			{
				for(j = 0; j < numCols; j++)
				{
					let del_element = document.getElementById(tileIdPrefix + '_' + i + '_' + j);

					del_element.remove();
				}
			}
		
			gen_set_tile();
		
			sound_stir_tile();
			
			/* Checking that there is a group of tiles on the field */
			for(i = 0; i < numRows; i++)
			{
				for (j = 0; j < numCols; j++)
				{
					if(!isStreak(i, j))
					{
						count_isStreak++;
					}
				}
			}
			
			if (count_isStreak == (numRows * numCols))
			{
				lose();
		
				sound_game_over();
		
				auxiliary_function();
			}
		}
	}
};

/* Function for starting a new game */
function click_for_start()
{
	let del_all = document.getElementById("totalfield");
	
	del_all.remove();
	
	gameState = "pick";
	
	selectedRow = -1; 
	selectedCol = -1;  
	movingItems = 0;
	count_reload = 5;
	points = 0;  
	remaining_moves = moves;
	
	id_start = 1;
	
	start_game();
}

/* Function for closing the tab at the end of the game */
function click_for_stop()
{
	window.close();
}

/* Checking for vertical collection groups */
function isVerticalStreak(row, col)
{
	if (row != -1 && col != -1)
	{
		let tileValue = jewels[row][col];
		let streak = 0;
		let tmp = row;

		while(tmp > 0 && jewels[tmp - 1][col] == tileValue)
		{
			streak++;
			tmp--;
		}

		while(tmp < numRows - 1 && jewels[tmp + 1][col] == tileValue)
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
function isHorizontalStreak(row, col)
{
	if (row != -1 && col != -1)
	{
		let tileValue = jewels[row][col];
		let streak = 0;
		let tmp = col;

		while(tmp > 0 && jewels[row][tmp - 1] == tileValue)
		{
			streak++;
			tmp--;
		}
  
		tmp = col;
  
		while(tmp < numCols - 1 && jewels[row][tmp + 1] == tileValue)
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

function isStreak(row, col)
{
	return isVerticalStreak(row, col) || isHorizontalStreak(row, col);
}

/* Just an auxiliary function) */
function auxiliary_function()
{
	del_all_tile();
	
	start_stop();
		
	let button_start = document.getElementById('button_start');
		
	let button_stop = document.getElementById('button_stop');

	button_start.onclick = click_for_start;
		
	button_stop.onclick = click_for_stop;
}

/* Marking the tiles to be deleted with the remove class */
function checkTiles(row, col, checkTile)
{
	let tmp = row;
	
	if (jewels[row][col] != -1)
	{
		$("#" + tileIdPrefix + "_" + row + "_" + col).addClass("remove");
	
		jewels[row][col] = -1;
	
		points += increase_points;
	}

	if(tmp > 0 && jewels[tmp - 1][col] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + (tmp - 1) + "_" + col).addClass("remove");

		jewels[tmp - 1][col] = -1;
			
		points += increase_points;
			
		tmp--;

		checkTiles(tmp, col, checkTile);
	}
		
	tmp = row;
    
	if(tmp < numRows - 1 && jewels[tmp + 1][col] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + (tmp + 1) + "_" + col).addClass("remove");

		jewels[tmp + 1][col] = -1;
			
		points += increase_points;
			
		tmp++;

		checkTiles(tmp, col, checkTile);
	}

	tmp = col;

	if(tmp > 0 && jewels[row][tmp - 1] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + row + "_" + (tmp - 1)).addClass("remove");

		jewels[row][tmp - 1] = -1;
			
		points += increase_points;

		tmp--;

		checkTiles(row, tmp, checkTile);
	}
		
	tmp = col;
		
	if(tmp < numCols - 1 && jewels[row][tmp + 1] == checkTile)
	{
		$("#" + tileIdPrefix + "_" + row + "_" + (tmp + 1)).addClass("remove");

		jewels[row][tmp + 1] = -1;
			
		points += increase_points;
			
		tmp++;

		checkTiles(row, tmp, checkTile);
	}
}

/* Removing them from the grid */
function removeTiles(row, col) 
{
	let tileValue = jewels[row][col];
	
	checkTiles(row, col, tileValue);
	
	remaining_moves--;

	sound_del_tile();
	
	del_text_points_and_moves()
	
	if (remaining_moves >= 0 && points >= finish_points)
	{
		win();
		
		sound_game_win()
		
		auxiliary_function();
	}
	
	if (remaining_moves == 0 && points < finish_points)
	{
		auxiliary_function();
	
		lose();
		
		sound_game_over();
	}	
}

/* Removing tiles from the field */
function tileFade()
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
				checkRemove();
			}
		});
	});
}

/* Shifting tiles */
function checkFalling() 
{
	let fellDown = 0;

	for(j = 0; j < numCols; j++) 
	{
		for(i = numRows - 1; i > 0; i--) 
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
				
				checkRemove();
			}
		});
	});
    
	// if there is nothing else to fall, change the game state
	if(fellDown == 0)
	{
		gameState = "refill";
		
		movingItems++;
		
		checkRemove();
	}
}

/* Fills the resulting voids */
function placeNewTiles()
{
	let tilesPlaced = 0;
  
	for(i = 0; i < numCols; i++) 
	{
		if(jewels[0][i] == -1) 
		{
			jewels[0][i] = Math.floor(Math.random() * 8);
			
			$("#gamefield").append('<div class = "' + tileClass + '" id = "' + tileIdPrefix + '_0_' + i + '"></div>');
			
			$("#" + tileIdPrefix + "_0_" + i).css({
				"top": Math.floor(height_window / 242.25) + "px",
				"left": ((i * tileSize) + Math.floor(width_window / 480)) + "px",
				"width": (tileSize - Math.floor(width_window / 192)) + "px",
				"height": (tileSize - Math.floor(height_window / 96.9)) + "px",
				"position": "absolute",
				"cursor": "pointer",
				"background": "url(img/" + bgColors[jewels[0][i]] + ")",
				"background-size": (tileSize - Math.floor(width_window / 192)) + "px " + (tileSize - Math.floor(height_window / 96.9)) + "px"
			});
      
			tilesPlaced++;
		}
	}
	
	/* if there are new tiles, check whether you need to lower something down */
	if(tilesPlaced) 
	{
		gameState = "remove";
		checkFalling();
	}
	else
	{
		gameState = "pick";
		selectedRow= -1;
	}
}

/* Checks the field after each action for the game state */
function checkRemove() 
{
	movingItems--;

	if(movingItems == 0) 
	{
		switch(gameState) 
		{
			case "switch":
			case "revert":
				// checking if there are any collection groups
				if(isStreak(selectedRow, selectedCol)) 
				{
					// if there are collection groups, you need to delete them
					gameState = "remove";
        
					// first we mark all tiles that are being deleted
					if(isStreak(selectedRow, selectedCol))
					{
						removeTiles(selectedRow, selectedCol);
					}
		
					// and then remove them from the field
					tileFade();
				}
				else
				{
					gameState = "pick";
					
					selectedRow = -1;
				}

				break;
			
			// after deleting, you need to "drop" the remaining tiles to fill the voids
			case "remove":
				checkFalling();
			
				break;
			
			// when all tiles are lowered down, fill in the voids
			case "refill":
				placeNewTiles();
			
				break;
		}
	}
}

/* The processing function of the player's actions */
function tapHandler(event, target) 
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
		
			checkRemove();
		}
	}
}

/* Auxiliary function 2 */
function auxiliary_function_2()
{
	create_game_field();  // Creating a playing field
		
	create_button_reload();  // Creating a button for shuffling tiles
		
	create_text_reload();  // Creating a label with the output of the shuffle counter
	
	create_text_points();  // Creating a label with the output of points earned
	
	create_text_moves();  // Creating a label with the remaining moves output
	
	gen_set_tile();  // The generation of the initial set of tiles

	if (id_start == 0)
	{
		document.getElementById('inf_field').remove();
		
		document.getElementById('start_button').remove();
		
		sound_in_game();
	}
		
	let button_reload = document.getElementById('button_reload');

	button_reload.onclick = click_for_reload;

	/* tracking the player's actions */
	$("#gamefield").swipe({
		tap: tapHandler
	});
}

function start_game()
{ 
	create_field();  // Creating a field
	
	create_field_for_tile();  // Creating a field for tiles
	
	field_for_text();  // Creating a field for displaying game data

	if (id_start == 0)
	{
		information_field();
	
		start_button();
	
		let button_start_game = document.getElementById('start_button');
	
		button_start_game.onclick = auxiliary_function_2;
	}
	else
	{
		auxiliary_function_2();
	}
}

$(document).ready(start_game);
