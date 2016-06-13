var gCanvas;
var gCounter;
var gFrames;

var gIsGamePaused;
var gIsGameOver;

var gCurrentLevel;

var gIsMouseDownOnShip

var gShip;

var gBullets;

var gInvaders;

var gScore;
var gHighScore;

function body_load() {
    window.onkeydown = game_keydown;

    canGame.onmousedown = game_onmousedown;
    canGame.onmousemove = game_onmousemove;
    canGame.onmouseup = game_onmouseup;
    gCanvas = canGame.getContext("2d");

    gFrames = 15;
    gCurrentLevel = 1;

    gameInit();

    setInterval(gameLoop, 15);
}

function ditStorageGet(key, dfltValue) {
    var value = localStorage.getItem(key);
    if (value == undefined) {
        return dfltValue;
    }
    return value;
}


function gameInit() {
    gScore = 0;
    gHighScore = ditStorageGet('zip', 0)
    gCounter = 0;
    gCanFire = true;
    gIsGameOver = false;
    gIsMouseDownOnShip = false;
    gIsGamePaused = false;
    gInvaders = [];
    gBullets = [];

    totalInvaders = 9;
    totalBullets = 3;

    invaderPositionX = 60;
    invaderPositionY = 30;

    for (var i = 0; i < totalInvaders; i++) {
        gInvaders[i] = new Object();
        gInvaders[i].X = invaderPositionX;
        gInvaders[i].Y = invaderPositionY;
        gInvaders[i].Height = 50;
        gInvaders[i].Width = 50;
        gInvaders[i].IsAlive = true;
        if ((i + 1) % 3 === 0) {
            invaderPositionY += 70;
            invaderPositionX = 60;
        } else {
            invaderPositionX += 125;
        }
    }
    gShip = new Object();
    gShip.X = 140;
    gShip.Y = 900;
    gShip.Width = 150;
    gShip.Height = 30;

    for (var i = 0; i < totalBullets; i++) {
        gBullets[i] = new Object();
        gBullets[i].Width = 5;
        gBullets[i].Height = 20;
        gBullets[i].OnScreen = false;
        gBullets[i].Fired = false;
    }
}

function gameLoop() {
    if (gIsGamePaused === false && gIsGameOver === false) {
        drawGamePanel();
        gameUpdateInvadersPosition();
        drawBullets();
        drawInvaders();
        drawShip();
    }
    drawButtonPanel();
    drawButtons();
    drawScores();
    if (gIsGameOver === true) {
        if (gScore == gHighScore) {
            localStorage.zip = "" + gHighScore + "";
            var userZip = localStorage.zip;
        }
    }
}

function game_onmousedown(event) {

    if (event.clientX >= 450
        && event.clientX <= 540
        && event.clientY >= 60
        && event.clientY <= 100) {
        gameInit();
        return;
    }

    // Gamepaused logic

    if (gIsGameOver === true || gIsGamePaused === true) {
        return;
    }

    if (event.clientX >= gShip.X
    && event.clientX <= gShip.X + gShip.Width
    && event.clientY >= gShip.Y
    && event.clientY <= gShip.Y + gShip.Height
    && event.clientX >= 0
    && event.clientX <= 440
    && event.clientY >= 0
    && event.clientY <= 960) {
        gIsMouseDownOnShip = true;
    }

    if (event.clientX >= 450
        && event.clientX <= 540
        && event.clientY >= 10
        && event.clientY <= 50) {
        if (gIsGamePaused === true) {
            gIsGamePaused = false;
            return;
        }
        else {
            gIsGamePaused = true;
            return;
        }
    }

    if (event.clientX >= 0
        && event.clientX <= 440
        && event.clientY >= 0
        && event.clientY <= 900) {
        for (var i = 0; i < gBullets.length; i++) {
            if (gBullets[i].OnScreen === false) {
                gBullets[i].Fired = true;
                break;
            }
        }
    }
}

function game_onmouseup(event) {
    gIsMouseDownOnShip = false;
}

function game_onmousemove(event) {
    if (gIsMouseDownOnShip === true) {
        gShip.X = event.clientX - 70;
    }
}

function game_keydown(event) {
    if (gIsGamePaused === true) {
        return;
    }
    switch (event.keyCode) {
        case 37:
            gShip.X -= 20;
            break;

        case 39:
            gShip.X += 20;
            break;

        case 32:
            for (var i = 0; i < gBullets.length; i++) {
                if (gBullets[i].OnScreen === false) {
                    gBullets[i].Fired = true;
                    break;
                }
            }
            break;
    }
}

function gameUpdateInvadersPosition() {
    if (gCounter > gFrames) {
        gCounter = 0;
        for (var i = 0; i < gInvaders.length; i++) {
            gInvaders[i].Y += 15;
        }
    }
    gCounter++;
}

function drawGamePanel() {
    gCanvas.fillStyle = "black";
    gCanvas.fillRect(0, 0, 540, 960);
}

function drawButtonPanel() {
    gCanvas.fillStyle = "white";
    gCanvas.fillRect(440, 0, 100, 960);
}

