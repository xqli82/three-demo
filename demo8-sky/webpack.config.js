const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development', //or production
    entry: './src/main.js',
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader',
                options:{
                    limit:5*1024,
                    name:'img/[name][hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}