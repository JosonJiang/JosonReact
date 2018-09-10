let path = require('path');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let HtmlWebpackPlugin=require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, './src/');
const SRCRIPT_PATH = path.resolve(ROOT_PATH, './script/');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');


module.exports = {

    entry: { index: [path.resolve(SRC_PATH, 'js/index.js')] },

    output: {

//        chunkFilename: './script/[name].[hash:5].js',
//        publicPath: '/', //编译好的文件，在服务器的路径,域名会自动添加到前面

        path: path.join(BUILD_PATH),//编译到当前目录
        filename: '[name].min.js'//'[name].js' 编译后的文件名字

    },


    devtool: 'source-map',
    module: {

        //模块加载器配置

        loaders: [

            {
            test: /\.less$/,//正则匹配拓展名为···的文件
            include: path.join(__dirname, './src/less'),//需要被加载文件的路径
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,//这个文件除外
            loader: 'html-loader'
        },{
            test: /\.js?$/,
            include: path.join(__dirname, './src/js'),
            loader: 'babel-loader'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=srclication/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },{
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192' // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
        }

        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        publicPath: path.join(BUILD_PATH),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true

    },

    plugins: [


        /*模板的路径在根目录 使用 path.resolve(ROOT_PATH, 'index.html')*/
        new HtmlWebpackPlugin({
            title:'Joson用于生成的HTML文件的标题',
            xhtml : "用于生成的HTML文件的标题",
            template:path.resolve(ROOT_PATH, 'index.html'),
            filename:'index.html',

            showErrors: true,                                                        //如果传入true（默认），错误信息将写入html页面。
            favicon :"",                                                             //给定的图标路径，可将其添加到输出html中。
            inject: 'body',                                                          //true | ‘head’ | ‘body’ | false 。把所有产出文件注入到给定的 template 或templateContent。当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内。
            chunks: ['index']                                                        //需要引入的chunk，不配置就会引入所有页面的资源
        }),

        /*模板的路径在 SRC 目录 使用 path.resolve(SRC_PATH, 'index.html')*/
        new HtmlWebpackPlugin({
            title:'Joson用于生成的HTML文件的标题',
            filename: 'index.htm',                                                   //用于生成的HTML文件的名称，默认是index.html.可以在这里指定子目录（例如:assets/admin.html）
            template: path.resolve(SRC_PATH, 'index.html'),                          //模板的路径。支持加载器，例如 html!./index.html。

            showErrors: true,                                                        //如果传入true（默认），错误信息将写入html页面。
            favicon :path.resolve(SRC_PATH,"./Images/favorite.png"),                 //给定的图标路径，可将其添加到输出html中。
            inject: 'body',                                                          //true | ‘head’ | ‘body’ | false 。把所有产出文件注入到给定的 template 或templateContent。当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内。
            chunks: ['index']                                                        //需要引入的chunk，不配置就会引入所有页面的资源
        }),


        // 使用browser-sync实时刷新页面
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8000,

            server: {
                baseDir: [path.join(BUILD_PATH)] ,
                index: 'index.htm'
            }   //会默认访问./build/index.html
        })

    ]
};

console.log('Listening at http://localhost:8000/');
console.log('+++++++++++++++++++++++++++++++++++');
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
console.log('__dirname:'+__dirname+"---"+path.join(__dirname, 'build'));
console.log('ROOT_PATH:'+ROOT_PATH);
console.log('SRC_PATH:'+SRC_PATH);
console.log('BUILD_PATH:'+BUILD_PATH);
console.log('path.join:'+path.join(__dirname, 'build'));
console.log('path.join:'+path.join(__dirname, '/build'));
console.log('path.join:'+path.join(__dirname, './build'));
console.log('path.join:'+path.join(__dirname, '../build'));
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');