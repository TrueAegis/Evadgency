import { GameObject } from "./gameObject.js";
import { getRandomInt } from "./utils.js";

export let obstacles = [];

//gameObject initializations on game start
export function initObstacles() { //if statements to initialize same code for different rows to create full layout
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