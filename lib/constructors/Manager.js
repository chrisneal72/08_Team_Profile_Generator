const Employee = require("./Employee");

/**
 * Class representing a Manager.
 * @class
 * @extends Employee
 */
class Manager extends Employee {
  /**
   * Create a Manager.
   * @param {string} name - Name of the Manager
   * @param {number} id - ID of the Manager
   * @param {string} email - Email of the Manager
   * @param {number} officeNumber - Office Number of the Manager
   */
  constructor(name, id, email, officeNumber) {
    officeNumber = parseInt(officeNumber);
    if (
      typeof officeNumber !== "number" ||
      isNaN(officeNumber) ||
      officeNumber < 0
    ) {
      throw new Error(
        "Expected parameter 'officeNumber' to be a non-negative number"
      );
    }
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole(){
   return "Manager"; 
  }
  
  getOfficeNumber(){
    return this.officeNumber;
  }

}

module.exports = Manager;
