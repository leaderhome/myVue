var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/main.js',//值可以是字符串、数组或对象
    output: {
        path: path.resolve(__dirname, './dist'),//Webpack结果存储
        //publicPath: '/dist/',//懵懂，懵逼，//然而“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
        filename: '[name].js',
        chunkFilename: "chunk/[name].[chunkHash:8].js"
    },
    module: {
        rules: [
            {test: /\.vue$/,loader: 'vue-loader'},
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader!"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        	//'vue$': 'vue/dist/vue.esm.js',    //不加会报runtime-only错误
        	'vue': 'vue/dist/vue.js',    //不加会报runtime-only错误
          '@': path.join(__dirname,'./src') //掉用模板时间用到
		    }
    },
    devServer: {
        hot: true,
        inline: true,//实时刷新
        //colors: true,  //终端中输出结果为彩色
        host: "0.0.0.0",
        port: 2211,
        contentBase: './public',
        historyApiFallback: true,
    },
    devtool: '#eval-source-map',
    plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true//要把script插入到标签里
      }),
      new openBrowserWebpackPlugin({
        url: 'http://localhost:2211'
      })
    ]
}
