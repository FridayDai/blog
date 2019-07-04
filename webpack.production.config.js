const path = require('path');
const ENTRY = path.resolve(__dirname, 'index.js');
const DIST = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = [
    new htmlwebpackplugin(
        {
            'title': 'blog',
            'template': 'template.html',
            'chunks': ['index'],
            'filename': 'index.html',
            // 'vendor': DLL,
            'minify': {
                'removeComments': true,
                'collapseWhitespace': true
            }
        }
    ),
    new MiniCssExtractPlugin({
        'filename': 'css/[name]_[hash:8].css',
        'allChunks': true
    }),
    new CleanWebpackPlugin()
];

module.exports = {
    mode: 'production',
    entry: {
        'index': ENTRY
    },
    output: {
        path: DIST,
        publicPath: '/',
        chunkFilename: 'bundle-[name]-[chunkhash:8].js',
        filename: 'bundle_[name]_[hash:8].js' // 结束最终JS文件
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 3,
                    minSize: 0
                }
            }
        }
    },
    'module': {
        'rules': [
            {
                'test': /\.ts(x?)$/,
                'exclude': /node_modules/,
                'use': [
                    {
                        'loader': "ts-loader"
                    }
                ]
            },
            {
                'test': /\.jsx?$/,
                'exclude': /node_modules/,
                'use': [
                    {
                        'loader': 'babel-loader'
                    }
                ]
            },
            {
                'test': /\.(less|scss|css)$/,
                'use': [
                    MiniCssExtractPlugin.loader,
                    'css-loader?minimize',
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
                'test': /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
                'use': ['url-loader?limit=100000&name=assets/[name]_[hash:8].[ext]']
            }
        ]
    },
    'plugins': plugins
};
