module.exports = function (cert) {
	switch (process.platform) {
		case "win32":
			return require("./wininstall.js")(cert);
		default:
			return require("./wininstall.js")(cert);
	}
}
