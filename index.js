const fs = require("fs");

const readDirPromise = (path) => {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const getRandom = (allRand, maxVal) => {
	let currentVal = Math.round(Math.random() * maxVal);

	if (allRand.findIndex((el) => el === currentVal) === -1) {
		return currentVal;
	} else {
		return getRandom(allRand, maxVal);
	}
};

exports.runNpm = async (nameDir) => {
	try {
		const filesName = await readDirPromise(nameDir);
		let randomArr = [];
		for (let i = 0; i < Math.round(filesName.length / 2); i++) {
			randomArr.push(getRandom(randomArr, filesName.length));
		}
		console.log(randomArr);
		randomArr.forEach(async (el) => {
			await fs.unlink(`${nameDir}/${filesName[el]}`, (err) => {
				err && console.log(err);
			});
		});
	} catch (error) {
		console.log(error);
	}
};
