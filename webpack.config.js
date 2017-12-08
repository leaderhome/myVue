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

var baseConfig = {
    entry: {
      app: './src/main.js',
      'babel-polyfill': 'babel-polyfill',
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
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true, //要把script插入到标签里
        minify: { //压缩配置
            removeComments: true, //删除html中的注释代码
            collapseWhitespace: true, //删除html中的空白符
            removeAttributeQuotes: true //删除html元素中属性的引号
        },
        chunksSortMode: 'dependency' //按dependency的顺序引入
      }),
      extractCSS,
      new CommonsChunkPlugin({
        name: ['vendor', 'vendor2'],
        minChunks: Infinity
      })
    ]
}

var buildConfig = {
  env: 'prod'
}
const argv = require('yargs').argv;
console.info(chalk.yellow('======参数: ' + argv._ + '\n'));
if(argv._.length > 0 || process.env.NODE_ENV) {
  buildConfig.env = argv._[0] || process.env.NODE_ENV || buildConfig.env;
  console.info(chalk.cyan('运行环境（prod）:' + buildConfig.env + '\n'));
} else {
  buildConfig.env = 'dev';
  console.info(chalk.cyan('运行环境（dev）:' + buildConfig.env + '\n'));
}

var webpackConfig = null;
if(buildConfig.env == 'dev') { //开发环境
  console.log(chalk.green('===开发环境===\n'));
  const port = '1111';
  webpackConfig = merge(baseConfig, {
    devtool : '#cheap-module-eval-source-map',
    devServer: {
        hot: true,
        inline: true, //实时刷新
        host: "0.0.0.0",
        port: port,
        contentBase: './public',
        historyApiFallback: true,
        disableHostCheck: true, //新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问。
        proxy: { //本地代理
            '/user/*': {
                target: 'http://192.168.33.161:8280',
                secure: false
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //代码热替换
        new OpenBrowserPlugin({
          url: 'http://localhost:' + port
        }),
    ]
  });
  module.exports = webpackConfig;
} else { //线上环境
  console.log(chalk.red('===线上环境===\n'));
  webpackConfig = merge(baseConfig, {
    devtool: '#source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({ //压缩代码
        //   mangle: true, //是否要混淆
        //   compress: { //压缩配置
        //       warnings: false, //不显示警告
        //       drop_debugger: true,
        //       drop_console: true
        //   },
        //   sourceMap: false //是否生成sourceMap文件
        // })
    ]
  });
  //手动启动webpack
  var ora = require('ora');
  var spinner = ora('===开始编辑中...===');
  spinner.start();
  webpack(webpackConfig, function(err, status) {
    spinner.stop();
    if(err) throw err;
    process.stdout.write(status.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');
    console.log(chalk.cyan('===编译完成.==='));
  });
}
