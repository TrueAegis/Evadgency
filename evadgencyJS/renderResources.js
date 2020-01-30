import { gameMaster } from "./main.js";
import { GameObject } from "./gameObject.js";
import { initCollectables, collectables } from "./collectable.js";
import { initStaticObstacles, staticObjects } from "./staticObstacle.js";
import { getRandomInt } from "./utils.js";
import * as gameLoop from "./gameLoop.js";

export let ctx = document.getElementById("gameWindow").getContext("2d");

export let obstacles = [];

export function initObjects() {
    initObstacles();
    initStaticObstacles();
    initCollectables();
}

export function drawGameObjects() {
    for (let key in collectables) {
        drawEntity(collectables[key]);
        gameLoop.collideWith(collectables[key]);
    }
    for (let key in obstacles) {
        drawEntity(obstacles[key]);
        gameLoop.obstacleMove(obstacles[key]);
        gameLoop.collideWith(obstacles[key]);
    }
    for (let key in staticObjects) {
        drawEntity(staticObjects[key]);
        gameLoop.collideWith(staticObjects[key]);
    }
}
//Draws game object sprites
export function drawEntity(entity) {
    ctx.save();
    ctx.drawImage(entity.sprite, entity.sx, entity.sy, entity.srcW, entity.srcH, entity.x, entity.y, entity.width, entity.height);
    ctx.restore();

}

//Draw level
window.addEventListener("resize", resizeCanvas, false);

export function drawBG() {
    //Tiling
    let tile = new Image();
    tile.src = 'sprites/DarkTextureBlueCarpet.png';
    let tilePattern = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = tilePattern;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 410, 570, 96);
    //Carpet
    let carpet = new Image();
    carpet.src = 'sprites/Green2.png';
    let carpetPattern = ctx.createPattern(carpet, 'repeat');
    ctx.fillStyle = carpetPattern;
    ctx.fillRect(0, 580, window.innerWidth, 64);
    ctx.fillRect(0, 100, window.innerWidth, 64);
    ctx.fillRect(0, 256, window.innerWidth, 64);
    ctx.fillRect(0, 384, window.innerWidth, 64);
    ctx.fillRect(0, 0, window.innerWidth, 100);
}

function resizeCanvas() {
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
}

//gameObject initializations on game start
function initObstacles() { //if statements to initialize same code for different rows to create full layout
    let laneSpawn1 = [96, 160, 192, 224, 451, 483, 515, 547, 288, 320, 352, 384];
    for (var i = 0; i < laneSpawn1.length; i++) {
        let temp = Math.round(Math.random() * 100) + 1;
        let computerResponse = getRandomInt(5, 8);
        let obstacle;
        if (temp < 50) {
            obstacle = new GameObject(64, 64 * computerResponse, 64, 64, Math.round(Math.random() * 576), laneSpawn1[i], Math.floor(Math.random() * 3) + 1, 32, 32);
        } else {
            obstacle = new GameObject(64 * 3, 64 * computerResponse, 64, 64, Math.round(Math.random() * 576), laneSpawn1[i], Math.floor(Math.random() * 3) + 1, 32, 32);
        }
        obstacles.push(obstacle);
    }
}



export function updateUIElements() {
    document.getElementById('lives').innerHTML = gameMaster.lives;
    document.getElementById('time').innerHTML = gameMaster.time;
    document.getElementById('score').innerHTML = gameMaster.score;
    document.getElementById('coins').innerHTML = gameMaster.coins;
    document.getElementById('difficulty').innerHTML = gameMaster.difficulty;
}

