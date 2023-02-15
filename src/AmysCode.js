// *const wordPairText = {
//    type: 'html-keyboard-response',
//       stimulus: "LOVA - BED",
//     trial_duration: 4000,
//     response_ends_trial: false
// }
// timeline.push(wordPairText);
// */

// const blankText = {
//     type: 'html-keyboard-response',
//     stimulus: "",
//     trial_duration: 250,
//     response_ends_trial: false
// }

//timeline.push(blankText);

// code to show a cross
/*const crossText = {
    type: 'html-keyboard-response',
    stimulus: "+",
    trial_duration: 1000,
    response_ends_trial: false
}*/

//timeline.push(crossText);


// SAMPLE DEFINITION OF A TRIAL TIMELINE WITH ONLY ONE TRIAL
// NOTE: NO FIXATION CROSS IN THIS SAMPLE

// let testVariables = [{
//         prompt: "On the next screen, press [b] if you see a banana. Press [space] to continue.",
//         stimulus: "imgs/banana.png"
//     },
//     {
//         prompt: "On the next screen, press [b] if you see a banana. Press [f] to continue.",
//         stimulus: "imgs/banana.png"
//     },
//     {
//         prompt: "On the next screen, press [b] if you see a banana. Press [j] to continue.",
//         stimulus: "imgs/banana.png"
//     }
// ]

// lines 30-46 DEFINE the code for a prompt and for a trial, they are not added to the timeline until line 51
// const promptText = {
//     type: 'html-keyboard-response',
//     stimulus: jsPsych.timelineVariable("prompt"),
//     choices: ['space']
// }

// const chooseTrial = {
//     type: "image-keyboard-response",
//     stimulus: jsPsych.timelineVariable("stimulus"),
//     on_finish: () => {
//         // get the information for what key was pressed and do a small alert to print it out
//         // this is just for testing purposes to determine if the correct key was recorded
//         var data = jsPsych.data.get().last(1).values()[0];
//         console.log(data)
//         var keyPressed = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
//         if (TEST) {
//             alert(`You pressed key ${keyPressed}`)
//         };
//     }
// }

// // sample trial timeline with only the trial (i.e. no fixation cross)
// // to add more trials, add elements to the array on line 41

// const testTrialTimelines = {
//     timeline: [promptText, chooseTrial],
//     timeline_variables: testVariables,
//     randomize_order: true,
//     repetitions: 1
// };

// timeline.push(testTrialTimelines);

// // final text to end experiment
// const sampleEnd = {
//     type: 'html-keyboard-response',
//     stimulus: "<div class='main' style='font-size:20px'>End of experiment. Press any key to dismiss.</div>"
// }

// timeline.push(sampleEnd);

// // display the timeline object if in testing mode or if variable to show timelines is set to true

// if (TEST || SHOWTIMELINE) {
//     console.log("In testing mode")
//     console.log(timeline);
// }

// // initiates the jsPsych experiment with the events defined in the timeline array
// jsPsych.init({
//     timeline: timeline,
//     on_finish: () => {
//         if (TEST) {
//             alert("ALL DONE!")
//         };
//     }
// });