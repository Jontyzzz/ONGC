const mysql = require("mysql2/promise"); // Import the promise-based version
const loggers = require('../Backend/loggers/loggers');
const { Console } = require("winston/lib/winston/transports");

class Database {
    constructor() { }

    async runQuery(query = "", parameters = []) {
        let databaseConnection = await mysql.createConnection({
            host: '103.195.185.168',
            user: 'indiscpx_BLVL',
            password: "indiscpx_BLVL@123",
            database: 'indiscpx_BLVL'
        });

        loggers.dataLogger.log('info', `Connection created`);

        try {
            const [rows, fields] = await databaseConnection.execute(query, parameters);
            loggers.dataLogger.log('info', `Query is ${query} and parameters are ${parameters}`);
            return rows;
        } catch (err) {
            loggers.dataLogger.log('error', err);
            throw err;
        } finally {
            try {
                await databaseConnection.end();
                loggers.dataLogger.log('info', `Connection Closed`);
            } catch (err) {
                loggers.dataLogger.log('error', `Error while closing connection ${err}`);
            }
        }
    }
}
module.exports = Database;


// // Example usage with async/await
// (async () => {
//     try {
//         const result = await db.runQuery(`SELECT * FROM \`ParameterColln\` WHERE date = ?`, ["2024-01-06"]);
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// })();

