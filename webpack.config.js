const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js"
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
	},
	node: {
		fs: 'empty'
	}
}