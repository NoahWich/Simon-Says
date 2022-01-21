var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

//Start the Game
$(document).keydown(function() {
    if (gameStart !== true) {
    gameStart = true;
    newSequence();
    var level = 0;
    $("h1#level-title").html("Level: " + level);
    }
});

//Generates a New Sequence for the next Level
function newSequence() {
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    var selectedButton = $("#" + randomChosenColor);
    $(selectedButton).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("h1#level-title").html("Level: " + level);
    level++;
    userClickedPattern = [];
}

//Sound for Sequence Generation / Button Clicks 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animates Button when pressed by user
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Checks User Answer to Game Pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                newSequence();
            }, 1000);
        };
    } else {
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        });
        $("h1").html("Game Over, Press any Key to Restart.")
        startOver();
    } 
            
}

//Restart the Game
function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}

$(".btn").click(function() {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

