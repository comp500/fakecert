const tmp = require("tmp");

module.exports = {};

module.exports.run = function (cert) {
	return new Promise(function (resolve, reject) {
		tmp.file({ postfix: '.crt' }, function (err, path, fd) {
			fs.writeFileSync(path, cert);
		});
	});
};
