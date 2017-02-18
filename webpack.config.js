const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: 'build',
		filename: "bundle.js"
	},
	node: {
		fs: "empty"
	},
	plugins: [
		new BabiliPlugin()
	],
	resolve: {
		alias: {
			browserslist: path.resolve(__dirname, 'src/mock/browserslist'),
			"caniuse-api": path.resolve(__dirname, 'src/mock/caniuse-api.js')
		}
	}
}