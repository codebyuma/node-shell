var fs = require('fs');
var request = require('request');

function pwd (stdin, file) {
	done(stdin, "Current directory: "+ process.cwd());

}

function date(stdin, file) {
	var date = new Date();
	done(stdin, date.toString());
	//process.stdout.write("\nprompt >");

}

function ls(stdin, file) {
	fs.readdir('.', function(err, files){
		if (err) throw err;
		var result = "";
		files.forEach(function(file){
			result+=file.toString() + "\n";
		})
		done(stdin, result);
		//process.stdout.write("prompt >");
	})
}

function echo(stdin, file) {
	if (file[0] === "$"){
		var envt = file.slice(1);
		if (process.env[envt]) done(stdin, process.env[envt]);	
		else done(stdin, "Invalid Environment Variable");
	}
	else {
		done(stdin, file);
	}
	//process.stdout.write("\nprompt >");
}

function cat (stdin, files){
	if (stdin) {
		var fileList = stdin;
		
	}

	else {
		var fileList = files[0];

		fileList.forEach(function(file, idx, array){
			fs.readFile(file, 'utf8', function(err, data){
				if (err) throw err;
				done(files[1], data);
				// process.stdout.write(data);
				// if (idx === files.length-1 || files.length === 1){
				// 	process.stdout.write("\nprompt >");
				// }
			})
		})
		}
}

function head (stdin, files){
	if (stdin) {
		var fileList = stdin;
		console.log(fileList);
		var lines = fileList.split("\n");
		var result = "";
		for (var i = 0; i < 5; i++){
			result+=lines[i]+"\n";
		}
		done(null, result);
	}

	else {
		var fileList = files[0];
	

		fileList.forEach(function(file,idx, array){
			fs.readFile(file, 'utf8', function(err, data){
				if (err) throw err;
				var lines = data.split("\n");
				var result = "";
				for (var i = 0; i < 5; i++){
					result+=lines[i]+"\n";
				}
				done(files[1], result);
			})
		})
	}
}

function tail (stdin, files){
	files.forEach(function(file,idx, array){
		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			var result = "";
			for (var i = Math.max(0, lines.length-5); i < lines.length; i++){
				
				result+=lines[i]+"\n";
			}
			done(stdin, result);
			// if (idx === files.length-1 || files.length === 1){
			// 	process.stdout.write("\nprompt >");
			// }
		})
	})
}

function sort (stdin, file){

		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			lines = lines.sort();
			done(stdin, lines.join("\n"));
			// process.stdout.write(lines.join("\n"));
			// process.stdout.write("\nprompt >");
			
		})
	
}

function wc (stdin, file){
		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			var numLines = lines.length;
			done(stdin, numLines.toString());
			// process.stdout.write(numLines.toString());
			// process.stdout.write("\nprompt >");
			
		})
}

function uniq (stdin, file){
	fs.readFile(file, 'utf8', function (err, data){
		if (err) throw err;
		var lines = data.split("\n");
		var result = "";
		lines.forEach(function(line, idx, array){
			if (line != array[idx-1]){
				result+=line + "\n";
			}
		});
		done(stdin,result);
		// process.stdout.write(result);
		// process.stdout.write("\nprompt >");

	});
}

function curl (stdin, url){
	request(url, function (error, response, body){
		if (!error && response.statusCode === 200){
			done(stdin,body);
		}
	})

}

function done (stdin, output){
	if (stdin){
		// do something
		// console.log(typeof stdin);
		// console.log(stdin);
		//stdin(null, output);
		eval(stdin[0])(output);


	}
	else {
		process.stdout.write(output);
		process.stdout.write("\nprompt >");
	}
}

module.exports.pwd = pwd;
module.exports.date = date;
module.exports.ls = ls;
module.exports.echo = echo;
module.exports.cat = cat;
module.exports.head = head;
module.exports.tail = tail;
module.exports.sort = sort;
module.exports.wc = wc;
module.exports.uniq = uniq;
module.exports.curl = curl;