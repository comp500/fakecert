const tmp = require("tmp");
const fs = require("fs");
const spawn = require('child_process').spawn;

module.exports = {};

module.exports.run = function (cert) {
	return new Promise(function (resolve, reject) {
		tmp.file({ postfix: '.crt', keep: true }, function (err, path, fd, cleanup) {
			if (err) {
				reject(err);
			}
			fs.writeFile(fd, cert, function (error) {
				if (error) {
					reject(error);
				}
				fs.close(fd, function () {
					var spawnImport = spawn("rundll32", ["cryptext.dll,CryptExtOpenCER", path]);
					spawnImport.on("close", function (code, signal) {
						fs.unlink(path); // Delete file, don't check for failure
						if (code == 0) { // Won't reject on failure
							resolve();
						} else {
							reject();
						}
					});
				});
			});
		});
	});
};
