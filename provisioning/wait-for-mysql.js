// put this at ./provisioning/wait-for-mysql.js

const Knex = require("knex");
const knexConfig = require("../knexfile.js");

const knex = Knex(knexConfig.development);

let retryCounter = 0;
const retryCountMax = 60;

(function retryConnectTillSucceed() {
    console.info(`Checking MySQL connection on port 3306 on `,knexConfig.development.connection.database , '...');
    knex.schema.hasTable('users').then(function (exists) {
        console.log("Found table named users (dummy query): ", exists);
        
        console.info('MySQL connection succeeded!');
        process.exit(0);
    }).catch(err => {
        console.info('MySQL connection failed. Stack trace as follows:');
        console.error(err.stack);
        if (++retryCounter >= retryCountMax) { process.exit(1); }
        else { setTimeout(retryConnectTillSucceed, 1000); }
    });
})();