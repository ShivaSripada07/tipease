const fs = require('fs');


function logReq(filename) {
    return (req, res, next) => {
        const logEntry = `${new Date().toISOString()} : ${req.ip} : ${req.method} : ${req.path}\n`;
        fs.appendFile(filename, logEntry, (err) => {
            if (err) {
                console.error(`Failed to write to log file: ${err}`);
            }
        });
        next(); 
    };
}

module.exports = { logReq };
