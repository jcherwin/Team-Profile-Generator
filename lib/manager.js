const Employee = require('./employee');

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber(){
    return 'What is their office number?: ';
  }

  getRole() {
    return 'Team Manager';
  }

}

module.exports = Manager;