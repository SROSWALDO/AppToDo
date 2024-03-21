const {Pool} = require('pg');
const {dbs} = require('./config')


const db = new Pool({
    user: dbs.user ,
    password: dbs.password,
    host: dbs.host,
    port: dbs.port,
    database: dbs.database
});

module.exports = db;

//conexion a la base de datos