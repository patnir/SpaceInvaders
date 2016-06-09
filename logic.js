// Global variables.
var gCanvas;
var gCounter;
var gInvaders;
var gamePaused = false;
var gShip;
var gBullet;
var spaceDown;
var rightDown;
var leftDown;
var invadersAlive;
var spaceDown;
var canFire = true;
var shot;

function body_load() {
    canGame.onclick = checkPaused_onclick;
    gCanvas = canGame.getContext("2d");

    gameInit();

    setInterval(gameLoop, 15);
}

function gameInit() {
    gCounter = 0;

    gInvaders = [];
    invadersAlive = [];

    totalInvaders = 9

    x = 20;
    y = 10;

    for (var i = 0; i < totalInvaders; i++) {
        invadersAlive[i] = true;
        gInvaders[i] = new Object();
        gInvaders[i].X = x;
        gInvaders[i].Y = y;
        if ((i + 1) % 3 === 0 ) {
            y += 70;
            x = 20;
        } else {
            x = x + 100;
        }
    }
    gShip = new Object();
    gShip.X = 110;
    gShip.Y = 440;
    gShip.Width = 100;
    gShip.Height = 20;

    gBullet = new Object();
    gBullet.Width = 5;
    gBullet.Height = 20;
}

function gameLoop() {
    if (gamePaused != true) {
        gameUpdate();
        gameDraw();
        drawButtonPanel();
        drawInvaders();
        moveBoard();
        drawBullet();
        drawButtonPanel();
        drawButtons();
    }
}

window.addEventListener('keydown', function (event) {
    if (gamePaused === false) {
        switch (event.keyCode) {
            case 37:
                rightDown = false;
                leftDown = true;
                break;

            case 39:
                rightDown = true;
                leftDown = false;
                break;

            case 32:
                spaceDown = true;
                shot = true;
                break;
        }
    }
}, false);

function canGame_onclick(event) {
    gShip.X = event.clientX;
}

function gameUpdate() {
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
    gCanvas.fillRect(0, 0, 320, 480);
}

function drawButtonPanel() {
    gCanvas.fillStyle = "white";
    gCanvas.fillRect(320, 0, 100, 480);
}

function drawButtons() {
    gCanvas.fillStyle = "black";
    gCanvas.fillRect(330, 10, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Pause", 340, 35)

    gCanvas.fillStyle = "black";
    gCanvas.fillRect(330, 60, 80, 40);
    gCanvas.fillStyle = "white";
    gCanvas.font = "20px Microsoft Sans Serif"
    gCanvas.fillText("Restart", 340, 85)
}

function checkPaused_onclick(event) {
    if (event.clientX >= 330 && event.clientX <= 420) {
        if (event.clientY >= 10 && event.clientY <= 50) {
            if (gamePaused === true) {
                gamePaused = false;
                return;
            }
            else {
                gamePaused = true;
                return;
            }
        }
    }
    if (event.clientX >= 330 && event.clientX <= 420) {
        if (event.clientY >= 60 && event.clientY <= 100) {
            gameInit();
            if (gamePaused === true) {
                gamePaused = false;
                return;
            }
        }
    }
}

function drawInvaders() {
    for (var i = 0; i < gInvaders.length; i++) {
        if (shot === true && invadersAlive[i] === true) {
            if (gInvaders[i].X <= gBullet.X && gInvaders[i].X + 50 >= gBullet.X + gBullet.Width) {
                if (gInvaders[i].Y <= gBullet.Y && gInvaders[i].Y + 50 >= gBullet.Y + gBullet.Height) {
                    gBullet.Y = -100;
                    invadersAlive[i] = false;
                }
            }
        }

        if (invadersAlive[i] === true) {
            gCanvas.fillStyle = "yellow";
            gCanvas.fillRect(gInvaders[i].X, gInvaders[i].Y, 50, 50);
        }
    }
}

function moveBoard() {
    if (rightDown === true && gamePaused != true) {
        gShip.X += 20;
        rightDown = false;
    }
    if (leftDown === true && gamePaused != true) {
        gShip.X -= 20;
        leftDown = false
    }

    if (gShip.X <= -100) {
        gShip.X = 220;
    }

    if (gShip.X >= 320) {
        gShip.X = 0;
    }

    gCanvas.fillStyle = "purple";
    gCanvas.fillRect(gShip.X, gShip.Y, gShip.Width, gShip.Height);
}

function drawBullet() {
    if (shot === true && gamePaused != true) {
        gCanvas.fillStyle = "green";
        gBullet.Y -= 15;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
    }

    if (gBullet.Y < -20 && gamePaused != true) {
        canFire = true;
        shot = false;
    }

    if (spaceDown === true && canFire === true && gamePaused != true) {
        gCanvas.fillStyle = "green";
        gBullet.X = gShip.X + gShip.Width / 2;
        gBullet.Y = gShip.Y - gBullet.Height;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
        canFire = false;
        shot = true;
        spaceDown = false;
    }
}