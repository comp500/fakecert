var test = require("./gencert.js");

var cert = test.generateCert({
	orgName: "Hooli",
	commonName: "hooli.xyz",
	SAN: [
		"hooli.xyz",
		"*.hooli.xyz"
	]
}, function (status) {
	console.log(status);
});

console.log(test.certToPem(cert));
