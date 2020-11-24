const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")//this is directing the folder to place the information from building my team. the path.
const outputPath = path.join(OUTPUT_DIR, "team.html");//this is actually where the information are applying is going INSIDE that folder
​
const render = require("./lib/htmlRenderer");
​
const teamMembers = [];
const idArray = [];
​
function appMenu() {
​
  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: 'input',
        name: 'managerName',
        message: "What is your manager's name?",
        //
      },
      {
        type: "input",
        name: 'managerID',
        message: "What is your manager's id?", 
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: "What is your manager's email?",
      },
      {
        type: 'input',
        name: 'mangerOfficeNumber',
        message: "What is your manager's office number?"
      }
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      //
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }
​//when i create manager it is done then you need to make a team
//line 48 envokes the function create team which is going to list the.
//.then
  function createTeam() {
​
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }
​
  function addEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'engineerName',
        message: "What is your Engineer's name?",
        //
      },
      {
        type: "input",
        name: 'engineerID',
        message: "What is your engineer's id?", 
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: "What is your engineer's email?",
      },
      {
        type: 'input',
        name: 'engineerGithub',
        message: "What is your Engineer's Github username?"
      }
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      const engineer = new engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);//fix later
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      // createTeam();
      // // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      // 
 
      createTeam();
    });
  }
​
  function addIntern() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'internName',
        message: "What is your Intern's name?",
      },
      {
        type: "input",
        name: 'internID',
        message: "What is your Intern's id?", 
      },
      {
        type: 'input',
        name: 'internEmail',
        message: "What is your intern's email?",
      },
      {
        type: 'input',
        name: 'internSchool',
        message: "What school is your Intern attending?"
      }
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE INTERN CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
      // 
​
      createTeam();
    });
  }
​//we are actually writing a file
  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8"); //we need the file name and the data. outpath is path reffering to where we want to place our data
  }
​
  createManager();
​
}
​
​
appMenu();