var credentials = require("./database_credentials/local_credentials.js");

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: credentials.host,
      database: credentials.database,
      user:     credentials.user,
      password: credentials.password
    }
  }

};
