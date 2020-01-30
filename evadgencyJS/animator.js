import { collectables } from "./collectable.js";

let ticks = 0;
let ticksPerFrame = 12;
export function animateGameObjects() {
    ticks += 1;
    if (ticks > ticksPerFrame) {
        ticks = 0;

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