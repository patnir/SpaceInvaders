var gCanvas;
var gCounter;
var gInvaders;
var gIsGamePaused;
var gShip;
var gBullet;
var gIsInvadersAlive;
var gFired;
var gScore;
var gIsGameOver;
var gBulletExists;
var gIsMouseDown;
var gHighScore;

function body_load() {
    gHighScore = 0;
    canGame.onclick = game_onclick;
    window.onmousedown = game_onmousedown;
    window.onkeydown = game_keydown;
    window.onmousemove = game_onmousemove;
    window.onmouseup = game_onmouseup;
    gCanvas = canGame.getContext("2d");

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
    gBulletExists = false;
    gFired = false;
    gIsMouseDown = false;
    gIsGamePaused = false;
    gInvaders = [];
    gIsInvadersAlive = [];

    totalInvaders = 9;
    totalBullets = 3;

    invaderPositionX = 60;
    invaderPositionY = 30;

    for (var i = 0; i < totalInvaders; i++) {
        gIsInvadersAlive[i] = true;
        gInvaders[i] = new Object();
        gInvaders[i].X = invaderPositionX;
        gInvaders[i].Y = invaderPositionY;
        gInvaders[i].Height = 50;
        gInvaders[i].Width = 50;
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

    gBullet = new Object();
    gBullet.Width = 5;
    gBullet.Height = 20;
}

function gameLoop() {
    if (gIsGamePaused === false && gIsGameOver === false) {
        drawGamePanel();
        gameUpdateInvadersPosition();
        drawBullet();
        drawInvaders();
        moveBoard();
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
    if (event.clientX >= gShip.X
        && event.clientX <= gShip.X + gShip.Width
        && event.clientY >= gShip.Y
        && event.clientY <= gShip.Y + gShip.Height
        && event.clientX >= 0
        && event.clientX <= 440
        && event.clientY >= 0
        && event.clientY <= 960) {
        gIsMouseDown = true;
    }
}

function game_onmouseup(event) {
    if (gIsMouseDown === true) {
        gIsMouseDown = false;
    }
}

function game_onmousemove(event) {
    if (gIsMouseDown === true) {
        gShip.X = event.clientX - 70;
    }
}

function game_keydown(event) {
    if (gIsGamePaused === false) {
        switch (event.keyCode) {
            case 37:
                gShip.X -= 20;
                break;

            case 39:
                gShip.X += 20;
                break;

            case 32:
                if (gBulletExists ===false) {
                    gFired = true;
                }
                break;
        }
    }
}

function gameUpdateInvadersPosition() {
    if (gCounter > 15) {
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

function game_onclick(event) {
    // Pause Game
    if (event.clientX >= 450 && event.clientX <= 540) {
        if (event.clientY >= 10 && event.clientY <= 50) {
            if (gIsGamePaused === true) {
                gIsGamePaused = false;
                return;
            }
            else {
                gIsGamePaused = true;
                return;
            }
        }
    }

    // Restart Game
    if (event.clientX >= 450 && event.clientX <= 540) {
        if (event.clientY >= 60 && event.clientY <= 100) {
            gameInit();
            return;
        }
    }

    // Shoot bullet with click
    if (event.clientX >= 0 && event.clientX <= 440) {
        if (event.clientY >= 0 && event.clientY <= 900) {
            if (gBulletExists === false) {
                gFired = true;
            }
        }
    }
}

function drawInvaders() {
    var numberDrawn = 0;
    for (var i = 0; i < gInvaders.length; i++) {
        if (gBulletExists === true && gIsInvadersAlive[i] === true) {
            if (gInvaders[i].X <= gBullet.X
                && gInvaders[i].X + gInvaders[i].Height >= gBullet.X + gBullet.Width
                && gInvaders[i].Y <= gBullet.Y 
                && gInvaders[i].Y + gInvaders[i].Height >= gBullet.Y + gBullet.Height) {
                gBullet.Y = -100;
                gIsInvadersAlive[i] = false;
                gScore += 50;
                if (gScore >= gHighScore) {
                    gHighScore = gScore;
                }
            }
        }

        if (gIsInvadersAlive[i] === true && gIsGameOver === false) {
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

function moveBoard(event) {
    // if the ship goes out on the left side
    if (gShip.X <= -140) {
        gShip.X = 300;
    }

    // if the ship goes out on the right side
    if (gShip.X >= 440) {
        gShip.X = 0;
    }

    gCanvas.fillStyle = "purple";
    gCanvas.fillRect(gShip.X, gShip.Y, gShip.Width, gShip.Height);
}

function drawBullet() {
    if (gBulletExists === true) {
        gCanvas.fillStyle = "green";
        gBullet.Y -= 15;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
    }

    if (gBullet.Y < -20) {
        gBulletExists = false;
    }

    if (gFired === true && gBulletExists === false) {
        gCanvas.fillStyle = "green";
        gBullet.X = gShip.X + gShip.Width / 2;
        gBullet.Y = gShip.Y - gBullet.Height;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
        gFired = false;
        gBulletExists = true;
    }
}