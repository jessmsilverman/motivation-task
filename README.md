# jsPsych Template

jsPsych is a framework for web-based experiments, useful for vision science.
The following template is build for the DML and includes a framework for a web server for testing purposes, separate source and public trees, and a standard html for an intro and outro.

# How To Install

1. Git clone or download this repository
2. If you don't already have Node.js on your computer, install it from: [Download link](https://nodejs.org/en/download/)
3. In terminal, navigate to the cloned repository and run the command:

```
npm install
```

# How To Run Experiments

Follow the next step to create a local HTTPS server. **You must complete installation to perform these steps.**

1. In terminal, navigate to the folder you have been coding in (default name jsPsychTemplate) and run the following command:

```
npm run experiment
```

**The server will close if you close the tab in which you ran the previous command. You will have to repeat step 1 each time you want to run the experiment.**

2. In the browser, navigate to this URL:
   [Localhost](http://localhost:8000/)
3. You may need to select the public folder from there. Once you've done that, you'll be at the index.html file and at the start of the program :)

# How To Update Your Experiment

This folder has two trees; the source tree (the src file) and the public tree (the public file). The code run by your participants is in the public folder. You will work in the src folder (i.e. you will edit all of your js files in the src folder). To view your changes in the src folder, you will need to rebuild the public tree every time.

1. When you make any changes, run the following command in terminal:

```
npm run build
```

After you've run this command, you will see the changes in the local server.
