

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // multiplied.
    this.x += this.speed * dt;

    // randomizes enemis when they leave the screen ( currently set at 808 width)
    if (this.x > 808) {
        this.x = -80;
        this.speed = 100 + Math.floor(Math.random() * 500);
    };

    // whether enemies collide with our player or not.
    if (player.x < this.x + 75 &&
        player.x + 75 > this.x &&
        player.y < this.y + 55 &&
        55 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-princess-girl.png';
};

Player.prototype.update = function (dt) {

};

// Rendering the img
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Utilizing the arrow keys provided to us
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 101;
    };
    if (keyPress == 'right' && this.x < 700) {
        this.x += 101;
    };
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 81;
    };
    if (keyPress == 'down' && this.y < 400) {
        this.y += 81;
    };
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 400;
            this.y = 400;
        }, 200);
    };
};


// Player Starting point.
let player = new Player(400, 400);

// 6 Enemies
let allEnemies = [];
let enemyLocation = [60, 60, 140, 140, 225, 225];
// Enemy movement
enemyLocation.forEach(function (locationEnmy) {
    enemy = new Enemy(0, locationEnmy, 200);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
