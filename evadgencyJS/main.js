import * as render from "./renderResources.js";
import * as gameLoop from "./gameLoop.js";
import { player } from "./player.js";
import { initCollectables } from "./collectable.js";
import { initStaticObstacles } from "./staticObstacle.js";
import { initObstacles } from "./obstacle.js";
import { animateGameObjects } from "./animator.js";

var gameStart,
    timeSet


window.onload = function () {
    render.updateUIElements();
    initialize();
    console.log("Game loaded!");
}

//GameMaster Object - Holds important game values
export var gameMaster = {
    difficulty: 1,
    score: 0,
    time: 500,
    lives: 3,
    coins: 0,
    gameOn: false,
    victoryPoints: 1,
    ticks: 0, //records ticks in the loop, resets if greater than ticksPerFrame
    ticksPerFrame: 12, //controls animation speed
}

//initialize after pages load.
function initialize() {
    initObstacles();
    initStaticObstacles();
    initCollectables();
    update();
}

// Game Logic Updates
function update() {
    gameStart = requestAnimationFrame(update);
    render.ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites every frame
    render.drawBG();
    render.drawEntity(player);
    render.drawGameObjects();
    animateGameObjects();
    gameLoop.checkWin();
    gameLoop.checkLose();
}

export function checkWin() {
    var winPos = [32, 96, 160, 224, 288, 352, 416, 480, 544];

    // Checks for win conditions
    if (player.y == 64 && winPos.includes(player.x)) {
        new gameObject(staticObjects, "staticObject", 'sprites/spritesheet.png', player.sx, player.sy, player.srcW, player.srcH, player.x, player.y, null, player.width, player.height);
        player.x = 320;
        player.y = 576;
        gameMaster.score += 100;
        gameMaster.victoryPoints--;
    } else if (gameMaster.victoryPoints == 0) {
        isPause();
        document.getElementById("next").className = "button";
        document.getElementById("resume").className = "hidden";
        document.getElementById("start").className = "hidden";
        document.getElementById("wrapper").style.display = "flex";
    }
}

export function checkLose() {
    if (gameMaster.lives == 0 || gameMaster.time <= 0) {
        isPause();
        document.getElementById('time').innerHTML = "Game Over";
        setTimeout(function () {
            //Game Over Screen 
        }, 5000);
    }
}
//pause game
export function isPause() {
    cancelAnimationFrame(gameStart);
    clearInterval(timeSet);
}