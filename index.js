// NPM Modules
const inquirer = require("inquirer");

// Local Modules
const render = require("./lib/htmlrenderer");
const questions = require("./lib/questions"); //MOVED QUESTIONS TO THEIR OWN FILE TO MAKE THIS FILE CLEANER

// Constructors
const Manager = require("./lib/constructors/Manager");
const Engineer = require("./lib/constructors/Engineer");
const Intern = require("./lib/constructors/Intern");

// Global Variables
//ARRAY OF TEAM MEMBERS
const teamMembers = [];

async function init() {
    try {
        //START BY ASKING THE MANAGER QUESTIONS
        const response = await inquirer.prompt(questions.managerQuestions);
        //ADD THE MANAGER OBJECT TO THE ARRAY
        teamMembers.push(new Manager(response.name, response.id, response.email, response.officeNumber));
        //RUN A WHILE LOOP TO GET THE TEAM MEMBERS
        //moreTeam TRACKS IF THE USER WANTS TO ADD ANOTHER MEMEBER
        let moreTeam = true;
        while (moreTeam) {
            //THIS QUESTION ASKS FOR WHAT TYP OF MEMBER SO WE KNOW WHAT QUESTIONS TO ASK
            const memberType = await inquirer.prompt({
                type: "list",
                message: "Select team member type:",
                name: "memberType",
                choices: ["Engineer", "Intern", "No other team members to add"]
            });
            //ASK ENG OR INTERN QUESTION AND ADD ITS OBJECT TO THE ARRAY
            if (memberType.memberType === "Engineer") {
                const res = await inquirer.prompt(questions.engineerQuestions);
                teamMembers.push(new Engineer(res.name, res.id, res.email, res.github));
            } else if (memberType.memberType === "Intern") {
                const res = await inquirer.prompt(questions.internQuestions);
                teamMembers.push(new Intern(res.name, res.id, res.email, res.school));
            } else {
                //IF THEY ARE DONE ADDING THEN FLIP THE VAR AND END THE WHILE
                moreTeam = !moreTeam;
            }
        }
        //GO INTO htmlrenderer.js TO BUILD THE OBJECTS AND THE HTML
        render(teamMembers);
    } catch (err) {
        console.log(err);
    }
}

init();
