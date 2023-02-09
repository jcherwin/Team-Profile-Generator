const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const html = require('./utils/generateHTML.js');

const htmlFilePath = './dist/index.html';

const employeeList = [];

// Accepts a string and an object and returns a new object based on a specific class
function pickEmployee(e, data){

    let employee;    

    switch(e){
        case 'Manager':
            if(data){ employee = new Manager(data.name, data.id, data.email, data.officeNumber) }
            else{ employee = new Manager() }
            break;
        case 'Engineer':
            if(data){ employee = new Engineer(data.name, data.id, data.email, data.github) }
            else{ employee = new Engineer() }
            break;
        case 'Intern':
            if(data){ employee = new Intern(data.name, data.id, data.email, data.school) }
            else{ employee = new Intern() }
            break;
    }

    return employee;

}

// Generates questions based on which type of employee is being asked for
function employeeQuestions(e) {

    let employee = pickEmployee(e);

    let questions = [
        {
            type: 'input',
            name: 'name',
            message: employee.getName(),            
        },
        {
            type: 'input',
            name: 'id',
            message: employee.getId(),            
        },
        {
            type: 'input',
            name: 'email',
            message: employee.getEmail(),            
        },
    ];

    switch(e){
        case 'Manager':
            questions.push({
                type: 'input',
                name: 'officeNumber',
                message: employee.getOfficeNumber(),                
            });
            break;
        case 'Engineer':
            questions.push({
                type: 'input',
                name: 'github',
                message: employee.getGithub(),                
            });
            break;
        case 'Intern':
            questions.push({
                type: 'input',
                name: 'school',
                message: employee.getSchool(),                
            });
            break;
    }

    questions.push({
        type: 'list',
        name: 'continue',
        message: 'Would you like to add another employee?: ',
        choices: [
            'Engineer',
            'Intern',
            'Finish building my team',
        ]        
    });

    return questions;
}

// Takes the generated questions and asks them through the inquirer module
function employeePrompt(e) {

    //Set up a promise that wait to get the questions back before passing them into inquirer
    const ask = new Promise((res, rej) => {
        let questions = employeeQuestions(e);
        res(questions);
    });

    ask
    .then((questions) => {

        inquirer
        .prompt(questions)
        .then((answers) => {

            // Object that destructures the returned answer object to be passed elsewhere
            const prompt =  {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                officeNumber: answers.officeNumber,
                github: answers.github,
                school: answers.school,
            }

            // Sets employee equal to an class object with the relavent information
            let employee = pickEmployee(e, prompt);

            // Each time a set of questions is asked, the new class object is passed to an array
            employeeList.push(employee);

            // Check to see if user wants to continue entering team members, if YES then a new set of appropriate questions is asked
            // if NO, then the recursive loop is exited and the array of class objects is passed to the generateHTML function which
            // prints all the gathered info out to an HTML file
            if(answers.continue != 'Finish building my team'){
                employeePrompt(answers.continue);
            }else{
                console.log("All employees entered!");

                const htmlText = html.generateHTML(employeeList);
                writeToFile(htmlFilePath, htmlText);
            }            
        
        }); // end inquirer

    }); // end ask

} // end function

// Create a function to write HTML file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Success: HTML File Generated!')
        }
    });
}

// Create a function to initialize app
function init() {

    // Call the employeePrompt function with the string 'Manager' to initialize it, because Manager is the first employee asked for
    employeePrompt('Manager');

}

// Function call to initialize app
init();