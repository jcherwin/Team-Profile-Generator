const Intern = require('../lib/intern');

describe("Intern", () => {
    describe("Methods", () => {
      it("should return a specific string when the getRole method is called ", () => {
        const str = 'Intern';

        const result = new Intern().getRole();
  
        expect(result).toEqual(str);
      });
  
      it("should return a string with specific role filled in when getName method is called", () => {
        const role = 'Intern';
        const str = `What is the name of the ${role}?: `;        
  
        const result = new Intern().getName();
  
        expect(result).toEqual(str);
      });  

    });  
    
});