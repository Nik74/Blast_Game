/* Creating a field grid */
function FieldGrid()
{
	for(let i = 0; i < numRows; i++)
	{
		jewels[i] = new Array();
    
		for(let j = 0; j < numCols; j++)
		{
			jewels[i][j] = -1;
		}
	}
}


/* AUXILIARY FUNCTIONS */

/* Just an auxiliary function */
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
	win.Del();
	lose.Del();
	textStartStop.Del();
	buttonStart.Del();
	buttonEnd.Del();

	CreateObject("#fieldfortile", gameField.container);  // Creating a playing field
		
	CreateObject("#fieldfortext", buttonReload.container);  // Creating a button for shuffling tiles
	
	CreateObject("#fieldfortext", buttonBomb.container);  // Creating a button for booster bomb
	
	CreateObject("#fieldfortext", textBoosterBomb.container);  // Creating a label with the output count booster bomb
		
	CreateObject("#fieldfortext", textReload.container);  // Creating a label with the output of the shuffle counter
	
	CreateObject("#fieldfortext", textPoints.container);  // Creating a label with the output of points earned
	
	CreateObject("#fieldfortext", textMoves.container);  // Creating a label with the remaining moves output
		
	GenSetTile(0, numRows, 0, numCols, {}, "start");  // The generation of the initial set of tiles

	if (idStart == 0)
	{
		informationField.Del();
		
		startButton.Del();
		
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
			DelTile("super_tile", 0, numRows, 0, numCols);
					
			break;
	}
}

/* Auxiliary function places a tile to delete */
function DelTile(cause, row_min, row_max, col_min, col_max)
{
	for (let i = row_min; i < row_max; i++)
	{
		for (let j = col_min; j < col_max; j++)
		{
			$("#" + tileIdPrefix + "_" + i + "_" + j).addClass("remove");

			jewels[i][j] = -1;
			
			if (cause == "bomb")
			{
				TrackingSuperTile(i, j);
			}
					
			if (cause != "lose")
			{
				points += increasePoints;
			}
		}
	}
}

/* Auxiliary function for tracking the movement of a super tile */
function TrackingSuperTile(row_tracking, col_tracking)
{
	if ((rowSuperTile < row_tracking) && (colSuperTile == col_tracking))
	{
		rowSuperTile++;
	}
}

/* Auxiliary function for turning on music */
function AuxiliarySound(url_sound)
{
	let audio_stirring = new Audio();
	
	audio_stirring.src = url_sound;

	audio_stirring.autoplay = true;
}

/* Auxiliary function for checking tiles */
function AuxiliaryCheckTile(row_check, col_check)
{
	$("#" + tileIdPrefix + "_" + row_check + "_" + col_check).addClass("remove");
	
	jewels[row_check][col_check] = -1;
		
	TrackingSuperTile(row_check, col_check);
	
	points += increasePoints;
}


/* CLICKS FUNCTION*/

