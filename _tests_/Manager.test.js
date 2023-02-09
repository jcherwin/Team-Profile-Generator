const Manager = require('../lib/manager');

describe("Manager", () => {
    describe("Methods", () => {
      it("should return a specific string when the getRole method is called ", () => {
        const str = 'Team Manager';

        const result = new Manager().getRole();
  
        expect(result).toEqual(str);
      });
  
      it("should return a string with specific role filled in when getName method is called", () => {
        const role = 'Team Manager';
        const str = `What is the name of the ${role}?: `;        
  
        const result = new Manager().getName();
  
        expect(result).toEqual(str);
      });  

    });  
    
});