import { gameMaster } from "./main.js";
import { player } from "./player.js";
import { collectables } from "./collectable.js";

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
