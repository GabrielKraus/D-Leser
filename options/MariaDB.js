const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'your_database_user',
        password: '',
        database: 'mi_tienda'
    }
});

module.exports = { knex }
