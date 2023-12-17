let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
var level = 0;
// $(document).on("keydown",nextSequence);
$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animateOnClick(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level "+level);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animateOnClick(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
}

$(document).on("keydown",function(){
    if(level === 0){
        nextSequence();
    }
});