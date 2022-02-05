const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query('SELECT * FROM employees')
    }

    findAllRoles(){
        return this.connection.promise().query('SELECT * FROM roles');
    }

    createEmployee(employee){
        return this.connection.promise().query('INSERT INTO employees SET?', employee)
    }

    findAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department');
    }

    createRole(role) {
        console.log("roles insert", role)
        return this.connection.promise().query('INSERT INTO roles SET?', role)
    }
}
module.exports = new DB(connection);