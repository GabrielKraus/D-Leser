import logs from 'log4js';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logs.configure({
    appenders: {
        terminal: {type: 'console'},
        warnFile: {type: 'file', filename: __dirname + '../../../../logs/warn.log'},
        errorFile: {type: 'file', filename: __dirname + '../../../../logs/error.log'},
        loggerInfo: {type: 'logLevelFilter', appender: 'terminal', level: 'info'},
        loggerWarn: {type: 'logLevelFilter', appender: 'warnFile', level: 'warn', maxLevel:'warn'},
        loggerError: {type: 'logLevelFilter', appender: 'errorFile', level: 'error', maxLevel: 'error'}
    },
    categories: {
        default: {appenders: ['terminal', 'loggerWarn', 'loggerError'], level: 'info'}
    }
})

const loggers = logs.getLogger();

export default loggers;