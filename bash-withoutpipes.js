

var cmd = require('./commands.js');
process.stdout.write('prompt > ');

process.stdin.on('data', function(data){
	var rawInput = data.toString().trim(); // remove the new line
	var parsedInput = rawInput.split(" ");
	var command = parsedInput.shift();

	if (command === "pwd"){
		cmd.pwd();
	}
	if (command === "date"){
		cmd.date();
	}
	//thiscomment
	//thiscomment
	if (command === "ls"){
		cmd.ls();
	}
	if (command === "echo"){
		cmd.echo(parsedInput.join(" "));
	}
	if (command === "cat"){
		cmd.cat(parsedInput);
	}
	if (command === "head"){
		cmd.head(parsedInput);
	}
	if (command === "tail"){
		cmd.tail(parsedInput);
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