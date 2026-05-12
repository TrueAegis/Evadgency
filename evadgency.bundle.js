(function () {
    'use strict';

    // This module provides utility functions for randomness and probability.
    // Used for procedural generation of game elements.

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function rollChance(bias, difficulty = 1) {
        return Math.round(Math.random() * 100) + bias * difficulty;
    }

    // This module defines game objects, including the player, obstacles, collectables, and static objects.
    // It provides constructors and initialization functions for populating the game world.


    // Arrays to hold different types of game objects
    var obstacles = [],
        collectables = [],
        staticObjects = [];
    var laneSpeed;

    // Player object with sprite, position, and movement properties
    var img = new Image();
    img.src = 'sprites/spritesheet.png';
    var player = {
        sprite: img,
        sx: 0,
        sy: 128,
        srcW: 64,
        srcH: 64,
        x: 320,
        y: 576,
        width: 32,
        height: 32,
        spd: 32
    };

    // Constructor for creating game objects (obstacles, collectables, etc.)
    function gameObject(gameObjectArray, gameObjectType, img, sx, sy, srcW, srcH, x, y, spd, width, height) {

        var gameObjectImg = new Image();
        gameObjectImg.src = img;
        this.sprite = gameObjectImg;
        this.gameObjectType = gameObjectType;
        this.sx = sx;
        this.sy = sy;
        this.srcW = srcW;
        this.srcH = srcH;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.spd = spd;

        gameObjectArray.push(this);
    }

    // Initialize moving obstacles based on difficulty (spawn in lanes, random direction and speed)
    function initObstacles() {
        var laneSpawn = [96, 160, 192, 224, 451, 483, 515, 547, 288, 320, 352, 384];
        if (gameMaster.difficulty === 1) {
            laneSpeed = 1;
        } else {
            laneSpeed = gameMaster.difficulty - (gameMaster.difficulty - 1) + (gameMaster.difficulty / 5);
        }
        for (var ii = 0; ii < increaseSpawn(gameMaster.difficulty); ii++) {
            for (var i = 0; i < laneSpawn.length; i++) {

                if (rollChance(1) < 50) {
                    new gameObject(obstacles, "obstacleRight", "sprites/spritesheet.png", 64, 64 * getRandomInt(5, 8), 64, 64, Math.round(Math.random() * 608), laneSpawn[i], laneSpeed, 32, 32);
                } else {
                    new gameObject(obstacles, "obstacleLeft", "sprites/spritesheet.png", 64 * 3, 64 * getRandomInt(5, 8), 64, 64, Math.round(Math.random() * 608), laneSpawn[i], laneSpeed, 32, 32);
                }
            }
        }

        // Helper to increase obstacle spawn count with difficulty
        function increaseSpawn(input) {
            console.log("GameDifficulty: " + input);
            var result = input / 5;
            if (result < 1) {
                return 1;
            } else {
                return Math.floor(result);
            }
        }
        console.log(increaseSpawn(gameMaster.difficulty));
    }

    // Initialize static obstacles (desks, walls) at fixed positions with some randomness
    function initStaticObstacles() {
        var staticSpawn = [
            [32, 416], [128, 416], [256, 416], [320, 416], [416, 416], [512, 416],
            [0, 256], [160, 256], [288, 256], [448, 256], [576, 256],
            [64, 128], [128, 128], [256, 128], [384, 128], [512, 128]
        ];
        for (var i = 0; i < staticSpawn.length; i++) {
            var randomInt = getRandomInt(0, 4);
            var deskMap = [[4, 6], [4, 7], [4, 8], [6, 7], [6, 8]]; // location of desks on spritesheet.
            if (rollChance(5, gameMaster.difficulty) > 50) {
                new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[randomInt])[0], 64 * (deskMap[randomInt])[1], 64, 64, staticSpawn[i][0], staticSpawn[i][1], null, 32, 32);
                new gameObject(staticObjects, "staticObjects", "sprites/spritesheet.png", 64 * (deskMap[randomInt])[0] + 64, 64 * (deskMap[randomInt])[1], 64, 64, staticSpawn[i][0] + 32, staticSpawn[i][1], null, 32, 32);
            }
        }
        var wallPos = [
            [256, 32, 0, 0], [288, 32, 32, 0], [320, 32, 64, 0], [288, 32, 96, 0], [320, 32, 128, 0], [288, 32, 160, 0], [320, 32, 192, 0], [288, 32, 224, 0], [320, 32, 256, 0], [288, 32, 288, 0], [320, 32, 320, 0], [288, 32, 352, 0], [320, 32, 384, 0], [288, 32, 416, 0], [320, 32, 448, 0], [288, 32, 480, 0], [320, 32, 512, 0], [288, 32, 544, 0], [320, 32, 576, 0], [352, 32, 608, 0],
            [0, 32, 0, 32], [320, 64, 64, 32], [320, 64, 128, 32], [320, 64, 192, 32], [320, 64, 256, 32], [320, 64, 320, 32], [320, 64, 384, 32], [320, 64, 448, 32], [320, 64, 512, 32], [320, 64, 576, 32],
            [256, 0, 0, 64], [320, 0, 64, 64], [320, 0, 128, 64], [320, 0, 192, 64], [320, 0, 256, 64], [320, 0, 320, 64], [320, 0, 384, 64], [320, 0, 448, 64], [320, 0, 512, 64], [320, 0, 576, 64]
        ];
        for (i = 0; i < wallPos.length; i++) {
            new gameObject(staticObjects, "staticObject", 'sprites/SpriteSheet32x32.png', (wallPos[i])[0], (wallPos[i])[1], 32, 32, (wallPos[i])[2], (wallPos[i])[3], null, 32, 32); //Might have issue with srcX and srcY being reversed somehow
        }
        new gameObject(staticObjects, "staticObject", 'sprites/spritesheet.png', 64 * 7, 64, 64, 64, 608, 64, null, 32, 32); // patty
    }

    // Initialize collectables (coins) in specific lanes with low spawn chance
    function initCollectables() {
        var laneSpawn = [192, 320, 448];
        for (var i = 0; i < laneSpawn.length; i++) {
            if (rollChance(1) > 80) {
                new gameObject(collectables, "collectable", "sprites/spritesheet.png", 0, 0, 64, 64, Math.round(Math.random() * 576), laneSpawn[i], null, 32, 32);
            }
        }
    }

    // Advance to the next level: increase difficulty, reset objects, restart game loop
    // nextLevel receives its dependencies as parameters to avoid a circular import
    // with gameLoop.js. menuFunctions.js calls this and passes them in.
    function nextLevel(gameMaster, timer, updateUIElements, update, initObjects) {
        gameMaster.gameOn = true;
        gameMaster.difficulty += 1;
        gameMaster.victoryPoints = gameMaster.difficulty;
        updateUIElements();
        obstacles = [];
        collectables = [];
        staticObjects = [];
        timer();
        initObjects();
        requestAnimationFrame(update);
        document.getElementById("wrapper").style.display = "none";
        console.log(laneSpeed);
    }

    // This module handles animations for game objects.
    // It cycles through sprite frames for collectables and moves obstacles.


    var ticks = 0; //records ticks in the loop, resets if greater than ticksPerFrame
    var ticksPerFrame = 12; //controls animation speed

    // Animate game objects: cycle collectable sprites and move obstacles
    function animateGameObjects() {
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

        for (var key in obstacles) {
            obstacleMove(obstacles[key]);
        }
    }

    // Move obstacles horizontally based on their type (left or right)
    function obstacleMove(obstacle) {
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

    // Get the 2D rendering context from the game canvas
    let ctx = document.getElementById("gameWindow").getContext("2d");

    // Initialize all game objects (obstacles, static obstacles, collectables)
    function initObjects() {
        initObstacles();
        initStaticObstacles();
        initCollectables();
    }

    // Draw all game objects and check for collisions with each
    function drawGameObjects() {
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
    function drawEntity(entity) {
        ctx.save();
        ctx.drawImage(entity.sprite, entity.sx, entity.sy, entity.srcW, entity.srcH, entity.x, entity.y, entity.width, entity.height);
        ctx.restore();
    }

    // Handle canvas resizing on window resize
    window.addEventListener("resize", resizeCanvas, false);

    // Draw the level background using tiled patterns for carpet and textures
    function drawBG() {
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

    // This module manages the main game loop, state, input handling, collision detection, and win/lose logic.
    // It coordinates rendering, animation, and UI updates.


    var gameStart, timeSet;

    // Global game state object holding key variables like difficulty, score, time, lives, etc.
    var gameMaster = {
        difficulty: 1,
        score: 0,
        time: 500,
        lives: 3,
        coins: 0,
        gameOn: false,
        victoryPoints: 1,
    };

    var playerPosX, playerPosY;

    // Initialize game on window load: update UI, set up objects, start loop
    window.onload = function () {
      updateUIElements();
      initialize();
      console.log("Game loaded!");
    };

    // Start the countdown timer (decrements time every second)
    function timer() {
      timeSet = setInterval(countDown, 1000);

      function countDown() {
        gameMaster.time--;
        //console.log(gameMaster.time);
        updateUIElements();
      }
    }

    // Initialize game objects and start the update loop
    function initialize() {
      initObjects();
      update();
    }

    // Main game update loop: clears canvas, draws elements, animates, checks conditions
    function update() {
        gameStart = requestAnimationFrame(update);
        ctx.clearRect(0, 0, gameWindow.width, gameWindow.height); //Clears sprites every frame
        drawBG();
        drawGameObjects();
        drawEntity(player);
        animateGameObjects();
        checkWin();
        checkLose();
    }

    // Event listener for keyboard input to control player movement and actions
    document.addEventListener("keydown", playerController, false);

    function playerController(e) {
        playerPosX = player.x;
        playerPosY = player.y;
        // Move up (arrow up or W), check bounds and game state
        if ((e.keyCode == 38 || e.keyCode == 87) && player.y > 16 && gameMaster.gameOn == true) {
            player.y = player.y - player.spd;
            player.sx = 0; // up
        }
        // Move down (arrow down or S)
        if ((e.keyCode == 40 || e.keyCode == 83) && player.y < 608 && gameMaster.gameOn == true) {
            player.y = player.y + player.spd;
            player.sx = 128; // down
        }
        // Move left (arrow left or A)
        if ((e.keyCode == 37 || e.keyCode == 65) && player.x > 16 && gameMaster.gameOn == true) {
            player.x = player.x - player.spd;
            player.sx = 256; // left
        }
        // Move right (arrow right or D)
        if ((e.keyCode == 39 || e.keyCode == 68) && player.x < 608 && gameMaster.gameOn == true) {
            player.x = player.x + player.spd;
            player.sx = 320; // right
        }
        // Press P to cycle player avatar sprites
        if (e.keyCode == 80) { //Press P to select a different avatar
            player.sy += 64;
            if (player.sy > 64 * 4) {
                player.sy = 64;
            }
        }
        // Press Esc to pause/unpause game
        if (e.keyCode == 27) { //Press Esc to pause game
            if (gameMaster.gameOn == true) {
                gameMaster.gameOn = false;
                isPause();
                document.getElementById("resume").className = "button";
                document.getElementById("start").className = "hidden";
                document.getElementById("next").className = "hidden";
                document.getElementById("wrapper").style.display = "inline-flex";
                document.getElementById("resume").focus();
            } else if (gameMaster.gameOn == false) {
                document.getElementById("wrapper").style.display = "none";
                gameMaster.gameOn = true;
                timer();
                gameStart = requestAnimationFrame(update);

            }    }
        console.log(player.x + " - " + player.y);
    }

    // Collision detection function: checks if player overlaps with an object and handles consequences
    function collideWith(object) {

        if (player.x <= object.x + object.width / 2 && player.x >= object.x - object.width / 2 && player.y <= object.y + object.height / 2 && player.y >= object.y - object.height / 2) {
            if (object.gameObjectType.includes("obstacle")) {
                // Hit obstacle: lose a life, reset player position briefly
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
                // Collected coin: remove from array, increase score and coins
                collectables.splice(collectables.indexOf(object), 1);
                gameMaster.coins += 1;
                gameMaster.score += 1;
                console.log("Player score is: " + gameMaster.score + "\nCoins collected: " + gameMaster.coins);
                document.getElementById('score').innerHTML = gameMaster.score;
                document.getElementById('coins').innerHTML = gameMaster.coins;

            } else if (object.gameObjectType.includes("staticObject")) {
                // Hit static object: revert player position (wall-like)
                player.x = playerPosX;
                player.y = playerPosY;
            }
        }
    }

    // Check win conditions: player reaches top row at specific x positions to score victory points
    function checkWin() {
      var winPos = [32, 96, 160, 224, 288, 352, 416, 480, 544];

      // Checks for win conditions
      if (player.y == 64 && winPos.includes(player.x)) {
        new gameObject(staticObjects, "staticObject", 'sprites/spritesheet.png', player.sx, player.sy, player.srcW, player.srcH, player.x, player.y, null, player.width, player.height);
        player.x = 320;
        player.y = 576;
        gameMaster.score += 100;
        gameMaster.victoryPoints--;
      } else if (gameMaster.victoryPoints == 0) {
        // All victory points collected: pause and show next level menu
        isPause();
        document.getElementById("next").className = "button";
        document.getElementById("resume").className = "hidden";
        document.getElementById("start").className = "hidden";
        document.getElementById("wrapper").style.display = "inline-flex";
        document.getElementById("next").focus();
      }
    }

    // Check lose conditions: no lives or time up triggers game over
    function checkLose() {
        if (gameMaster.lives == 0 || gameMaster.time <= 0) {
            isPause();
            document.getElementById('time').innerHTML = "Game Over";
            setTimeout(function () {
                //Game Over Screen 
            }, 5000);
        }
    }

    // Pause the game by stopping animation and timer
    function isPause() {
      cancelAnimationFrame(gameStart);
      clearInterval(timeSet);
    }

    // Update UI elements with current game state values
    function updateUIElements() {
      document.getElementById('lives').innerHTML = gameMaster.lives;
      document.getElementById('time').innerHTML = gameMaster.time;
      document.getElementById('score').innerHTML = gameMaster.score;
      document.getElementById('coins').innerHTML = gameMaster.coins;
      document.getElementById('difficulty').innerHTML = gameMaster.difficulty;
    }

    // This module handles menu button interactions and game state changes.
    // It sets up event listeners for menu buttons and defines functions to start, resume, or advance the game.


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
    }
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
    }
    // Note: Pause function has been moved to gameLoop.js as isPause() method

})();
