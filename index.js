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
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's id number?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number",
    },
];
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineers's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineers's id number?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineers's email?",
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineers's GitHub username?",
    },
];
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's id number?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
    },
    {
        type: "input",
        name: "school",
        message: "What is the name of the intern's school?",
    },
];

async function init() {
    try {
        const response = await inquirer.prompt(managerQuestions);
        console.log(Object.keys(response).map(function (k) { return response[k] }).join(","));
        teamMembers.push(new Manager(response.name, response.id, response.email, response.officeNumber));
        let moreTeam = true;
        while (moreTeam) {
            const memberType = await inquirer.prompt({
                type: "list",
                message: "Select team member type:",
                name: "memberType",
                choices: ["Engineer", "Intern", "No other team members to add"]
            });
            console.log(memberType.memberType)
            if (memberType.memberType === "Engineer") {
                const res = await inquirer.prompt(engineerQuestions);
                console.log(Object.keys(res).map(function (k) { return res[k] }).join(","));
                teamMembers.push(new Engineer(res.name, res.id, res.email, res.github));
            } else if (memberType.memberType === "Intern") {
                const res = await inquirer.prompt(internQuestions);
                console.log(Object.keys(res).map(function (k) { return res[k] }).join(","));
                teamMembers.push(new Intern(res.name, res.id, res.email, res.school));
            } else {
                moreTeam = !moreTeam;
            }
        }
        console.log(teamMembers);
        render(teamMembers);
    } catch (err) {
        console.log(err);
    }
}

init();
