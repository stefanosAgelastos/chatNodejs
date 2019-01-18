var credentials = require("./database_credentials/local_credentials.js");

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || { user: 'me', database: 'my_app' }
  }

};
