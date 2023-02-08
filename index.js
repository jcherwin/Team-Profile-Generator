const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const html = require('./utils/generateHTML.js');

const htmlFilePath = './dist/index.html';

const employeeList = [];

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

function employeePrompt(e) {

    const ask = new Promise((res, rej) => {
        let questions = employeeQuestions(e);
        res(questions);
    });

    ask
    .then((questions) => {

        inquirer
        .prompt(questions)
        .then((answers) => {

            const prompt =  {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                officeNumber: answers.officeNumber,
                github: answers.github,
                school: answers.school,
            }

            let employee = pickEmployee(e, prompt);

            employeeList.push(employee);

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

    employeePrompt('Manager');

}

// Function call to initialize app
init();