const forge = require("node-forge");
const pki = forge.pki;

module.exports = {};

module.exports.generateCert = function (status) {
	if (!status) {
		var status = function () {}; // no-op status
	}
	return new Promise(function (resolve, reject) {
		status(0); // generating keypairs
		pki.rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keys) {
			status(1); // creating cert
			var cert = pki.createCertificate();
			cert.publicKey = keys.publicKey;
			cert.serialNumber = '01';
			cert.validity.notBefore = new Date();
			cert.validity.notAfter = new Date();
			cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
			var attrs = [{
			  name: 'commonName',
			  value: 'mojang.com'
			}, {
			  name: 'countryName',
			  value: 'US'
			}, {
			  shortName: 'ST',
			  value: 'Amazon'
			}, {
			  name: 'organizationName',
			  value: 'Amazon'
			}, {
			  shortName: 'OU',
			  value: 'Server CA 1B'
			}];
			cert.setSubject(attrs);
			cert.setIssuer(attrs);
			cert.setExtensions([{
			  name: 'basicConstraints',
			  cA: true
			}, {
			  name: 'subjectAltName',
			  altNames: [{
				type: 2,
				value: 'mojang.com'
			  }, {
				type: 2,
				value: '*.mojang.com'
			  }]
			}, {
			  name: 'subjectKeyIdentifier'
			}]);
			status(2); // signing cert
			cert.sign(keys.privateKey);
			resolve(cert);
		});
	});
};

module.exports.certToPem = function (cert) {
	return new Promise(function (resolve, reject) {
		resolve(pki.certificateToPem(cert));
	});
}

module.exports.pemToDer = function (pem) {
	return new Promise(function (resolve, reject) {
		resolve(pki.pemToDer(pem));
	});
}
