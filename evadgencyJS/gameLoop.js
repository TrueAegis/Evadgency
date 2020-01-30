import { gameMaster } from "./main.js";
import { player } from "./player.js";
import { collectables } from "./collectable.js";

export function animateGameObjects() {
    gameMaster.ticks += 1;
    if (gameMaster.ticks > gameMaster.ticksPerFrame) {
        gameMaster.ticks = 0;

        for (var key in collectables) {
            collectables[key].sx += 64;
            if (collectables[key].sx > 64 * 3) {
                collectables[key].sx = 0;
            }
        }
    }
}

export function obstacleMove(obstacle) {
    if (obstacle.gameObjectType == "obstacleRight") {
        if (obstacle.x < gameWindow.width + 100) {
            obstacle.x += obstacle.spd;
        } else {
            obstacle.x = -100;
        }
    } else if (obstacle.gameObjectType == "obstacleLeft") {
        if (obstacle.x > -100) {
            obstacle.x -= obstacle.spd;
        } else {
            obstacle.x = gameWindow.width + 100;
        }
    }
}

export function collideWith(object) {
    if (player.x <= object.x + object.width / 2 && player.x >= object.x - object.width / 2 && player.y <= object.y + object.height / 2 && player.y >= object.y - object.height / 2) {
        if (object.gameObjectType.includes("obstacle")) {
            gameMaster.lives -= 1;
            player.sx = 64 * 4;
            player.sy = 64 * 5;
            drawEntity(player);
            if (gameMaster.lives != 0) {
                player.x = 320;
                player.y = 576;
                player.sx = 0;
                player.sy = 128;
                drawEntity(player);
            }
            console.log(gameMaster.lives);
            document.getElementById('lives').innerHTML = gameMaster.lives;

        } else if (object.gameObjectType.includes("collectable")) {
            collectables.splice(collectables.indexOf(object), 1);
            gameMaster.coins += 1;
            gameMaster.score += 1;
            console.log("Player score is: " + gameMaster.score + "\nCoins collected: " + gameMaster.coins);
            document.getElementById('score').innerHTML = gameMaster.score
            document.getElementById('coins').innerHTML = gameMaster.coins

        } else if (object.gameObjectType.includes("staticObject")) {
            console.log("Clipping Error! Ray Cast in PlayerController failed.");
        }
    }
}

// win/lose states
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