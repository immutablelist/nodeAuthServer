import chalk from 'chalk';
import bytes from 'bytes';
import os from 'os';

// ////////////////////////////////////////////////////////// IMPORT END
// /////////////////////////////////////////////////////////////////////


console.group(chalk.hex('#b71c1c')(os.cpus()[0].model));
console.log(`TOTAL RAM: ${chalk.hex('#00E676')(`${bytes(os.totalmem())}`)}`);
console.log(`FREE RAM: ${chalk.hex('#00E676')(`${bytes(os.freemem())}`)}`);
console.log(`HOSTNAME: ${chalk.hex('#00E676')(`${os.hostname()}`)}`);
console.groupEnd();
