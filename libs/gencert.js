const forge = require("node-forge");
const pki = forge.pki;

module.exports = {};

module.exports.generatePEM = function () {
	return new Promise(function (resolve, reject) {
		pki.rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {

		});
	});
};
