//opening variables

var gameArea = $('#quiz-area');
var startCounting = 30;

//click events

$(document).on('click', '#start-over', function(event) {
    game.reset();
});

$(document).on('click', '.answer-button', function(event) {
    game.clicked(event);
});

$(document).on('click', '#start', function(event) {
    $('#wrap').prepend('<h2>Time Remaining: <span id="second-hand">30</span> Seconds</h2>');
    game.loadQuestions();
});

//questions

var questions = [{
    question: "Which country is NOT in Scandinavia?",
    answers: ["Norway", "Finland", "Estonia", "Denmark"],
    correctAnswer: "Estonia",
}, {
    question: "Which television show was NOT created by David Simon?",
    answers: ["The Wire", "Treme", "The Deuce", "True Detective"],
    correctAnswer: "True Detective",
}, {
    question: "Which professional sports team is NOT located in Houston?",
    answers: ["Dynamo", "Cowboys", "Rockets", "Astros"],
    correctAnswer: "Cowboys",
}, {
    question: 'Which band is NOT from Portland, Oregon?',
    answers: ["Murder City Devils", "The Wipers", "Poison Idea", "Dead Moon"],
    correctAnswer: "Murder City Devils",
}, {
    question: "Who is the Prime Minister of Canada?",
    answers: ["Nigel Farage", "Theresa May", "Justin Trudeau", "Boris Johnson"],
    correctAnswer: "Justin Trudeau",
}, {
    question: "Which novel was NOT written by Larry McMurtry?",
    answers: ["Blood Meridian", "Anything for Billy", "Lonesome Dove", "Streets of Laredo"],
    correctAnswer: "Blood Meridian",
}, {
    question: "Which of these people is in the band NOFX?",
    answers: ["Stigma", "Fletcher", "Smelly", "Springa"],
    correctAnswer: "Smelly",
}, {
    question: "How many udders does a female cow have?",
    answers: ["Eight", "Four", "Two", "Six"],
    correctAnswer: "Four",
}, {
    question: "What is the official religion of Russia?",
    answers: ["Islam", "Catholicism", "Buddhism", "Eastern Orthodoxy"],
    correctAnswer: "Eastern Orthodoxy",
}, {
    question: "Which character has Gary Oldman NOT portrayed?",
    answers: ["Beethoven", "Professor X", "Winston Churchill", "Sid Vicious"],
    correctAnswer: "Professor X",
}];

//ruleset of the game

var game = {
    currentQuestion:0,
    counter:startCounting,
    correct:0,
    incorrect:0,

//clock counts down from 30
  
countdown: function() {
    game.counter--;
    $('#second-hand').html(game.counter);

//when clock runs out, game is over

    if (game.counter === 0) {
        game.timeUp();
    }
},

//questions and answers are displayed

loadQuestions: function() {
    timer = setInterval(game.countdown, 1000);
    gameArea.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i < questions.length; i++) {
        $("#quiz-area").append('<h2>' + questions[i].question + '</h2>');
    for (var j = 0; j < questions[i].answers.length; j++) {
        $("#quiz-area").append('<input type="radio" name="question' + '-' + i + '" value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
    }
    }
},

 //clears timer when time is up
  
timeUp: function () {
    clearClock(timer);
    $('#second-hand').html(game.counter);
},
  
//this *should* be where the results generate

results: function() {
    clearClock(timer);
    gameArea.html('<h2>Here is how you scored!</h2>');
    $('#second-hand').html(game.counter);
    gameArea.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    gameArea.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    gameArea.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    gameArea.append('<br><button id="start-over">Start Over?</button>');
},

//function to tally right and wrong answers

clicked: function(event) {
    if ($(event.target).data("name") === questions[this.currentQuestion].currentQuestion.correctAnswer){
        this.answeredCorrectly();
    } else {
        this.answeredIncorrectly();
    }
},

//add to tally

answeredIncorrectly: function() {
    game.incorrect++;
},
  
answeredCorrectly: function() {
    game.correct++;
},

//when start over button is pressed, reset all settings

reset: function(){
    this.counter = startCounting;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestions();
} 
}; 