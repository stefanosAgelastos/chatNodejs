/* all taken from docker environment variables */
/* exports.host = "localhost";
exports.database = "chat";
exports.user = "root";
 */


exports.host = process.env.DB_HOST;
exports.database = process.env.DB_NAME;
exports.user = process.env.DB_USER;
exports.password = process.env.DB_PASSWORD;