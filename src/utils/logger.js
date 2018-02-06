import { resolve as resolvePath } from 'path';
import winston from 'winston';
import moment from 'moment';

// ////////////////////////////////////////////////////////// IMPORT END
// /////////////////////////////////////////////////////////////////////


const { DEBUG, NODE_ENV } = process.env;
const todayDate = moment().format('DD-MM-YYYY');

const transports = [
  new (winston.transports.Console)({ level: 'info' }),
  new (winston.transports.File)({
    name: 'error-file',
    filename: resolvePath(__dirname, '..', '..', 'storage', 'logs', `error-${todayDate}.json`),
    level: 'error',
  }),
  new (winston.transports.File)({
    name: 'exception-file',
    filename: resolvePath(__dirname, '..', '..', 'storage', 'logs', `exception-${todayDate}.json`),
    level: 'error',
    handleExceptions: true,
    humanReadableUnhandledException: true,
  }),
];

if (DEBUG === 'true') {
  transports.push(new (winston.transports.Console)({
    name: 'debug',
    level: 'debug',
    colorize: true,
  }));
}

const logger = new (winston.Logger)({
  transports,
});

// In testing mode i want to see only errors +
if (NODE_ENV === 'testing') {
  logger.configure({
    level: 'error',
    transports: [
      new (winston.transports.Console)({ level: 'error' }),
    ],
  });
}


// /////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////// EXPORT DEFAULT
export default logger;
