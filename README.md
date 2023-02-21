# Team-Profile-Generator

## Description

The purpose of this program is to provide a simple way for a team manager to enter information about their team that will then be passed into a styled HTML file for their future reference. Just by answering a list of prompted questions, they can have a quick way of generating an HTML page that will contain all of their team members and be of a repeatable level of quality. 

This program utilizes node.js as well as the npm packages 'fs' to write to the outputted HTML file, and 'inquirer' to prompt questions to the user and pass the answers onto 'fs' to write out to the file. Finally this program also uses Jest for its suite of code testing.

## Installation

This program was built and tested using node.js v16.19.0.

After cloning this repository into a working folder of your own, you'll need to run the following command to pull in the node packages required to run the program.

```md
npm install OR npm i
```

## Usage

After installation, you can run the program by typing:

```md
node index.js
```

This will bring up a series of prompts, that after you have finished answering, will bring up the message:

```md
Success: HTML File Generated!
```

Then your finished HTML file will be located in the 'dist' folder.

<br>
Here is a video demonstrating how the program should run:

https://user-images.githubusercontent.com/117125528/220458957-0e50ee6e-0a98-48ba-ab7e-0bcb80874abc.mp4


## Tests

This program comes with a series of tests using Jest that can be ran simply by running the following command in the working folder after following the instructions in the Installation section:

```md
npm test
```

