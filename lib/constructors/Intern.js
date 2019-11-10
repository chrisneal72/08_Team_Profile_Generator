const Employee = require("./Employee");

/**
 * Class representing a Inter.
 * @class
 * @extends Employee
 */
class Intern extends Employee {
  /**
   * Create a Intern.
   * @param {string} name - Name of the Intern
   * @param {number} id - ID of the Intern
   * @param {string} email - Email of the Intern
   * @param {string} school - School of the Intern
   */
  constructor(name, id, email, school) {
    if (!school || !school.trim().length) {
      throw new Error("Expected parameter 'school' to be a non-empty string");
    }
    super(name, id, email);
    this.school = school;
  }

  getRole(){
    return "Intern";
  }

  getSchool(){
    return this.school;
  }
}

module.exports = Intern;
