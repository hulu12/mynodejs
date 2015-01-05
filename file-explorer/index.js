var fs=require('fs'),
	stdin=process.stdin,
	stdout=process.stdout
	stats=[];

fs.readdir(process.cwd(), function(err,zfiles){
	console.log('');
	if(!zfiles.length){
		return console.log(' \033[31m 没有文件\033[39m\n');
	}
	console.log('	选择你要查看的文件：\n');
	function file(i){
		var filename=zfiles[i];

		fs.stat(__dirname+'/'+filename, function(err,stat){
			stats[i]=stat;
			if(stat.isDirectory()){
				console.log(' '+i+'	\033[36m' + filename +'/\033[39m');
			}else{
				console.log(' '+i+'	\033[90m' + filename +'\033[39m');
			}

		});
		if(++i==zfiles.length){
			read();
		}else{
			file(i);
		}
	}

	function read(){
		console.log('');
		stdout.write(' 	\033[33m输入你的选择：\033[39m');
		stdin.resume();
		stdin.setEncoding('utf8');
		stdin.on('data',option);
	
	}

	function option(zxdata){
		var filename=zfiles[Number(zxdata)];
		if(stats[Number(zxdata)].isDirectory()){
			fs.readdir(__dirname+'/'+filename, function(err,files){
				console.log('');
				console.log(filename.length)
			});
			stdout.write('	\033[33m输入你的选择：\033[39m')
		}else{
			stdin.pause();
			fs.readFile(__dirname+'/'+filename, 'utf8',function(err,zxdata){
				console.log('');
				console.log('	\033[90m' + zxdata.replace(/(.*)/g,'	$1') +'\033[39m');
			});
		}
	}
	file(0);
});

