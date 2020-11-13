var buttonColors = ["red", "blue", "green", "yellow"]; // Array of color names.
var gamePattern = [];                                  // Game pattern array
var userClickedPattern = [];                           // User clicked array.

var level = 0; // Level object.

var levelTitle = $("#level-title"); // Level title object.

$(document).keydown(function(e) {
    // Check if game is in starting state.
    if(levelTitle.text().includes("Press A ")) {
        // Begin game when "A" key is pressed.
        if((e.key).toLowerCase() === "a") {
            nextSequence();
        }
    } else if (gamePattern.length === 0) { // Start game using any key when game over. 
        nextSequence();
    }
});

$(".btn").click(function() {
    // Get the color of the clicked button.
    var userChosenColor = $(this).attr("id");

    // Add that color to the user's pattern.
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Only check for correct sequence when a game has started.
    if(gamePattern.length > 0) {
        checkAnswer(userClickedPattern.length - 1);
    }
});

function nextSequence() {
    // Increment level.
    level++;

    // Set level title in h1.
    levelTitle.text("Level " + level);

    // Generate random index.
    var randomNumber = Math.floor(Math.random() * 4);

    // Select random color from array and add to game pattern.
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    // Make button corresponding to random color flash.
    var randomButton = $("#" + randomColor);
    randomButton.fadeOut(100).fadeIn(100);

    // Play corresponding color audio.
    playSound(randomColor);
}

// Play sound for the color passed as a parameter.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Toggle pressed class after a delay to simulate pressing animation.
function animatePress(currentColor) {
    $("#" + currentColor).toggleClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).toggleClass("pressed");
    }, 100);
}

// Check if the user sequence matches the game sequence.
function checkAnswer(currentLevel) {
    // Check if current color selected matches the color of the game pattern.
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(currentLevel === gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);

            userClickedPattern = [];
        }
    } else {
        // Play incorrect answer sound.
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        // Add and remove game-over class to body to make it flash red.
        $("body").toggleClass("game-over");

        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);

        // Change level text to indicate game over.
        levelTitle.text("Game Over, Press Any Key to Restart");

        // Reset game.
        startOver();
    } 

    // Reset level counter, game pattern, and user pattern.
    function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}