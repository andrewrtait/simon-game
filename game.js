var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];



var started = false;
var level = 0;


$(document).on("keydown", function() {
  if (!started) {
       
        $("#level-title").text("Level " + level);     
        nextSequence();
        started = true;
    };
});






function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut('fast').fadeIn('fast');
    playSound(randomChosenColor);
}




$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
    }
    
    
);



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
        setTimeout (function() {
        nextSequence()
    }, 1000);
    userClickedPattern = [];}
}


else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");}, 200);
        $("#level-title").text("GAME OVER, MAN!  Press any key to restart.");
        startOver();


        
}
    }

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    
        }







function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var fadeOut = $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        fadeOut.removeClass("pressed");}, 100);
    }