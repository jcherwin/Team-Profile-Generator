const Engineer = require('../lib/engineer');

describe("Engineer", () => {
    describe("Methods", () => {
      it("should return a specific string when the getRole method is called ", () => {
        const str = 'Engineer';

        const result = new Engineer().getRole();
  
        expect(result).toEqual(str);
      });
  
      it("should return a string with specific role filled in when getName method is called", () => {
        const role = 'Engineer';
        const str = `What is the name of the ${role}?: `;        
  
        const result = new Engineer().getName();
  
        expect(result).toEqual(str);
      });  

    });  
    
});