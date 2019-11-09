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
const buildDir = path.resolve(__dirname, "../build/");

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
      .filter(employee => employee instanceof Manager)
      .map(employee => {
        let template = managerTemplate;
        for (const key in employee) {
          template = replacePlaceholder(template, key, employee[key]);
        }
        return template;
      })
      .join("")
  );

// Render Engineer Templates
engineerHtml.push(
  employees
  .filter(employee => employee instanceof Engineer)
  .map(employee => {
    let template = engineerTemplate;
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
      let template = internTemplate;
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
  const regex = new RegExp("{{ " + target + " }}", "gm");
  const newTemplate = template.replace(regex, value);
  return newTemplate;
}

module.exports = render;
