exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('table_name').insert([
        { id: 1, username: 'sa', password: '$2b$10$WR6ZhsqtkVMKNOB5LBcNn.0Ubc9WpbpFQLgo0NJ2ZYSpwWRVjgBHi', email: 'superadmin1@domain.com', token: null }
      ]);
    });
};
exports.seed = function (knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return knex('table_name').insert([
        { id: 1, username: 'Marie', message: 'hello', created_at: '2018-05-29 22:17:00'},
        { id: 2, username: 'albert', message: 'hello', created_at: '2018-05-29 22:17:00'},
        { id: 3, username: 'sa', message: 'hey!', created_at: '2018-05-29 22:17:06'},
        { id: 4, username: 'dummy', message: 'hey guys!', created_at: '2018-05-29 22:17:00'},
        { id: 5, username: 'dummy', message: 'nice chat app!', created_at: '2018-05-29 22:17:00'}
      ]);
    });
};