// initiate global variables
let TEST = true;
let SHOWTIMELINE = true;

// if you want to do something once the page is loaded, you can do so on line 6.5
document.addEventListener("DOMContentLoaded", function (event) {});

// JSPSYCH CODE BEGINS HERE
let wordPairsA = [["Akis", "Eye"], ["Arbata", "Tea"], ["Augalas", "Plant"], ["Batas", "Shoe"], ["Bugnas", "Drum"], ["Burna", "Mouth"], ["Dazai", "Paint"], ["Duona", "Bread"], ["Durys", "Door"], ["Gatve", "Street"], ["Gele", "Flower"], ["Kambarys", "Room"], ["Knyga", "Book"], ["Koja", "Leg"], ["Kraujas", "Blood"], ["Laiptelis", "Stair"], ["Langas", "Window"], ["Lietus", "Rain"], ["Lova", "Bed"], ["Miestas", "City"], ["Mokykla", "School"], ["Muilas", "Soap"], ["Nafta", "Oil"], ["Namas", "House"], ["Obuolys", "Apple"], ["Pastatas", "Building"], ["Pienas", "Milk"], ["Plaukas", "Hair"], ["Puodelis", "Cup"], ["Pyraga", "Cake"], ["Raktas", "Key"], ["Riteris", "Knight"], ["Sesuo", "Sister"], ["Sokis", "Dance"], ["Stalas", "Table"], ["Tiltas", "Bridge"], ["Traukinys", "Train"], ["Turgus", "Market"], ["Tvartas", "Barn"], ["Ugnis", "Fire"], ["Urvas", "Cave"], ["Vanduo", "Water"], ["Vonia", "Bath"], ["Ziedas", "Ring"], ["Zuvis", "Fish"]];

let timeline = [];

// a simple text plugin
const sampleIntro = {
    type: 'html-keyboard-response',
    stimulus: "<div class='main' style='font-size:20px'>Demo text. Press any key to dismiss.</div>"
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
    let shuffledArray = jsPsych.randomization.repeat(wordPairsA, 1);
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

function testCriteria() {
    console.log('testCriteria');
    let crossTextLong = getCrossText(1000);
    let questions = [];
    for (let i = 0; i < wordPairsA.length; i++) {
        /*change to shuffled[i][0] for test*/let prompt = wordPairsA[i][0] + " - ";
        let question = {
            prompt: prompt
        };
        let answer = wordPairsA[i][1];

        timeline.push({
            type: 'survey-text',
            questions: [question],
            data: {
                answer: answer,
                prompt: prompt
            },
            on_finish: function (data) {
                console.log("data", data);
                let responses = JSON.parse(data.responses);
                let response = responses.Q0;
                let answer = data.answer;
                // Score the response as correct or incorrect.
                // .trim removes spaces before and after input 
                if (response.toLowerCase().trim() === answer.toLowerCase()) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        });

        // let displayAnswer = answer + (answer === wordPairsA[i][1] ? " Correct!" : " Incorrect");
        // for feedBack: https://www.jspsych.org/6.3/overview/dynamic-parameters/#randomizing-a-parameter-value
        let feedBack = {
            type: 'html-keyboard-response',
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
                    // question "-" answer Correct 
                    return (/*"Correct!<br/>" +*/last_question + last_answer
                    ); // the parameter value has to be returned from the function
                } else {
                    // question - answer Incorrect 
                    return (/*"Incorrect<br/>"*/+last_question + last_answer
                    ); // the parameter value has to be returned from the function
                }
            }

        };
        timeline.push(feedBack);

        timeline.push(crossTextLong);
    }

    console.log('questions', questions);
}
study();
testCriteria();
// study()

// the first test has all the questions
// for each question, the participant is shown the first word + a blank (using survey-text)
// a response is entered, and they are given feedback 
// (it's correct, or it's wrong and the correct answer is shown)
// after the first test, the questions answered correctly are removed (use survey-text on_finish)
// (while) repeat this up to 16 total times, or until every question has been gotten right once


jsPsych.init({
    timeline: timeline
});

if (TEST || SHOWTIMELINE) {
    console.log("In testing mode");
    console.log(timeline);
}