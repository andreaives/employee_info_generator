const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const finalTeam =[]

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

createManager();
//need to prompt the user to choose what type of employee 
//they would like to add if any
function createEmployee(){
inquirer.prompt ([
 {
type: "list",
message: "What is the title of the employee you would like to add?",
choices: ['Engineer', 'Intern', "None"],
name: 'employeeTitle'
}
//.then creating a switch to prompt different questions or no questions 
//depending on the user response
]).then(response =>{
switch (response.employeeTitle) {
 case 'Engineer': createEngineer()
 break;
 case 'Intern': createIntern()
 break;
 default: createTeam();
 
}
 
})
}
//create manager prompt which needs to run first then calls createEmployee
function createManager(){
 inquirer.prompt ([
  {
   message: "What is the managers name?",
   name: 'name'
  },{
   message: 'What is the managers ID?',
   name: 'id'
  },{
   message: 'What is the managers email?',
   name: 'email'
  },{
   message: 'What is the managers office number?',
   name: 'officeNumber'
  }
  //capture the response in manager variable with class of Manager
 ]).then(response => {
  const manager = new Manager(response.name, response.id, response.email, response.officeNumber)
  finalTeam.push(manager)

 })

 createEmployee();
}

//prompts for Engineer
function createEngineer(){
 inquirer.prompt ([
   {
    message: "What is the engineer/'s name?",
    name: 'name'
   },{
    message: "What is the engineer/'s ID?",
    name: "id"
   },{
    message: "What is the engineer/'s email?",
    name: "email"
   },{
    message: "What is the engineer/'s gitHub username?",
    name: "github"
   }
   
 ]).then(response => {
  const engineer = new Engineer(response.name, response.id, response.email, response.github)
  finalTeam.push(engineer)
  createEmployee()
 })
 
}

//intern prompt
function createIntern(){
 inquirer.prompt ([
  {
   message: "What is the intern/'s name?",
   name: 'name'
  },{
   message: "What is the intern/'s ID?",
   name: "id"
  },{
   message: "What is the intern/'s email?",
   name: "email"
  },{
   message: "Where does the intern go to school?",
   name: "school"
  }
 ]).then(response => {
  const intern = new Intern(response.name, response.id, response.email, response.school)
  finalTeam.push(intern)
  createEmployee()
 })
  
}

function createTeam(){
if (fs.existsSync(OUTPUT_DIR)){
 fs.mkdirSync(OUTPUT_DIR)
}
fs.writeFileSync(outputPath, render(finalTeam), "UTF-8")

}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