function drawButtons() {
    gCanvas.fillStyle = "black";
    gCanvas.fillRect(450, 10, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    if (gIsGamePaused == false) {
        gCanvas.fillText("Pause", 460, 37)
    }
    else {
        gCanvas.fillText("Resume", 452, 37)
    }

    gCanvas.fillStyle = "black";
    gCanvas.fillRect(450, 60, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Restart", 457, 87)

    // Level 1
    if (gCurrentLevel === 1) {
        gCanvas.fillStyle = "red";
    } else {
        gCanvas.fillStyle = "black";
    }
    gCanvas.fillRect(450, 160, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Level 1", 457, 187)

    // Level 2
    if (gCurrentLevel === 2) {
        gCanvas.fillStyle = "red";
    } else {
        gCanvas.fillStyle = "black";
    }
    gCanvas.fillRect(450, 210, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Level 2", 457, 237)

    // Level 3
    if (gCurrentLevel === 3) {
        gCanvas.fillStyle = "red";
    } else {
        gCanvas.fillStyle = "black";
    }
    gCanvas.fillRect(450, 260, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Level 3", 457, 287)

    // Level 4
    if (gCurrentLevel === 4) {
        gCanvas.fillStyle = "red";
    } else {
        gCanvas.fillStyle = "black";
    }
    gCanvas.fillRect(450, 310, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Level 4", 457, 337)

    // Level 5
    if (gCurrentLevel === 5) {
        gCanvas.fillStyle = "red";
    } else {
        gCanvas.fillStyle = "black";
    }
    gCanvas.fillRect(450, 360, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Level 5", 457, 387);

}

function drawScores() {
    gCanvas.fillStyle = "black";
    gCanvas.fillRect(450, 780, 80, 70);
    gCanvas.fillStyle = "white";
    gCanvas.font = "16px Microsoft Sans Serif"
    gCanvas.fillText("Highscore", 455, 805)
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("  " + gHighScore, 457, 840)

    gCanvas.fillStyle = "black";
    gCanvas.fillRect(450, 870, 80, 70);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Score", 457, 900)
    gCanvas.fillText("  " + gScore, 457, 930)
}

function drawInvaders() {
    var numberDrawn = 0;
    for (var i = 0; i < gInvaders.length; i++) {
        for (var j = 0; j < gBullets.length; j++) {
            if (gBullets[j].OnScreen === true
                && gInvaders[i].IsAlive === true
                && gInvaders[i].X <= gBullets[j].X
                && gInvaders[i].X + gInvaders[i].Height >= gBullets[j].X + gBullets[j].Width
                && gInvaders[i].Y <= gBullets[j].Y
                && gInvaders[i].Y + gInvaders[i].Height >= gBullets[j].Y + gBullets[j].Height) {

                gBullets[j].Y = -100;
                gInvaders[i].IsAlive = false;
                gScore += 50;

                if (gScore >= gHighScore) {
                    gHighScore = gScore;
                }
            }
        }

        if (gInvaders[i].IsAlive === true && gIsGameOver === false) {
            if (gInvaders[i].Y + gInvaders[i].Height > 960) {
                gIsGameOver = true;
                displayGameOver();
                return;
            }
            gCanvas.fillStyle = "yellow";
            gCanvas.fillRect(gInvaders[i].X, gInvaders[i].Y, gInvaders[i].Width, gInvaders[i].Height);
            numberDrawn += 1;
        }
    }
    if (numberDrawn == 0) {
        gIsGameOver = true;
        displayWinner();
    }
}

function displayWinner() {
    drawGamePanel();
    gCanvas.fillStyle = "white";
    gCanvas.font = "40px Microsoft Sans Serif"
    gCanvas.fillText("Invaders Defeated", 40, 400)
}

function displayGameOver() {
    drawGamePanel();
    gCanvas.fillStyle = "white";
    gCanvas.font = "60px Microsoft Sans Serif"
    gCanvas.fillText("Game Over", 60, 400)
}

function drawBullets() {
    for (var i = 0; i < gBullets.length; i++) {
        if (gBullets[i].OnScreen === true) {
            gCanvas.fillStyle = "green";
            gBullets[i].Y -= 10;
            gCanvas.fillRect(gBullets[i].X, gBullets[i].Y, gBullets[i].Width, gBullets[i].Height);
        }

        if (gBullets[i].Y < -20) {
            gBullets[i].OnScreen = false;
        }

        if (gBullets[i].Fired === true && gBullets[i].OnScreen === false) {
            gCanvas.fillStyle = "green";
            gBullets[i].X = gShip.X + gShip.Width / 2;
            gBullets[i].Y = gShip.Y - gBullets[i].Height;
            gCanvas.fillRect(gBullets[i].X, gBullets[i].Y, gBullets[i].Width, gBullets[i].Height);
            gBullets[i].Fired = false; 
            gBullets[i].OnScreen = true;
        }
    }
}

function drawShip(event) {
    if (gShip.X <= -140) {
        gShip.X = 300;
    }

    if (gShip.X >= 440) {
        gShip.X = 0;
    }

    gCanvas.fillStyle = "purple";
    gCanvas.fillRect(gShip.X, gShip.Y, gShip.Width, gShip.Height);
}