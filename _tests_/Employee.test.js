const Employee = require('../lib/employee');

describe("Employee", () => {
    describe("Methods", () => {
      it("should return a specific string when the getRole is called ", () => {
        const str = 'Employee';

        const result = new Employee().getRole();
  
        expect(result).toEqual(str);
      });
  
      it("should return a string with specific role filled in when getName is called", () => {
        const role = 'Employee';
        const str = `What is the name of the ${role}?: `;        
  
        const result = new Employee().getName();
  
        expect(result).toEqual(str);
      });  

    });  
    
});