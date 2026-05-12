// This module handles menu button interactions and game state changes.
// It sets up event listeners for menu buttons and defines functions to start, resume, or advance the game.

import { gameMaster, timer, update, updateUIElements } from "./gameLoop.js";
import { nextLevel } from "./gameObjects.js";
import { initObjects } from "./renderResources.js";

document.getElementById("start").focus();

// Set up event listeners for menu buttons
document.getElementById("start").addEventListener("click", start);
document.getElementById("next").addEventListener("click", function() {
    nextLevel(gameMaster, timer, updateUIElements, update, initObjects);
});
document.getElementById("how").addEventListener("click", howto);
document.getElementById("resume").addEventListener("click", resume);

// Function to start a new game: sets game state to active, starts timer, hides menu
function start() {
    gameMaster.gameOn = true;
    timer();
    document.getElementById("wrapper").style.display = "none";
};

// Function to resume a paused game: hides menu, activates game, restarts timer and animation loop
function resume() {
    document.getElementById("wrapper").style.display = "none";
    gameMaster.gameOn = true;
    timer();
    requestAnimationFrame(update);
}

// Function to display game instructions in an alert box
function howto() {
    alert("Use arrow keys to move character.\nAvoid moving and stationary obstacles.\nCollect coins as you progress.\nReach the end of the level before your time runs out!");
};

// Note: Pause function has been moved to gameLoop.js as isPause() method
