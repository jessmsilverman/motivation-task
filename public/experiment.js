// initiate global variables
let TEST = true;
let SHOWTIMELINE = true;

// if you want to do something once the page is loaded, you can do so on line 6.5
document.addEventListener("DOMContentLoaded", function (event) {});

// JSPSYCH CODE BEGINS HERE
let wordPairsA = [["Akis", "Eye"], ["Arbata", "Tea"], ["Augalas", "Plant"], ["Batas", "Shoe"], ["Bugnas", "Drum"], ["Burna", "Mouth"], ["Dazai", "Paint"], ["Duona", "Bread"], ["Durys", "Door"], ["Gatve", "Street"], ["Gele", "Flower"], ["Kambarys", "Room"], ["Knyga", "Book"], ["Koja", "Leg"], ["Kraujas", "Blood"], ["Laiptelis", "Stair"], ["Langas", "Window"], ["Lietus", "Rain"], ["Lova", "Bed"], ["Miestas", "City"], ["Mokykla", "School"], ["Muilas", "Soap"], ["Nafta", "Oil"], ["Namas", "House"], ["Obuolys", "Apple"], ["Pastatas", "Building"], ["Pienas", "Milk"], ["Plaukas", "Hair"], ["Puodelis", "Cup"], ["Pyraga", "Cake"], ["Raktas", "Key"], ["Riteris", "Knight"], ["Sesuo", "Sister"], ["Sokis", "Dance"], ["Stalas", "Table"], ["Tiltas", "Bridge"], ["Traukinys", "Train"], ["Turgus", "Market"], ["Tvartas", "Barn"], ["Ugnis", "Fire"], ["Urvas", "Cave"], ["Vanduo", "Water"], ["Vonia", "Bath"], ["Ziedas", "Ring"], ["Zuvis", "Fish"]];

let wordPairsB = [["Test", "Tset"], ["Test1", "1tset"]
// ["Adata", "Needle"],
// ["Auksas", "Gold"],
// ["Bulve", "Potato"],
// ["Daina","Song"],
// ["Dumai", "Smoke"],
// ["Gelezis", "Iron"],
// ["Karalius", "King"],
// ["Kede", "Chair"],
// ["Kelnes", "Pants"],
// ["Kilimelis", "Rug"],
// ["Krautuve", "Store"],
// ["Kriaukle", "Sink"],
// ["Krosnis", "Stove"],
// ["Kumpis", "Ham"],
// ["Laidas", "Wire"],
// ["Laiskas", "Letter"],
// ["Maisas", "Bag"],
// ["Masina", "Car"],
// ["Medis", "Tree"],
// ["Menulis", "Moon"],
// ["Mesa", "Meat"],
// ["Mygtukas", "Button"],
// ["Padanga", "Tire"],
// ["Palaidine", "Shirt"],
// ["Paukstis", "Bird"],
// ["Pliazas", "Beach"],
// ["Plyta", "Brick"],
// ["Pomidoras", "Tomato"],
// ["Pupa", "Bean"],
// ["Purvas", "Dirt"],
// ["Sakute",  "Fork"],
// ["Sausainis", "Cookie"],
// ["Sepetys", "Brush"],
// ["Smegenys", "Brain"], 
// ["Sriuba", "Soup"],
// ["Stogas", "Roof"],
// ["Tinklas", "Net"],
// ["Tvora", "Fence"], 
// ["Upe", "River"], 
// ["Vejas", "Wind"], 
// ["Vilkas", "Wolf"], 
// ["Vinis", "Nail"],
// ["Zele", "Jelly"], 
// ["Zirkles", "Scissors"], 
// ["Zole", "Grass"]
];

// https://stackoverflow.com/a/36756480
// randomly select one of these two word pair arrays for the experiment
// change 0.00000001 back to 0.5 for randomization
let wordPairsForExperiment = Math.random() < 0.000001 ? wordPairsA : wordPairsB;

let timeline = [];

// a simple text plugin
const sampleIntro = {
    type: 'html-keyboard-response',
    stimulus: "<div class='main' style='font-size:20px'>Press any key to get started.</div>"
};
timeline.push(sampleIntro);

// code to show a cross
function getCrossText(duration) {
    const crossText = {
        type: 'html-keyboard-response',
        stimulus: "+",
        trial_duration: duration,
        response_ends_trial: false
    };
    return crossText;
}

