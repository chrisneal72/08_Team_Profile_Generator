/**
 * Class representing a Employee
 * @class
 */
class Employee {
  /**
   * Create a Employee.
   * @param {string} name - Name of the Employee
   * @param {number} id - ID of the Employee
   * @param {string} email - Email of the Employee
   */
  constructor(name, id, email) {
    // id = parseInt(id);
    // if (!name || !name.trim().length) {
    //   throw new Error("Expected parameter 'name' to be a non-empty string");
    // }
    // if (typeof id !== "number" || isNaN(id)) { //|| id < 0
    //   throw new Error("Expected parameter 'id' to be a non-negative number");
    // }
    // if (!email || !email.trim().length) {
    //   throw new Error("Expected parameter 'name' to be a non-empty string");
    // }
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName(){
    return this.name;
  }

  getId(){
    return this.id;
  }

  getEmail(){
    return this.email;
  }

  getRole(){
    return "Employee";
  }

}

module.exports = Employee;
