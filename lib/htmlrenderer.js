// Node Modules
const fs = require("fs");
const path = require("path");
const util = require("util");

// Constructors
const Manager = require("./constructors/Manager");
const Engineer = require("./constructors/Engineer");
const Intern = require("./constructors/Intern");

// File paths
// Absolute path for templates directory
const templatesDir = path.resolve(__dirname, "../templates");
// Absolute path for build directory
const buildDir = path.resolve(__dirname, "../output/");

// Promisify Modules
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

/**
 * Render and return HTML template
 * @param {array} employees - Array of employees
 */

async function render(employees) {
  const managerHtml = [];
  const engineerHtml = [];
  const internHtml = [];

  // Request all html templates and store them in the appropriate variables
  const [
    managerTemplate,
    internTemplate,
    engineerTemplate,
    mainTemplate
  ] = await Promise.all([
    readFile(path.resolve(templatesDir, "manager.html"), "utf8"),
    readFile(path.resolve(templatesDir, "intern.html"), "utf8"),
    readFile(path.resolve(templatesDir, "engineer.html"), "utf8"),
    readFile(path.resolve(templatesDir, "main.html"), "utf8")
  ]);

  // Render Manager Templates
  managerHtml.push(
    employees
      //GET THE ONE MANAGER OUT OF THE ARRAY
      .filter(employee => employee instanceof Manager)
      .map(employee => {
        //USE A COPY OF THE HTML INCASE WE NEED A CLEAN COPY LATER
        let template = managerTemplate;
        //SENDING THE MANAGER INTO THE RENDERING FUNCTION TO BUILD ITS HTML SECTION
        //THE HTML GOES INTO THE MANAGE HTML ARRAY
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );

  // Render Engineer Templates
  //EACH ENGINEER WILL BE PROCESSED TO BUILD AND HTML SECTION
  //THAT RENDERED HTML WILL BE PUT INTO THE ENG HTML ARRAY
  engineerHtml.push(
    employees
      .filter(employee => employee instanceof Engineer)
      .map(employee => {
        //EACH PASS USES A COPY OF THE HTML TEMPLATE SO WE DO NOT DESTROY THE ORIG
        let template = engineerTemplate;
        //SENDING EACH ENG INTO THE RENDERING FUNCTION TO BUILD ITS HTML SECTION
        //THE HTML GOES INTO THE ENG HTML ARRAY
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
      );
      
      // Render Intern Templates
      internHtml.push(
        employees
        .filter(employee => employee instanceof Intern)
        .map(employee => {
          //EACH PASS USES A COPY OF THE HTML TEMPLATE SO WE DO NOT DESTROY THE ORIG
          let template = internTemplate;
          //SENDING EACH INTERN INTO THE RENDERING FUNCTION TO BUILD ITS HTML SECTION
          //THE HTML GOES INTO THE INTERN HTML ARRAY
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );

  // If the build directory does not exist
  if (!fs.existsSync(buildDir)) {
    // Build "build" directory
    fs.mkdirSync(buildDir);
  }

  //PASSING EACH OF OUR HTML ARRAYS (MANAGER, ENGINEER AND INTERN) INTO THE HTML RENDERING FUNCTION
  //TO ADD THEM TO THE MAIN HTML. I DO NOT NEED A COPY OF THE MAIN TEMPLATE, BUT SAFER
  let newMainTemplate = mainTemplate;
  newMainTemplate = await replacePlaceholder(newMainTemplate, "manager", managerHtml.join(""));
  newMainTemplate = await replacePlaceholder(newMainTemplate, "engineer", engineerHtml.join(""));
  newMainTemplate = await replacePlaceholder(newMainTemplate, "intern", internHtml.join(""));

  // Create our HTML file
  await writeFile(
    path.resolve(buildDir, "index.html"), newMainTemplate
  );
}

/**
 * Replace placeholder in supplied HTML template
 * @param {string} template - HTML template string
 * @param {string} target - Target in template
 * @param {any} value - Value to replace target with
 */
function replacePlaceholder(template, target, value) {
  //BUILDING THE REGEXP STRING THAT WE WILL BE REPLACING IN EACH TEMPLATE
  const regex = new RegExp("{{ " + target + " }}", "gm");
  //DOING THE REPLACEMENT
  const newTemplate = template.replace(regex, value);
  //RETURNING OUR COMPLETED HTML
  return newTemplate;
}

module.exports = render;
