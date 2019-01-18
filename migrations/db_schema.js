exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.string('password');
            table.string('email');
            table.string('token');
        }).createTable('messages', function(table){
            table.increments('id').primary();
            table.string('username');
            table.string('message');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('messages');
};
