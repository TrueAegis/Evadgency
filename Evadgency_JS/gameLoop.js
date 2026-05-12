// This module manages the main game loop, state, input handling, collision detection, and win/lose logic.
// It coordinates rendering, animation, and UI updates.

import { gameObject, collectables, staticObjects, player } from "./gameObjects.js";
import { animateGameObjects } from "./animator.js";
import * as render from "./renderResources.js";

export var gameStart, timeSet;

// Global game state object holding key variables like difficulty, score, time, lives, etc.
export var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 500,
    lives: 3,
    coins: 0,
    gameOn: false,
    victoryPoints: 1,
}

var playerPosX, playerPosY;

// Initialize game on window load: update UI, set up objects, start loop
window.onload = function () {
  updateUIElements();
  initialize();
  console.log("Game loaded!");
}

// Start the countdown timer (decrements time every second)
export function timer() {
  timeSet = setInterval(countDown, 1000);

  function countDown() {
    gameMaster.time--;
    //console.log(gameMaster.time);
    updateUIElements();
  }
}

// Initialize game objects and start the update loop
function initialize() {
  render.initObjects();
  update();
}

// Main game update loop: clears canvas, draws elements, animates, checks conditions
export function update() {
    gameStart = requestAnimationFrame(update);
    render.ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites every frame
    render.drawBG();
    render.drawGameObjects();
    render.drawEntity(player);
    animateGameObjects();
    checkWin();
    checkLose();
}

// Event listener for keyboard input to control player movement and actions
document.addEventListener("keydown", playerController, false);

function playerController(e) {
    playerPosX = player.x;
    playerPosY = player.y;
    // Move up (arrow up or W), check bounds and game state
    if ((e.keyCode == 38 || e.keyCode == 87) && player.y > 16 && gameMaster.gameOn == true) {
        player.y = player.y - player.spd;
        player.sx = 0; // up
    }
    // Move down (arrow down or S)
    if ((e.keyCode == 40 || e.keyCode == 83) && player.y < 608 && gameMaster.gameOn == true) {
        player.y = player.y + player.spd;
        player.sx = 128; // down
    }
    // Move left (arrow left or A)
    if ((e.keyCode == 37 || e.keyCode == 65) && player.x > 16 && gameMaster.gameOn == true) {
        player.x = player.x - player.spd;
        player.sx = 256; // left
    }
    // Move right (arrow right or D)
    if ((e.keyCode == 39 || e.keyCode == 68) && player.x < 608 && gameMaster.gameOn == true) {
        player.x = player.x + player.spd;
        player.sx = 320; // right
    }
    // Press P to cycle player avatar sprites
    if (e.keyCode == 80) { //Press P to select a different avatar
        player.sy += 64;
        if (player.sy > 64 * 4) {
            player.sy = 64;
        }
    }
    // Press Esc to pause/unpause game
    if (e.keyCode == 27) { //Press Esc to pause game
        if (gameMaster.gameOn == true) {
            gameMaster.gameOn = false;
            isPause();
            document.getElementById("resume").className = "button";
            document.getElementById("start").className = "hidden";
            document.getElementById("next").className = "hidden";
            document.getElementById("wrapper").style.display = "inline-flex";
            document.getElementById("resume").focus();
        } else if (gameMaster.gameOn == false) {
            document.getElementById("wrapper").style.display = "none";
            gameMaster.gameOn = true;
            timer();
            gameStart = requestAnimationFrame(update);

        };
    }
    console.log(player.x + " - " + player.y);
}

// Collision detection function: checks if player overlaps with an object and handles consequences
export function collideWith(object) {

    if (player.x <= object.x + object.width / 2 && player.x >= object.x - object.width / 2 && player.y <= object.y + object.height / 2 && player.y >= object.y - object.height / 2) {
        if (object.gameObjectType.includes("obstacle")) {
            // Hit obstacle: lose a life, reset player position briefly
            gameMaster.lives -= 1;
            player.sx = 64 * 4;
            player.sy = 64 * 5;
            render.drawEntity(player);
            if (gameMaster.lives != 0) {
                player.x = 320;
                player.y = 576;
                player.sx = 0;
                player.sy = 128;
                render.drawEntity(player);
            }
            console.log(gameMaster.lives);
            document.getElementById('lives').innerHTML = gameMaster.lives;

        } else if (object.gameObjectType.includes("collectable")) {
            // Collected coin: remove from array, increase score and coins
            collectables.splice(collectables.indexOf(object), 1);
            gameMaster.coins += 1;
            gameMaster.score += 1;
            console.log("Player score is: " + gameMaster.score + "\nCoins collected: " + gameMaster.coins);
            document.getElementById('score').innerHTML = gameMaster.score
            document.getElementById('coins').innerHTML = gameMaster.coins

        } else if (object.gameObjectType.includes("staticObject")) {
            // Hit static object: revert player position (wall-like)
            player.x = playerPosX;
            player.y = playerPosY;
        }
    }
}

// Check win conditions: player reaches top row at specific x positions to score victory points
function checkWin() {
  var winPos = [32, 96, 160, 224, 288, 352, 416, 480, 544];

  // Checks for win conditions
  if (player.y == 64 && winPos.includes(player.x)) {
    new gameObject(staticObjects, "staticObject", 'sprites/SpriteSheet.png', player.sx, player.sy, player.srcW, player.srcH, player.x, player.y, null, player.width, player.height);
    player.x = 320;
    player.y = 576;
    gameMaster.score += 100;
    gameMaster.victoryPoints--;
  } else if (gameMaster.victoryPoints == 0) {
    // All victory points collected: pause and show next level menu
    isPause();
    document.getElementById("next").className = "button";
    document.getElementById("resume").className = "hidden";
    document.getElementById("start").className = "hidden";
    document.getElementById("wrapper").style.display = "inline-flex";
    document.getElementById("next").focus();
  }
}

// Check lose conditions: no lives or time up triggers game over
function checkLose() {
    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        isPause();
        document.getElementById('time').innerHTML = "Game Over";
        setTimeout(function () {
            //Game Over Screen 
        }, 5000);
    }
}

// Pause the game by stopping animation and timer
function isPause() {
  cancelAnimationFrame(gameStart);
  clearInterval(timeSet);
}

// Update UI elements with current game state values
export function updateUIElements() {
  document.getElementById('lives').innerHTML = gameMaster.lives;
  document.getElementById('time').innerHTML = gameMaster.time;
  document.getElementById('score').innerHTML = gameMaster.score;
  document.getElementById('coins').innerHTML = gameMaster.coins;
  document.getElementById('difficulty').innerHTML = gameMaster.difficulty;
}