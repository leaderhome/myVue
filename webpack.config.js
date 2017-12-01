var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var chalk = require('chalk');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css独立打包
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //抽出公共JS
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var statics = 'static/';
var extractCSS = new ExtractTextPlugin(statics + 'css/[name].css?[contenthash]');

module.exports = {
    entry: {
      app: './src/main.js',
      vendor: ['vue','vuex','vue-router','axios','@/commonjs/zepto.min.js']
    }, //值可以是字符串、数组或对象
    output: {
        path: path.join(__dirname, './dist'), //Webpack结果存储
        publicPath : '/',
        filename: statics + 'js/[name].[hash:8].js',
        chunkFilename: statics + "js/chunk/[name].[chunkHash:8].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        	'vue': 'vue/dist/vue.js', //不加会报runtime-only错误
          '@': path.join(__dirname,'./src') //掉用模板时间用到
		    }
    },
    module: {
        rules: [
            {test: /\.vue$/,loader: 'vue-loader'},
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {test: /\.scss|\.css$/,use: ExtractTextPlugin.extract({fallback: 'style-loader?minimize',use: ['css-loader?minimize','sass-loader?minimize','postcss-loader?minimize']})},
            {test: /\.jpg$|\.jpeg$|\.gif$|\.png$/, loader: 'url-loader?limit=1024&name=static/images/[name].[hash:8].[ext]'},
            {test: /\.svg$|\.woff$|\.ttf$|\.eot$/, loader: 'url-loader?limit=1024&name=static/fonts/[name].[hash:8].[ext]'},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    devServer: {
        hot: true,
        inline: true, //实时刷新
        host: "0.0.0.0",
        port: 1111,
        contentBase: './public',
        historyApiFallback: true,
    },
    devtool: '#eval-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true //要把script插入到标签里
      }),
      new OpenBrowserPlugin({
        url: 'http://localhost:1111'
      }),
      new webpack.HotModuleReplacementPlugin(), //代码热替换
      extractCSS,
      new CommonsChunkPlugin({
        name: ['vendor', 'vendor2'],
        minChunks: Infinity
      })
    ]
}
