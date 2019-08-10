exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, username: 'sa', password: '$2b$10$sGoHreLerKoJgFcOU32rg.nvQImVbt7SmUYzRWvg/ulBu7aJDUb22', email: 'superadmin1@domain.com', token: null },
        { id: 2, username: 'dummy', password: '$2b$10$cTXiLLfyocYD9fKkrIWUEOyrEV0KrBAJPIeeEpid4WBEdtxE5tELm', email: 'dm@domain.com', token: null }
      ]);
    });
};
exports.seed = function (knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return knex('messages').insert([
        { id: 1, username: 'Marie', message: 'hello', created_at: '2018-05-29 22:17:00'},
        { id: 2, username: 'albert', message: 'hello', created_at: '2018-05-29 22:17:00'},
        { id: 3, username: 'sa', message: 'hey!', created_at: '2018-05-29 22:17:06'},
        { id: 4, username: 'dummy', message: 'hey guys!', created_at: '2018-05-29 22:17:00'},
        { id: 5, username: 'dummy', message: 'nice chat app!', created_at: '2018-05-29 22:17:00'}
      ]);
    });
};