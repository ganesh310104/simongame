let buttonColors =["green", "red", "yellow", "blue"];

let gameSequence = [];
let clickSequence = [];

var start = false;
var level = 0;

$(document).on("keydown", function () {
    if (!start) {
        $("h1").text("level "+level);
        start = true;
        nextSequence();
    }
})

$(".btn").on("click",function(){
    var colorClicked = $(this).attr("id");
    clickSequence.push(colorClicked);

    
    animate(colorClicked);

    // clickSequence.push(colorClicked);
    if(checkSequence(clickSequence.length-1)){
        playSound(colorClicked);
    }
});

function checkSequence(clickedColorIndex){
    if (gameSequence[clickedColorIndex] === clickSequence[clickedColorIndex]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (clickSequence.length === gameSequence.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
        return 1;
  
      } else {
  
        playSound("wrong");
        level = 0;
        start = false;
        gameSequence=[];
        clickSequence=[];
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        setTimeout(function(){
            nextSequence();
        },1000);
        
        return 0;
      }
}

function nextSequence() {

    clickSequence = [];

    level++;
    $("h1").text("level "+level);

    var number = Math.floor(Math.random() * 4);
    var nextRandomColor = buttonColors[number];
    gameSequence.push(nextRandomColor);

    $("#"+nextRandomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(nextRandomColor);
}

function playSound(colorName){
    var audio = new Audio("sounds/"+colorName+".mp3");
    audio.play();
}

function animate(colorName){
    $("#"+colorName).addClass("pressed");
    setTimeout(function(){
        $("#"+colorName).removeClass("pressed");
    },100);
}