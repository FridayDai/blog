const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ENTRY = path.resolve(__dirname, 'index.tsx');
const ICONFONT = path.resolve(__dirname, 'src', 'asset', 'font', 'iconfont.js');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    entry: {
        'index': ENTRY,
        'iconfont': ICONFONT
    },
    output: {
        path: DIST,
        filename: "[name]_[hash:8]_bundle.js",
        chunkFilename: "[name]_[chunkhash:8]_chunk_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                // exclude: /node_modules/,
                use: [
                    {
                        'loader': "ts-loader"
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/', DIST],
                use: [{
                    loader: 'babel-loader',
                    options: {//如果有这个设置则不用再添加.babelrc文件进行配置
                        // "babelrc": false,// 不采用.babelrc的配置
                        "plugins": [
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }]
            },
            {
                test: /\.(less|scss|css)$/,
                exclude: ['/node_modules/', DIST],
                loaders: ['style-loader', 'css-loader',
                    {
                        'loader': 'postcss-loader',
                        'options': { // 如果没有options这个选项将会报错 No PostCSS Config found
                            'plugins': loader => [
                                require('autoprefixer')() // CSS浏览器兼容
                            ]
                        }
                    },
                    {
                        'loader': 'less-loader',
                        'options': {
                            'javascriptEnabled': true
                        }
                    }
                ]
            },
            {
                exclude: ['/node_modules/', DIST],
                test: /\.(png|jpg|gif|svg|ttf|woff|eot|woff2)$/,
                use: ['url-loader?limit=10000&name=[name]_[hash:8].[ext]']
            },
            {
                exclude: ['/node_modules/', DIST],
                test: /\.(mp3)$/,
                use: ['file-loader']
            }
        ]
    },

    resolve: {
        alias: {
            '@action': path.resolve(__dirname, 'src', 'action'),
            '@component': path.resolve(__dirname, 'src', 'component'),
            '@container': path.resolve(__dirname, 'src', 'container'),
            '@asset': path.resolve(__dirname, 'src', 'asset'),
            '@reducer': path.resolve(__dirname, 'src', 'reducer'),
            '@style': path.resolve(__dirname, 'src', 'style'),
            '@util': path.resolve(__dirname, 'src', 'util'),
        },
        extensions: [ '.tsx', '.ts', '.js' ]
    },

    devtool: "source-map",
    devServer: {
        host: '0.0.0.0', // 你希望服务器外部可访问，指定
        port: 8899,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true, // 不请求路径, 适合单页应用
        hot: true,
        inline: true,
        compress: true,
        proxy: {
            // '/api/v1/op/*': {
            //     // 'target': 'http://10.91.255.79:8001',
            //     'target': 'http://10.92.4.98:8021',
            //     'pathRewrite': { '^/api/v1/op': '/api/v1' },
            //     'secure': false
            // },
            '/api/*': {
                // 'target': 'http://10.91.255.79:8001',
                'target': 'http://localhost:3002/',
                'secure': false
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'blog',
            filename: 'index.html',
            chunks: ['index', 'iconfont'],
            template: path.resolve(__dirname, 'template.html')
        }),
        new CleanWebpackPlugin()
        // new BundleAnalyzerPlugin({
        //     'analyzerHost': '127.0.0.1',
        //     'analyzerPort': '56789',
        //     'defaultSizes': 'gzip'
        // })
    ]
};
