const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['env']
					}
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