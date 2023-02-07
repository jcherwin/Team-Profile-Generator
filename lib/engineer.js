const Employee = require('./employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return 'What is their Github username?: ';
  }

  getRole() {
    return 'Engineer';
  }

}

module.exports = Engineer;