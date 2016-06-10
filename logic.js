var gCanvas;
var gCounter;
var gInvaders;
var gIsGamePaused;
var gShip;
var gBullet;
var gSpaceDownKeyboard;
var gRightDownKeyboard;
var gLeftDownKeyboard;
var gIsInvadersAlive;
var gSpaceDownKeyboard;
var gCanFire;
var gBulletExists;

function body_load() {
    canGame.onclick = game_onclick;
    window.onmousedown = game_onmousedown;
    window.onkeydown = game_keydown;
    gCanvas = canGame.getContext("2d");

    gameInit();

    setInterval(gameLoop, 15);
}

function gameInit() {
    gCounter = 0;
    gCanFire = true;
    gIsGamePaused = false;
    gInvaders = [];
    gIsInvadersAlive = [];

    totalInvaders = 16

    x = 20;
    y = 10;

    for (var i = 0; i < totalInvaders; i++) {
        gIsInvadersAlive[i] = true;
        gInvaders[i] = new Object();
        gInvaders[i].X = x;
        gInvaders[i].Y = y;
        if ((i + 1) % 4 === 0) {
            y += 70;
            x = 20;
        } else {
            x = x + 100;
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
    console.log(gShip.X)
    if (gIsGamePaused != true) {
        gameUpdateInvadersPosition();
        gameDraw();
        drawBullet();
        drawInvaders();
        moveBoard();
        drawButtonPanel();
    }
    drawButtons();
}

function game_onmousedown(event) {
    if ()
}

function game_keydown(event) {
    if (gIsGamePaused === false) {
        switch (event.keyCode) {
            case 37:
                gRightDownKeyboard = false;
                gLeftDownKeyboard = true;
                break;

            case 39:
                gRightDownKeyboard = true;
                gLeftDownKeyboard = false;
                break;

            case 32:
                if (gBulletExists != true) {
                    gSpaceDownKeyboard = true;
                    gBulletExists = true;
                }
                break;
        }
    }
}

//window.addEventListener('mousem', function (event) {
//    if (event.clientX >= 0
//    && event.clientX <= 440
//    && event.clientY >= 0
//    && event.clientY <= 960) {
//        gShip.X = event.clientX - 70;
//    }
//    console.log(event.clientX);
//}, false);

//function canGame_onclick(event) {
//    gShip.X = event.clientX;
//}

function gameUpdateInvadersPosition() {
    if (gCounter > 15) {
        gCounter = 0;
        for (var i = 0; i < gInvaders.length; i++) {
            gInvaders[i].Y += 5;
        }
    }
    gCounter++;
}

function gameDraw() {
    gCanvas.fillStyle = "black";
    gCanvas.fillRect(0, 0, 540, 960);
}

function drawButtonPanel() {
    gCanvas.fillStyle = "white";
    gCanvas.fillRect(440, 0, 100, 960);
}

function drawButtons() {
    if (gIsGamePaused == false) {
        gCanvas.fillStyle = "black";
        gCanvas.fillRect(450, 10, 80, 40);
        gCanvas.fillStyle = "white";
        gCanvas.font = "20px Microsoft Sans Serif"
        gCanvas.fillText("Pause", 460, 37)
    }
    else {
        gCanvas.fillStyle = "black";
        gCanvas.fillRect(450, 10, 80, 40);
        gCanvas.fillStyle = "white";
        gCanvas.font = "20px Microsoft Sans Serif"
        gCanvas.fillText("Resume", 452, 37)
    }

    gCanvas.fillStyle = "black";
    gCanvas.fillRect(450, 60, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Restart", 457, 87)
}

function game_onclick(event) {
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

    if (event.clientX >= 450 && event.clientX <= 540) {
        if (event.clientY >= 60 && event.clientY <= 100) {
            gameInit();
            return;
        }
    }

    if (event.clientX >= 0 && event.clientX <= 440) {
        if (event.clientY >= 0 && event.clientY <= 960) {
            if (gBulletExists != true) {
                gSpaceDownKeyboard = true;
                gBulletExists = true;
            }
        }
    }
}

function drawInvaders() {
    for (var i = 0; i < gInvaders.length; i++) {
        if (gBulletExists === true && gIsInvadersAlive[i] === true) {
            if (gInvaders[i].X <= gBullet.X && gInvaders[i].X + 50 >= gBullet.X + gBullet.Width) {
                if (gInvaders[i].Y <= gBullet.Y && gInvaders[i].Y + 50 >= gBullet.Y + gBullet.Height) {
                    gBullet.Y = -100;
                    gIsInvadersAlive[i] = false;
                }
            }
        }

        if (gIsInvadersAlive[i] === true) {
            gCanvas.fillStyle = "yellow";
            gCanvas.fillRect(gInvaders[i].X, gInvaders[i].Y, 50, 50);
        }
    }
}

function moveBoard(event) {
    if (gRightDownKeyboard === true && gIsGamePaused != true) {
        gShip.X += 20;
        gRightDownKeyboard = false;
    }
    else if (gLeftDownKeyboard === true && gIsGamePaused != true) {
        gShip.X -= 20;
        gLeftDownKeyboard = false
    }

    if (gShip.X <= -140) {
        gShip.X = 300;
    }

    if (gShip.X >= 440) {
        gShip.X = 0;
    }

    gCanvas.fillStyle = "purple";
    gCanvas.fillRect(gShip.X, gShip.Y, gShip.Width, gShip.Height);
}

function drawBullet() {
    if (gBulletExists === true && gIsGamePaused != true) {
        gCanvas.fillStyle = "green";
        gBullet.Y -= 15;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
    }

    if (gBullet.Y < -20 && gIsGamePaused != true) {
        gCanFire = true;
        gBulletExists = false;
    }

    if (gSpaceDownKeyboard === true && gCanFire === true && gIsGamePaused != true) {
        gCanvas.fillStyle = "green";
        gBullet.X = gShip.X + gShip.Width / 2;
        gBullet.Y = gShip.Y - gBullet.Height;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
        gCanFire = false;
        gBulletExists = true;
        gSpaceDownKeyboard = false;
    }
}