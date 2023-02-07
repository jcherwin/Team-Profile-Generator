class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  
    getName() {
        return `What is the name of the ${this.getRole()}?: `;     
    }
    
    getId() {
        return 'What is their work ID?: ';
    }
    
    getEmail() {
        return 'What is their email?: ';  
    }
    
    getRole() {   
        return 'Employee';   
    }

}
  
module.exports = Employee; 