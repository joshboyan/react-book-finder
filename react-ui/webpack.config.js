var webpack = require('webpack');

module.exports = {
	entry: __dirname + '/src/index.js',
	output: {
		path: __dirname + "/dist/assets",
		filename: 'bundle.js',
		publicPath: 'assets'
	},
  devtool: "sourcemap",
	devServer: {
		inline: true,
		contentBase: __dirname + '/dist',
		port: 3000
	},
	module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["latest", "stage-0", "react"]
        }
      },
      {
      	test: /\.json$/,
      	exclude: /(node_modules)/,
      	loader: 'json-loader'
      },
      {
      	test: /\.css$/,
      	loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
      	test: /\.scss$/,
      	loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      }
    ]
  }
}