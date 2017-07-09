var test = require("./gencert.js");
var install = require("./install.js");

/*test.generateCert("Hooli", ["hooli.xyz", "*.hooli.xyz"], function (status) {
	console.log(status);
}).then(function (cert) {
	test.certToPem(cert).then(function (pem) {
		console.log(pem);
		test.pemToDer(pem).then(function (der) {
			console.log(der);
		});
	});
	test.keyToPem(cert.signingKey).then(function (key) {
		console.log(key);
	});
});*/

test.generateCert("Hooli", ["hooli.xyz", "*.hooli.xyz"], function (status) {
	console.log(status);
}).then(function (cert) {
	test.certToPem(cert).then(function (pem) {
		install(pem).catch(function () {
			console.log("wasn't installed");
		});
	});
});

