// Global variables.
var gCanvas;
var gCounter;
var gInvaders

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

    canGame.onclick = canGame_onclick;
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
    gShip.X = 135;
    gShip.Y = 440;
    gShip.Width = 100;
    gShip.Height = 20;

    gBullet = new Object();
    gBullet.Width = 5;
    gBullet.Height = 20;
}

function gameLoop() {

    gameUpdate();
    gameDraw();
}

window.addEventListener('keydown', function (event) {
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
    

    if (rightDown === true) {
        gShip.X += 20;
        rightDown = false;
    }
    if (leftDown === true) {
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

    if (shot === true) {
        gCanvas.fillStyle = "green";
        gBullet.Y -= 15;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
    }

    if (gBullet.Y < -20) {
        canFire = true;
        shot = false;
    }

    if (spaceDown === true && canFire === true) {
        gCanvas.fillStyle = "green";
        gBullet.X = gShip.X + gShip.Width / 2;
        gBullet.Y = gShip.Y - gBullet.Height;
        gCanvas.fillRect(gBullet.X, gBullet.Y, gBullet.Width, gBullet.Height);
        canFire = false;
        shot = true;
        spaceDown = false;
    }
}

function checkAlive() {
    return true;
}