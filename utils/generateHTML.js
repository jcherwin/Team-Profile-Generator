// Function that accepts a class object and returns strings containing specific info relating that the given class
function renderEmployeeSpecific(data){

    const type = data.constructor.name;
    const obj = {
        info: '',
        icon: '',
    }    

    switch(type) {
        case 'Manager':
            obj.info = `Office number: ${data.officeNumber}`;
            obj.icon = 'bi-cup-hot-fill';
            break;
        case 'Engineer':
            obj.info = `GitHub: <a href="https://github.com/${data.github}" target="_blank" class="card-link">${data.github}</a>`;
            obj.icon = 'bi-eyeglasses';
            break;
        case 'Intern':
            obj.info = `School: ${data.school}`;
            obj.icon = 'bi-book';
            break;
    }

    return obj;
}

// Specifically renders the Info Cards containing each team members info
function renderInfoCardSection(data){

    let string = '';

    for(let x in data){

        let employeeSection = renderEmployeeSpecific(data[x]);

        string += `<div class="col-6 col-md-4">
        <div class="card">
        <div class="card-header">
        <h4 class="card-title">
        ${data[x].name}
        </h4>
        <h4 class="card-title">
        <i class="bi ${employeeSection.icon}"></i>
        ${data[x].constructor.name}
        </h4>          
        </div>
        <div class="card-body">
        <ul class="list-group list-group-flush">
        <li class="list-group-item">
        ID: ${data[x].id} 
        </li>
        <li class="list-group-item">
        Email: 
        <a href="mailto:${data[x].email}" target="_blank" class="card-link">
        ${data[x].email}
        </a></li>
        <li class="list-group-item">
        ${employeeSection.info}
        </li>
        </ul>          
        </div>
        </div>
        </div>`;
    }

    return string;

}


// Create a function to generate text for HTML with inline CSS
function generateHTML(data) {

    const infoCardSection = renderInfoCardSection(data)
  
    return `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">    
    <link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
    >
    <link 
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    rel="stylesheet" 
    >
    <title>Employee List</title>
    <style>
    header{
        height: 260px;
        background-color: rgb(45, 45, 204);
        margin-bottom: 40px;
    }

    header h1{
        padding-top: 80px;
        text-align: center;
        color: whitesmoke;
    }
    .col-6{
        margin-bottom: 40px;
    }
    </style>
    </head>
    <body>
    <header>
        <h1>My Team</h1>
    </header>
    <div class="container">
        <div class="row justify-content-evenly">
            ${infoCardSection}
        </div>
    </div>
    <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"
    ></script>
    </body>
    </html>
    `;
  
  }
  
  module.exports = { generateHTML };  