var mysql = require('mysql');

var createDBConnection = function () {
    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'mendes',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'mendes',
            database: 'casadocodigo_nodejs_test'
        });
    }
}

//wrapper
module.exports = function () {
    return createDBConnection;
}