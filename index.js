const fse = require('fs-extra');
const gitNode = require('simple-git')();
const path = require('path');
const testPath = './data/';

const workingPath = path.join(__dirname, '/data/');
const size = 500;

fse.readdir(testPath)
.then((files) => {
	console.log(`Source Length: ${files.length}`);
	let dirFiles = files.map(x => `${testPath}${x}`);
	console.log(`Mapped Length: ${dirFiles.length}`);
	let workArr = [];
	while (dirFiles.length > 0) {
		workArr.push(dirFiles.splice(0,size));
	}
	console.log(`workArr Length: ${workArr.length}`);
	console.log(`Final Mapped Length: ${dirFiles.length}`);
	let count = 0;
	workArr.forEach((arr) => {
		count++;
		gitNode
		.add(arr)
		.commit(`repo build commit ${count}`, (err, res) => {
			if (err) console.log(err)
		})
	});
	console.log('working...');
})
.catch(err => console.log(err))