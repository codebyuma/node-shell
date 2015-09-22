
// test
// test
var cmd = require('./commands.js');
process.stdout.write('prompt > ');

process.stdin.on('data', function(data){
	var rawInput = data.toString().trim(); // remove the new line
	var checkPipe = rawInput.split(/\s*\|\s*/g);
	// console.log (checkPipe);
	// [["cat bash.js"] , ["head"]]

	checkPipe.forEach (function (string, idx, array){
		array[idx] = string.split(" ");
	})
	// console.log (checkPipe);
	// [ [["cat"], ["bash.js"]], ["head"]]

	// var parsedInput = rawInput.split(" ");
	var command = checkPipe[0].shift();
	// // [ [["bash.js"]], ["head"]]
	// console.log(command);
	// console.log(checkPipe[0]);

	if (command === "pwd"){
		cmd.pwd();
	}
	if (command === "date"){
		cmd.date();
	}
	if (command === "ls"){
		cmd.ls();
	}
	if (command === "echo"){
		cmd.echo(checkPipe[0][0]);
	}
	if (command === "cat"){
		cmd.cat(null, checkPipe);
	}
	if (command === "head"){
		cmd.head(null, checkPipe);
	}
	if (command === "tail"){
		cmd.tail(null, checkPipe);
	}
	if (command === "sort"){
		cmd.sort(parsedInput[0]);
	}
	if (command === "wc"){
		cmd.wc(parsedInput[0]);
	}
	if (command === "uniq"){
		cmd.uniq(parsedInput[0]);
	}	
	if (command === "curl"){
		cmd.curl(parsedInput[0]);
	}
});