
// This module handles rendering and canvas operations.
// It provides functions to initialize objects, draw entities, and render the background.

import { initObstacles, initStaticObstacles, initCollectables, collectables, staticObjects, obstacles } from "./gameObjects.js";
import { collideWith } from "./gameLoop.js";

// Get the 2D rendering context from the game canvas
export let ctx = document.getElementById("gameWindow").getContext("2d");

// Initialize all game objects (obstacles, static obstacles, collectables)
export function initObjects() {
    initObstacles();
    initStaticObstacles();
    initCollectables();
}

// Draw all game objects and check for collisions with each
export function drawGameObjects() {
    for (var key in collectables) {
        drawEntity(collectables[key]);
        collideWith(collectables[key]); // should move this
    }
    for (var key in obstacles) {
        drawEntity(obstacles[key]);
        collideWith(obstacles[key]); // should move this
    }
    for (var key in staticObjects) {
        drawEntity(staticObjects[key]);
        collideWith(staticObjects[key]); // should move this
    }
}

// Draw a single entity (sprite) on the canvas using its properties
export function drawEntity(entity) {
    ctx.save();
    ctx.drawImage(entity.sprite, entity.sx, entity.sy, entity.srcW, entity.srcH, entity.x, entity.y, entity.width, entity.height);
    ctx.restore();
}

// Handle canvas resizing on window resize
window.addEventListener("resize", resizeCanvas, false);

// Draw the level background using tiled patterns for carpet and textures
export function drawBG() {
    //Tiling
    let tile = new Image();
    tile.src = 'sprites/DarkTextureBlueCarpet.png';
    var tilePattern = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = tilePattern;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 410, 570, 96);
    //Carpet
    let carpet = new Image();
    carpet.src = 'sprites/Green2.png';
    var carpetPattern = ctx.createPattern(carpet, 'repeat');
    ctx.fillStyle = carpetPattern;
    ctx.fillRect(0, 580, window.innerWidth, 64);
    ctx.fillRect(0, 100, window.innerWidth, 64);
    ctx.fillRect(0, 256, window.innerWidth, 64);
    ctx.fillRect(0, 384, window.innerWidth, 64);
    ctx.fillRect(0, 0, window.innerWidth, 100);
}

// Resize the canvas to match window dimensions
function resizeCanvas() {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
}

