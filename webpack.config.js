const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	resolve: {
		alias: {
			browserslist: path.resolve(__dirname, 'src/mock/browserslist'),
			"caniuse-lite": path.resolve(__dirname, 'src/mock/caniuse-lite.js')
		}
	},
	node: {
		fs: 'empty'
	}
}