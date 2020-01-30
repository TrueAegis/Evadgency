//import gameMaster
import { GameObject } from "./gameObject.js";

export let player = new GameObject(0,128,64,64,320,576,32,32,32);

document.addEventListener("keydown", playerController, false);

export function playerController(e) {
    castRay();
    console.log(castRay());
    if (e.keyCode == 38 && player.y > 16 && gameMaster.gameOn == true) {
        player.y = player.y - player.spd;
        player.sx = 0; // up
    } else if (e.keyCode == 40 && player.y < 608 && gameMaster.gameOn == true) {
        player.y = player.y + player.spd;
        player.sx = 128; // down
    } else if (e.keyCode == 37 && player.x > 16 && gameMaster.gameOn == true) {
        player.x = player.x - player.spd;
        player.sx = 256; // left
    } else if (e.keyCode == 39 && player.x < 608 && gameMaster.gameOn == true) {
        player.x = player.x + player.spd;
        player.sx = 320; // right
    }

    if (e.keyCode == 80) { //Press P to select a different avatar
        player.sy += 64;
        if (player.sy > 64 * 4) {
            player.sy = 64;
        }
    }
    if (e.keyCode == 27) { //Press Esc to pause game
        if (gameMaster.gameOn == true) {
            gameMaster.gameOn = false;
            isPause();
            document.getElementById("resume").className = "button";
            document.getElementById("start").className = "hidden";
            document.getElementById("next").className = "hidden";
            document.getElementById("wrapper").style.display = "flex";
        } else if (gameMaster.gameOn == false) {
            document.getElementById("wrapper").style.display = "none";
            gameMaster.gameOn = true;
            timer();
            gameStart = requestAnimationFrame(update);

        };
    }
    console.log(player.x + " - " + player.y);
}

export function castRay() {
    // rayCast right,left,down,up
    var rayCast = [player.x + player.spd, player.x - player.spd, player.y + player.spd, player.y - player.spd];
    var temp;
    return true;
    for (i = 0; i < staticObjects.length; i++) {
        if (rayCast[3] == staticObjects[i].y && player.x == staticObjects[i].x) {
            temp = "up";
        } else {
            temp = "";
        }
    }
}