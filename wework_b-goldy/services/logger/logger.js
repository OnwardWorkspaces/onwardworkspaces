var logger = require('perfect-logger')

/****************************
*  logger configuration            *
****************************/
logger.initialize('influence-eye-service', {
    logLevelFile: 4,                    // Log level for file
    logLevelConsole: -1,                 // Log level for STDOUT/STDERR
    logDirectory: 'logs/',              // Log directory
    customBannerHeaders: 'influence-eye-service-logs',  // Custom Log Banner,
    timezone: process.env.TIMEZONE
});

module.exports = logger