function ClickForStart()
{
	totalField.Del();
	
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
	
	UpdTextPointsAndMoves();
	
	textReload.TitleChange('Количество перемешиваний: ' + countReload);
	textBoosterBomb.TitleChange('Количество бомб: ' + countBoosterBomb);
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
				
				textBoosterBomb.TitleChange('Количество бомб: ' + countBoosterBomb);
			
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

/* Function to stop a ringtone in game */
function SoundInGameStop()
{
	playStopButtons = 2;
	
	buttonSoundOff.Del();
	
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
		
	buttonSoundOn.Del();
	
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
			
			textReload.TitleChange('Количество перемешиваний: ' + countReload);
	
			for (let i = 0; i < numRows; i++)
			{
				for (let j = 0; j < numCols; j++)
				{
					let del_element = document.getElementById(tileIdPrefix + '_' + i + '_' + j);

					del_element.remove();
				}
			}
			
			FieldGrid();
		
			GenSetTile(0, numRows, 0, numCols, {}, "start");
		
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


/* FUNCTIONS DELETE */

/* A function to remove the tiles at a loss */
function DelAllTile()
{	
	DelTile("lose", 0, numRows, 0, numCols);
	
	TileFade("lose");
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
	
	DelTile("bomb", tmp_row_top, tmp_row_bottom + 1, tmp_col_left, tmp_col_right + 1);
}


/* GAME */

/* Marking the tiles to be deleted with the remove class */
function CheckTiles(row_del, col_del, checkTile)
{
	let tmp = row_del;

	if (jewels[row_del][col_del] != -1)
	{
		AuxiliaryCheckTile(row_del, col_del);
	}

	if(tmp > 0 && jewels[tmp - 1][col_del] == checkTile)
	{
		AuxiliaryCheckTile((tmp - 1), col_del);
			
		tmp--;

		CheckTiles(tmp, col_del, checkTile);
	}
		
	tmp = row_del;

	if(tmp < numRows - 1 && jewels[tmp + 1][col_del] == checkTile)
	{
		AuxiliaryCheckTile((tmp + 1), col_del);
			
		tmp++;

		CheckTiles(tmp, col_del, checkTile);
	}

	tmp = col_del;

	if(tmp > 0 && jewels[row_del][tmp - 1] == checkTile)
	{
		AuxiliaryCheckTile(row_del, (tmp - 1));

		tmp--;

		CheckTiles(row_del, tmp, checkTile);
	}
		
	tmp = col_del;

	if(tmp < numCols - 1 && jewels[row_del][tmp + 1] == checkTile)
	{
		AuxiliaryCheckTile(row_del, (tmp + 1));
			
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
	
	UpdTextPointsAndMoves()
	
	if (remainingMoves >= 0 && points >= finishPoints)
	{
		CreateObject("#gamefield", win.container);
		
		SoundGameWin();
		
		AuxiliaryFunction();
	}
	
	if (remainingMoves == 0 && points < finishPoints)
	{
		CreateObject("#gamefield", lose.container);
		
		SoundGameOver();
		
		AuxiliaryFunction();
	}	
}

/* Removing tiles from the field */
function TileFade(cause)
{
	let dur;

	if (cause == "lose")
	{
		dur = 600;
	}
	else
	{
		dur = 450;
	}

	$.each($(".remove"), function(){
		movingItems++;
    
		$(this).animate({
			opacity:0
		},
		{			
			duration: dur,
			complete: function() {
				$(this).remove();
				
				if (cause != "lose")
				{
					// check the field status again
					CheckRemove();
				}
			}
		});
	});
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

		tmp = row_ver_streak;
		
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

/* Fills the resulting voids */
function PlaceNewTiles()
{
	let tilesPlaced = 0;
  
	tilesPlaced = GenSetTile(0, 1, 0, numCols, "new_tile", {});
	
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
			
			let tile = new TemplateTile(tileClass, tileIdPrefix + '_' + rowSuperTile + '_' + colSuperTile, {}, {"top": ((rowSuperTile * tileSize) + topIndentTile) + "px",
				"left": ((colSuperTile * tileSize) + leftIndentTile) + "px", "width": (tileSize - borderRadius) + "px",
				"height": (tileSize - topIndentGameField) + "px", "position": "absolute", "cursor": "pointer",
				"background": "url(img/" + bgColors[bgColors.length - 1] + ")",
				"background-size": (tileSize - borderRadius) + "px " + (tileSize - topIndentGameField) + "px"}, {});
				
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

						TileFade('');
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
							TileFade('');
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

					TileFade('');
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
	FieldGrid();  // Creating a grid for tiles
	
	CreateObject("body", totalField.container);  // Creating main field
	
	CreateObject("#totalfield", fieldForTile.container);  //Creating a field for tiles
	
	CreateObject("#totalfield", fieldForText.container);  // Creating a field for displaying game data
	
	if (idStart == 0)
	{
		CreateObject("#fieldfortile", informationField.container);  // Creating starting field
		
		CreateObject("#fieldfortile", startButton.container);  // Creating starting button
		
		let button_start_game = document.getElementById('start_button');
		
		button_start_game.onclick = AuxiliaryFunction2;
	}
	else
	{
		AuxiliaryFunction2();
	}
}

$(document).ready(StartGame);
