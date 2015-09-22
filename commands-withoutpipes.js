var fs = require('fs');
var request = require('request');

function pwd (file) {
	done("Current directory: "+ process.cwd());

}

function date(file) {
	var date = new Date();
	done(date.toString());
	//process.stdout.write("\nprompt >");

}

function ls(file) {
	fs.readdir('.', function(err, files){
		if (err) throw err;
		var result = "";
		files.forEach(function(file){
			result+=file.toString() + "\n";
		})
		done(result);
		//process.stdout.write("prompt >");
	})
}

function echo(file) {
	if (file[0] === "$"){
		var envt = file.slice(1);
		if (process.env[envt]) done(process.env[envt]);	
		else done("Invalid Environment Variable");
	}
	else {
		done(file);
	}
	//process.stdout.write("\nprompt >");
}

function cat (files){
	files.forEach(function(file, idx, array){
		fs.readFile(file, function(err, data){
			if (err) throw err;
			done(data);
			// process.stdout.write(data);
			// if (idx === files.length-1 || files.length === 1){
			// 	process.stdout.write("\nprompt >");
			// }
		})
	})
}

function head (files){
	files.forEach(function(file,idx, array){
		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			var result = "";
			for (var i = 0; i < 5; i++){
				result+=lines[i]+"\n";
			}
			done(result);
		})
	})
}

function tail (files){
	files.forEach(function(file,idx, array){
		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			var result = "";
			for (var i = Math.max(0, lines.length-5); i < lines.length; i++){
				
				result+=lines[i]+"\n";
			}
			done(result);
			// if (idx === files.length-1 || files.length === 1){
			// 	process.stdout.write("\nprompt >");
			// }
		})
	})
}

function sort (file){

		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			lines = lines.sort();
			done(lines.join("\n"));
			// process.stdout.write(lines.join("\n"));
			// process.stdout.write("\nprompt >");
			
		})
	
}

function wc (file){
		fs.readFile(file, 'utf8', function(err, data){
			if (err) throw err;
			var lines = data.split("\n");
			var numLines = lines.length;
			done(numLines.toString());
			// process.stdout.write(numLines.toString());
			// process.stdout.write("\nprompt >");
			
		})
}

function uniq (file){
	fs.readFile(file, 'utf8', function (err, data){
		if (err) throw err;
		var lines = data.split("\n");
		var result = "";
		lines.forEach(function(line, idx, array){
			if (line != array[idx-1]){
				result+=line + "\n";
			}
		});
		done(result);
		// process.stdout.write(result);
		// process.stdout.write("\nprompt >");

	});
}

function curl (url){
	request(url, function (error, response, body){
		if (!error && response.statusCode === 200){
			done(body);
		}
	})

}

function done (output){
	process.stdout.write(output);
	process.stdout.write("\nprompt >");
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