
var userClickedPattern = [];
var level = 0;

var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
$("#level-title").text("Press A to start game");
// $(document).keydown(function(event){
//     nextSequence();
// });
nextSequence();






function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
                nextSequence();
            },500)

            userClickedPattern.splice(0, userClickedPattern.length);
        }
    }
    else{

        (new Audio("sounds/wrong.mp3")).play();
        $("body").addClass("game-over");
        $("#level-title").text("Press any key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);

        setTimeout(function()
        {
            $(document).keydown(function(){
            userClickedPattern.splice(0, userClickedPattern.length);
            gamePattern.splice(0,gamePattern.length);
            level=0;
            nextSequence();
            });
            

        },1000);
            


    }


}

function animatePress(currrentColor) {
    $("#" + currrentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currrentColor).removeClass("pressed")
    }, 100);

}


function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function handler(iid) {
    var userChosenColor = iid;
    userClickedPattern.push(userChosenColor);
}
$(".btn").click(function () {
    handler(this.id);
    playsound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    var num = Math.floor(Math.random() * 4);
    $("#level-title").text("Level " + (++level));
    var randomChosenColor = buttonColor[num];
    gamePattern.push(randomChosenColor);
    //console.log("pattern "+gamePattern);

    $("#" + gamePattern[level - 1]).fadeOut(50).fadeIn(50);
}
