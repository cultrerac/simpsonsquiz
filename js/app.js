$(document).ready(function() {
$('h1').hide().delay(500).fadeIn('slow');
$('.status').hide().delay(700).fadeIn('slow');
generateQuestions();
generateAnswers();
submit();
restart();
}); 

var currentQuestion = 0;
var selectedAnswer = "";
var score = 0;
var questions = new Array();

function Question(currentQuestion,answers,correct) {
    this.currentQuestion = currentQuestion;
    this.answers = answers;
    this.correct = correct;
}

questions [0] = new Question ("In the episode 'A Milhouse Divided'. what is the name of Lou-Anne's new boyfriend?",["Blaze", "Pyro", "Laser", "Craig"], 1);
questions [1] = new Question ("In the episode 'The Joy of Sect'. to what destination does the leader promise to deliver the members of his cult?",["Heaven", "Happyville", "Blisstonia", "Seattle"], 2);
questions [2] = new Question ("In the episode 'Homer at the Bat', which ringer takes Homer's spot on the company softball team?",["Daryl Strawberry", "Roger Clemens", "Ken Griffey Jr.", "Steve Sax"], 0);
questions [3] = new Question ("In the episode 'Behind the Laughter', the Simpsons house is taken by the IRS. Who did the house formerly belong to?",["John Madden", "Mike Tyson", "M.C. Hammer", "Vanilla Ice"], 2);
questions [4] = new Question ("In the episode 'Homer's Barbershop Quartet', who replaces Chief Wiggum in the group?",["Lenny", "Carl", "Flanders", "Barney"], 3);


// questions appear
function generateQuestions() {
var q = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q + '</h4>').hide().delay(1200).fadeIn('slow');
}

function generateAnswers(){
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
}
$("#answers").append(write).hide().delay(1200).fadeIn('slow');
}

// Radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
    evaluation();
    $('.option').attr('disabled',true); 
   }
});
}

// Evaluate answer 
function evaluation() {
var selected = $("input[type='radio'][name='radio']:checked");
    if (selected.length >= 0) {
        selectedAnswer = selected.val();
    }
    if (selectedAnswer == questions [currentQuestion].correct) {
        $('#correct').append("<p>Correct!</p>").hide().delay(400).fadeIn('400');
        $('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
        $('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
        nextQuestion();
        playerScore();
        currentQuestion++;
    }
    
    else {
        $('#incorrect').append("<p>Incorrect.</p>").hide().delay(400).fadeIn('400');
        $('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
        $('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
        nextQuestion();
        currentQuestion++;
    }
}

function nextQuestion() {
    $("#next").click(function() {
        $('h4').remove();
        $('li').remove();
        $(".outcome p").remove();

if (currentQuestion >= 5) {
    complete();
    restart();
    return;
    }
else {
    questionNumber();
    generateQuestions();
    generateAnswers();
    submit();
    }
});

}

function playerScore() {
    $('#score p').remove();
    score++;
    $('#score').append(" " + '<p>' + score + '</p>');

}

function questionNumber() {
    $('#question p').remove();
    $('#question').append(" " + '<p>' + (currentQuestion +1) + '/5</p>');
}

function complete() {
    $('.status').hide();
    $('#heading').append("<h4>You scored" + " " + score + " " + "out of 5 <br>" + "<div class='restart'><p>Restart</p></div></h4>").hide().fadeIn('400');
    $('.restart').addClass('quiz-end');
}

function restart() {
    $('.restart').click(function() {
        $('.restart').removeClass('quiz-end');
        currentQuestion = 0;
        score = (score-(score+1));
        questions [0];
        $('#score').hide().delay(400).fadeIn('slow');
        $('#question').hide().delay(400).fadeIn('slow');
        $('h4').remove();
        $('li').remove();
        $(".outcome p").remove();
        questionNumber();
        generateQuestions();
        generateAnswers();
        submit();
        playerScore();
        $('.status').show();
    });
}