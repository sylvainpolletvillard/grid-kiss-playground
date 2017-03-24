const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: 'build',
		filename: "bundle.js"
	},
	node: {
		fs: "empty"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			}
		]
	},
	resolve: {
		alias: {
			browserslist: path.resolve(__dirname, 'src/mock/browserslist'),
			"caniuse-api": path.resolve(__dirname, 'src/mock/caniuse-api.js'),
			"js-base64": path.resolve(__dirname, 'src/mock/js-base64-pr-46.js')
		}
	}
}