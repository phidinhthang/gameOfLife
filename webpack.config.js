var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src') + '/index.js',
	output: {
		path: path.resolve(__dirname, 'public') + '/app',
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					presets: ['react','es2015','stage-2']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',

			}
		],
	}
}