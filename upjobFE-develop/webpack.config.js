const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const config = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
              test: /\.svg$/,
              loaders: [
                'babel-loader',
                {
                  loader: 'react-svg-loader',
                  query: {
                    jsx: true
                  }
                },
              ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
        new ExtractTextPlugin(
            "../src/css/[name].css", {
                allChunks: true,
            }
        ),
    ]
};
module.exports = config;