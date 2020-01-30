import { getRandomInt } from "./utils.js";
import { GameObject } from "./gameObject.js";

export let staticObjects = [];

export function initStaticObstacles() { //if statements to initialize same code for different rows to create full layout
    let staticSpawn = [
        [32, 416], [128, 416], [256, 416], [320, 416], [416, 416], [512, 416],
        [0, 256], [160, 256], [288, 256], [448, 256], [576, 256],
        [64, 128], [128, 128], [256, 128], [384, 128], [512, 128]
    ];
    for (var i = 0; i < staticSpawn.length; i++) {
        let deskMap = [[4, 6], [4, 7], [4, 8], [6, 7], [6, 8]];
        let temp = getRandomInt(0, 4);
        let desk = new GameObject(64 * (deskMap[temp])[0], 64 * (deskMap[temp])[1], 128, 64, staticSpawn[i][0], staticSpawn[i][1], null, 64, 32);
        staticObjects.push(desk);
    }
    let wallPos = [
        [256, 32, 0, 0], [288, 32, 32, 0], [320, 32, 64, 0], [288, 32, 96, 0], [320, 32, 128, 0], [288, 32, 160, 0], [320, 32, 192, 0], [288, 32, 224, 0], [320, 32, 256, 0], [288, 32, 288, 0], [320, 32, 320, 0], [288, 32, 352, 0], [320, 32, 384, 0], [288, 32, 416, 0], [320, 32, 448, 0], [288, 32, 480, 0], [320, 32, 512, 0], [288, 32, 544, 0], [320, 32, 576, 0], [352, 32, 608, 0],
        [0, 32, 0, 32], [320, 64, 64, 32], [320, 64, 128, 32], [320, 64, 192, 32], [320, 64, 256, 32], [320, 64, 320, 32], [320, 64, 384, 32], [320, 64, 448, 32], [320, 64, 512, 32], [320, 64, 576, 32],
        [256, 0, 0, 64], [320, 0, 64, 64], [320, 0, 128, 64], [320, 0, 192, 64], [320, 0, 256, 64], [320, 0, 320, 64], [320, 0, 384, 64], [320, 0, 448, 64], [320, 0, 512, 64], [320, 0, 576, 64]
    ];
    for (i = 0; i < wallPos.length; i++) {
        let wall = new GameObject((wallPos[i])[0], (wallPos[i])[1], 32, 32, (wallPos[i])[2], (wallPos[i])[3], null, 32, 32, '../sprites/SpriteSheet32x32.png'); //Might have issue with srcX and srcY being reversed somehow
        staticObjects.push(wall);
    }
    new GameObject(64 * 7, 64, 64, 64, 608, 64, null, 32, 32);
}