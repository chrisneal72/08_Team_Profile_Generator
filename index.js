// NPM Modules
const inquirer = require("inquirer");

// Local Modules
const render = require("./lib/htmlrenderer");

// Constructors
const Manager = require("./lib/constructors/Manager");
const Engineer = require("./lib/constructors/Engineer");
const Intern = require("./lib/constructors/Intern");



// Global Variables
const teamMembers = [];
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
            if (typeof id !== "number" || isNaN(id)) {
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
            if (typeof id !== "number" || isNaN(id)) {
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
            if (typeof id !== "number" || isNaN(id)) {
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
            if (typeof id !== "number" || isNaN(id)) {
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

async function init() {
    try {
        const response = await inquirer.prompt(managerQuestions);
        teamMembers.push(new Manager(response.name, response.id, response.email, response.officeNumber));
        let moreTeam = true;
        while (moreTeam) {
            const memberType = await inquirer.prompt({
                type: "list",
                message: "Select team member type:",
                name: "memberType",
                choices: ["Engineer", "Intern", "No other team members to add"]
            });
            if (memberType.memberType === "Engineer") {
                const res = await inquirer.prompt(engineerQuestions);
                teamMembers.push(new Engineer(res.name, res.id, res.email, res.github));
            } else if (memberType.memberType === "Intern") {
                const res = await inquirer.prompt(internQuestions);
                teamMembers.push(new Intern(res.name, res.id, res.email, res.school));
            } else {
                moreTeam = !moreTeam;
            }
        }
        render(teamMembers);
    } catch (err) {
        console.log(err);
    }
}

init();
