const {createLogger,transports,format} = require('winston')

// logging  function ///

const dataLogger = createLogger({
    transports:[
        new transports.File({
            filename:'data.Log',
            level:'info',
            format: format.combine(format.timestamp(),format.json())   
        }),
        new transports.File({
            filename:'dataError.log',
            level:'error',
            format: format.combine(format.timestamp(),format.json())  
        })
    ]
})

module.exports = {dataLogger}