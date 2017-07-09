var test = require("./gencert.js");

var cert = test.generateCert("Hooli", ["hooli.xyz", "*.hooli.xyz"], function (status) {
	console.log(status);
}).then(function (cert) {
	test.certToPem(cert).then(function (pem) {
		console.log(pem);
	});
});