function shuffledArray() {
    let shuffledArray = jsPsych.randomization.repeat(wordPairsForExperiment, 1);
    return shuffledArray;
}

function study() {
    console.log('study');
    let crossText = getCrossText(1000);
    let shuffled = shuffledArray();
    for (let i = 0; i < shuffled.length; i++) {

        let pair = shuffled[i][0] + " - " + shuffled[i][1];
        // console.log(stimulus)
        // code to show a word pair
        timeline.push({
            type: 'html-keyboard-response',
            stimulus: pair,
            choices: jsPsych.ALL_KEYS,
            response_ends_trial: false,
            trial_duration: 4000
        });
        timeline.push(crossText);
    }
}

let testTrials = 0;
let answersTestedCorrectly = [];

function testCriteria(isFinalTest) {
    console.log('testCriteria');
    let questions = [];
    for (let i = 0; i < 16; i++) {
        let wordPairsShuffled = shuffledArray();
        for (let j = 0; j < wordPairsShuffled.length; j++) {
            /*change to shuffled[i][0] for test*/
            let prompt = wordPairsShuffled[j][0] + " - ";
            let question = {
                prompt: prompt
            };
            let answer = wordPairsShuffled[j][1];

            // https://www.jspsych.org/7.0/overview/timeline/#conditional-timelines
            let showTrial = function () {
                // show the trial if they have not guessed it correctly.
                const show = !answersTestedCorrectly.includes(answer);

                console.log('testedcorrectly', answersTestedCorrectly, answer, show);
                return show;
            };

            timeline.push({
                conditional_function: showTrial,
                timeline: [{
                    type: 'survey-text',
                    questions: () => [question],
                    timeout: 4500,
                    data: {
                        answer: answer,
                        prompt: prompt,
                        i: j
                    },
                    on_finish: function (data) {
                        console.log("data", data);
                        let responses = JSON.parse(data.responses);
                        let response = responses.Q0;
                        let answer = data.answer;
                        // Score the response as correct or incorrect.
                        // .trim removes spaces before and after input 
                        if (response && response.toLowerCase().trim() === answer.toLowerCase()) {
                            data.correct = true;
                        } else {
                            data.correct = false;
                        }
                    }

                }]
            });

            if (!isFinalTest) {
                // for feedBack: https://www.jspsych.org/6.3/overview/dynamic-parameters/#randomizing-a-parameter-value
                let feedBack = {
                    conditional_function: showTrial,
                    timeline: [{
                        type: 'html-keyboard-response',
                        trial_duration: 1500,
                        response_ends_trial: false,
                        stimulus: function () {
                            // The feedback stimulus is a dynamic parameter because we can't know in advance whether
                            // the stimulus should be 'correct' or 'incorrect'.
                            // Instead, this function will check the accuracy of the last response and use that information to set
                            // the stimulus value on each trial.
                            var data = jsPsych.data.get().last(1).values()[0];
                            let last_trial_correct = data.correct;
                            let last_question = data.prompt;
                            let last_answer = data.answer;
                            if (last_trial_correct) {
                                answersTestedCorrectly.push(last_answer);
                                // question "-" answer Correct 
                                return '<span style="color: #228B22;font-size: 65%;">Correct!</span><br/>' + last_question + last_answer; // the parameter value has to be returned from the function
                            } else {
                                // question - answer Incorrect 
                                return '<span style="color: #C41E3A;font-size: 65%;">Incorrect</span><br/>' + last_question + last_answer; // the parameter value has to be returned from the function
                            }
                        }
                    }]
                };
                timeline.push(feedBack);
            }

            let crossTextLong = getCrossText(1000);
            timeline.push({
                timeline: [crossTextLong],
                conditional_function: showTrial
            });
        }

        timeline.push({
            conditional_function: () => {
                return answersTestedCorrectly.length < wordPairsForExperiment.length && !isFinalTest;
            },
            timeline: [{
                type: 'call-function',
                async: true,
                func: math
            }]
        });
    }
    console.log('questions', questions);
}

