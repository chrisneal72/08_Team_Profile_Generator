//FILE CONTAINS ALL OF THE QUESTIONS
//I COULD HAVE KEPT THE QUESTIONS INLINE AND JUST CHANGED THE LAST QUESTION BASED ON THEIR 
//ANSWER BUT I CHOSE THIS METHOD TO PRACTICE PULLING IN THE LIB
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
        validate: answer => {
            if (answer || answer.trim().length) {
                return true;
            }
            return "Please enter the manager's name";
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's id number?",
        validate: answer => {
            answer = parseInt(answer);
            if (typeof answer !== "number" || isNaN(answer)) {
                return "Please enter a valid number";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
        validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number",
        validate: answer => {
            answer = parseInt(answer);
            if (typeof answer !== "number" || isNaN(answer)) {
                return "Please enter a valid number";
            }
            return true;
        }
    },
];
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineers's name?",
        validate: answer => {
            if (answer || answer.trim().length) {
                return true;
            }
            return "Please enter the engineer's name";
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineers's id number?",
        validate: answer => {
            answer = parseInt(answer);
            if (typeof answer !== "number" || isNaN(answer)) {
                return "Please enter a valid number";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineers's email?",
        validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineers's GitHub username?",
        validate: answer => {
            if (answer || answer.trim().length) {
                return true;
            }
            return "Please enter the engineer's GitHub username";
        }
    },
];
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        validate: answer => {
            if (answer || answer.trim().length) {
                return true;
            }
            return "Please enter the intern's name";
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's id number?",
        validate: answer => {
            answer = parseInt(answer);
            if (typeof answer !== "number" || isNaN(answer)) {
                return "Please enter a valid number";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
        validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
    },
    {
        type: "input",
        name: "school",
        message: "What is the name of the intern's school?",
        validate: answer => {
            if (answer || answer.trim().length) {
                return true;
            }
            return "Please enter the intern's school name";
        }
    },
];

module.exports = {managerQuestions, engineerQuestions, internQuestions};