const inquirer = require('inquirer');
const fs = require('fs');
//const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let employeeList = [];

function pickEmployee(e, data){

    let employee;    

    switch(e){
        case 'Manager':
            if(data){ employee = new Manager(data.name, data.id, data.email, data.officeNo) }
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
                name: 'officeNo',
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

    //console.log(questions);

    return questions;
}

function employeePrompt(e) {

    //console.log("employeePrompt taking:" + e);

    const ask = new Promise((res, rej) => {
        let questions = employeeQuestions(e);
        res(questions);
    })

    ask
    .then((questions) => {
        //console.log("Questions from promise");
        //console.log(questions);

        inquirer
        .prompt(questions)
        .then((answers) => {
            //console.log(answers);
            const prompt =  {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                officeNo: answers.officeNo,
                github: answers.github,
                school: answers.school,
            }

            let employee = pickEmployee(e, prompt);

            employeeList.push(employee);
            
            console.log(employeeList);

            if(answers.continue != 'Finish building my team'){
                //console.log(answers.continue);
                employeePrompt(answers.continue);
            }else{
                console.log("All employees entered!");
            }
            
            console.log("Exiting inquirer");
        });
    })

    //let questions = employeeQuestions(e);

    
}

// Create a function to initialize app
function init() {

    employeePrompt('Manager');

    /* if(prompt.continue === 'Engineer'){
        console.log('Engineer');
    }else if(prompt.continue === 'Intern'){
        console.log('Intern');
    }else if(prompt.continue === 'Finish building my team'){
        console.log('Exiting loop');
        //Exits while loop
        employeeLoop = false;
    } */            

    //const readmeText = markdown.generateMarkdown(prompt);

    //console.log(readmeText);

    //writeToFile(readmeFilePath, readmeText);

    /* const prompt =  {
        name: response.name,
        id: response.id,
        email: response.email,
        officeNo: response.officeNo,
        github: response.github,
        school: response.school,
        continue: response.continue,
    } */

}

// Function call to initialize app
init();