function getRandomInt(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

function randomMathOperation() {
    return Math.random() < 0.5 ? '+' : '-';
}

function randomMathQuestion() {
    return getRandomInt(1, 99) + ' ' + randomMathOperation() + ' ' + getRandomInt(1, 99);
}

function math(done) {
    console.log('math!');
    const contentElement = document.getElementById('jspsych-content');
    const mathDiv = document.createElement("div");

    const mathsubmit = document.createElement("button");
    mathsubmit.innerHTML = 'Submit';
    mathsubmit.classList.add('jspsych-btn');
    mathsubmit.classList.add('jspsych-survey-text');

    const textfield = document.createElement('input');
    textfield.type = 'text';
    textfield.style.width = '300px';
    textfield.style.height = '32px';
    textfield.style.marginBottom = '32px';
    textfield.classList.add('jspsych-display-element');

    function nextMath() {
        mathDiv.innerText = randomMathQuestion();
        textfield.value = '';
    }

    mathsubmit.addEventListener('click', function () {
        nextMath();
    });

    textfield.addEventListener('keydown', function (e) {
        if (e.code === 'Enter') {
            nextMath();
        }
    });

    contentElement.appendChild(mathDiv);
    contentElement.appendChild(textfield);
    contentElement.appendChild(mathsubmit);

    nextMath();

    let timeout = setTimeout(function () {
        console.log('math done');
        done();
    }, 30000);
}

function tetris(done) {

    const contentElement = document.getElementById('jspsych-content');
    // create tetris container
    // https://github.com/Aerolab/blockrain.js#setup
    const tetrisDiv = document.createElement("div");
    tetrisDiv.style.width = '500px', tetrisDiv.style.minHeight = '750px';
    tetrisDiv.style.height = '80vh';
    tetrisDiv.id = 'game';

    contentElement.appendChild(tetrisDiv);
    // document.createElement(` <div id="tetris" style="width:500px; height:80vh;"></div>`)
    $('#game').blockrain();

    // const timerDiv = document.createElement("div")
    // root.appendChild(timerDiv)

    // let timer = 60 * 5
    let timer = 60 * 5; // 5 mins

    // timer ticks every 1 second for 5 mins
    const timeout = setInterval(function () {
        if (timer === 0) {
            // when the timer expires, clear the timer (interval)
            // remove the tetris,
            // and call the done callback to tell jspsych it can move on in the timeline
            clearInterval(timeout);
            contentElement.removeChild(tetrisDiv);
            // root.removeChild(timerDiv)
            done();
        } else {
            timer = timer - 1;
            // timerDiv.innerText = timer
            console.log(timer);
        }
    }, 1000);
}
function selfMeasure() {
    var likert_scale = ['<span style="font-size: 50%;"> 1 <span style="font-size: 40%;">(lowest)</span> </span>', '<span style="font-size: 50%;"> 2 </span>', '<span style="font-size: 50%;"> 3 </span>', '<span style="font-size: 50%;"> 4 </span>', '<span style="font-size: 50%;"> 5 <span style="font-size: 40%;">(highest)</span></span>'];

    var trial = {
        type: 'survey-likert',
        questions: [{ prompt: '<span style="font-size: 150%;"> How interested were you in this task?</span> ', name: 'interest', labels: likert_scale }, { prompt: '<span style="font-size: 150%;"> How difficult did you think this task was?</span>', name: 'difficult', labels: likert_scale }, { prompt: '<span style="font-size: 150%;"> How much effort did you expend when completing this task?</span>', name: 'effort', labels: likert_scale }],
        randomize_question_order: false,
        scale_width: 500
    };
    timeline.push(trial);
}
// the first test has all the questions
// for each question, the participant is shown the first word + a blank (using survey-text)
// a response is entered, and they are given feedback 
// (it's correct, or it's wrong and the correct answer is shown)
// after the first test, the questions answered correctly are removed (use survey-text on_finish)
// (while) repeat this up to 16 total times, or until every question has been gotten right once


study();
testCriteria(false);
study();
// tetris
timeline.push({
    type: 'call-function',
    async: true,
    func: tetris
});

// final test
testCriteria(true);
selfMeasure();

timeline.push({
    type: 'html-keyboard-response',
    stimulus: 'The end!',
    response_ends_trial: false
});

// retention test

jsPsych.init({
    timeline: timeline
});

if (TEST || SHOWTIMELINE) {
    console.log("In testing mode");
    console.log(timeline);
}