import chalk from 'chalk';

// ////////////////////////////////////////////////////////// IMPORT END
// /////////////////////////////////////////////////////////////////////


const { NODE_ENV, HOSTURLDEV, PORT } = process.env;
const mongoInstance = nodeEnvSwitcher(NODE_ENV, 'development', 'DOCKER', 'MLAB');
const secret = nodeEnvSwitcher(
  NODE_ENV,
  'development',
  process.env.DEV_SECRET,
  'Production Key'
);

const infoLogger = (port) => {
  if (process.env.NODE_ENV !== 'test') {
    console.group(chalk.bold.yellow(`      NODE ENV : ------------------------`));
    console.info(`    NODE_ENV : ${chalk.bold.hex('#00E676')(NODE_ENV)}`);
    console.info(`  HOSTURLDEV : ${chalk.bold.hex('#00E676')(HOSTURLDEV)}`);
    console.info(`      SECRET : ${chalk.bold.hex('#00E676')(secret)}`);
    console.info(`        PORT : ${chalk.bold.hex('#00E676')(PORT || port)}`);
    console.info(`    DATABASE : ${chalk.bold.hex('#00E676')(mongoInstance)}`);
    console.groupEnd();
  }
};


function nodeEnvSwitcher(environment, condition, ...output) {
  if (environment === condition) return output[0];

  return output[1];
}

// /////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////// EXPORT DEFAULT
export default infoLogger;
