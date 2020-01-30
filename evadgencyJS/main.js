import * as render from "./renderResources.js";
import * as gameLoop from "./gameLoop.js";
import { player } from "./player.js";

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
    render.initObjects();
    update();
}

// Game Logic Updates
function update() {
    gameStart = requestAnimationFrame(update);
    render.ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites every frame
    render.drawBG();
    render.drawEntity(player);
    render.drawGameObjects();
    gameLoop.animateGameObjects();
    gameLoop.checkWin();
    gameLoop.checkLose();
}