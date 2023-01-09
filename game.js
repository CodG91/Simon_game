let gamePattern = [];

let buttonCoulours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];

var started = false;

let level = 0;

$(document).keypress(function(){
    if(started === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function Handler() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("Handler was called.")
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success!")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("Fail!");
        startOver();
    }
}

function nextRandomNumber(){
    let randomNumber;
    randomNumber = Math.floor(Math.random()*4);
    console.log("Random number was calculated.")
    return randomNumber;
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function nextSequence(){
    userClickedPattern = [];

    level++; 

    $("h1").text("Level " + level);
    
    let randomChosenColour = buttonCoulours[nextRandomNumber()]; 

    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log("Flash was executed.")

    playSound(randomChosenColour);
    
}

function playSound(name) {
    let playSound = new Audio("sounds/" + name + ".mp3");
    
    playSound.play();

    console.log("Sound was played")
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}







