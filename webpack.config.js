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
			"caniuse-api": path.resolve(__dirname, 'src/mock/caniuse-api.js')
		}
	}
}