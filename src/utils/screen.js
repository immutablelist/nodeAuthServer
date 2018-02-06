import prettyjson from 'prettyjson';

// ////////////////////////////////////////////////////////// IMPORT END
// /////////////////////////////////////////////////////////////////////

const colorOptions = {
	keysColor: 'cyan',
	dashColor: 'magenta',
	stringColor: 'white',
	numberColor: 'yellow',
};

// /////////////////////////////////////////////////////////////// WRITE
export const writeScreen = (data, mode) => {
	let output = data;

	if (mode === 'json') {
		output = JSON.stringify(data, null, 2);
	}
	else if (mode === 'pretty') {
		output = prettyjson.render(data, colorOptions);
	}

	console.log(output);
};

// /////////////////////////////////////////////////////////////// CLEAR
export const clearScreen = () => process.stdout.write('\x1Bc');
