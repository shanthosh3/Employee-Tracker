const inquirer = require('inquirer');
const db = require('./db');
const mysql = require('mysql2');

start()

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option',
            choices: [
                'View All Employees',
                'View Roles',
                'View Department',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Quit'
            ],
        }


    ]).then((answer) => {
        console.log("ANSWERSS",answer.choice)
        switch (answer.choice) {

            case 'View All Employees':
                viewEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Department':
                viewDepartments();
                break;
            case 'Add Employee':
                newEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                Quit();
                break;
        }
    })
}


function viewEmployees() {

    db.findAllEmployees()
    .then(([rows])=>{
        let employees = rows;

        console.table(employees)
    })
      .then(()=> start())
};

function viewRoles() {
    db.findAllRoles()
    .then(([rows])=>{
        let roles = rows;
        console.table(roles)
    })
    .then(()=> start())
}

function viewDepartments() {
    db.findAllDepartments()
    .then(([rows]) =>{
        let departments = rows;
        console.table(departments)
    })
    .then(() => start())
}

function newEmployee() {
    inquirer.prompt ([
        {
        type: 'input',
        message: 'Enter employee first name.',
        name: 'FirstName'
        },
        {
            type: 'input',
            message: 'Enter employee last name.',
            name: 'LastName'
        }, 
    ])
    .then(function (response) {
        let firstName = response.FirstName;
        let lastName = response.LastName;

        db.findAllRoles()
        .then(([rows])=>{
            let roles = rows;

            const roleChoices = roles.map(({id, title})=>({
                name: title,
                value: id
            }));

            inquirer.prompt([
                {
                type:"list",
                name:"roleId",
                message: "What is the employee's role?",
                choices: roleChoices,
                }
            ])
            .then(res =>{
                let roleId = res.roleId

                let employee = {
                    roles_id: roleId,
                    first_name: firstName,
                    last_name: lastName,
                }

                db.createEmployee(employee)
            })
            .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
            .then(()=> start())
        })

    })
}

function addRole(){
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;

        const departmentChoices = departments.map(({id, name})=>({
            name: name,
            value: id
        }));
    inquirer.prompt ([
        {
            type: 'input',
            name: "title",
            message: 'Enter new role',
        
        },
        {
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type:'list',
            name: 'department_id',
            message: 'What department is the role belongs to?', 
            choices: departmentChoices,
        }
    ])
    .then(function(response) {
        let newRole = response
        console.log("newRole", newRole);
    
        db.createRole(newRole)
        .then(() => console.log(`Added ${newRole.title} to the database`))
        .then(()=> start())
        
    })
})
}



function Quit() {
    console.log('Goodbye!');
    process.exit();
    
}
