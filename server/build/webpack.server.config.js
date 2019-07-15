const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ENTRY = path.resolve(__dirname, '../app.js');
const DIST = path.resolve(__dirname, '../../serverDist');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: {
        'index': ENTRY,
    },
    output: {
        path: DIST,
        filename: "server.js"
        // chunkFilename: "[name]_[chunkhash:8]_chunk_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/', DIST],
                loaders: ['babel-loader']
            },
            {
                exclude: ['/node_modules/', DIST],
                test: /\.(png|jpg|gif|svg|ttf|woff|eot|woff2)$/,
                use: ['url-loader?limit=10000&name=[name]_[hash:8].[ext]']
            }
        ]
    },
    devtool: "source-map",

    plugins: [
        new CleanWebpackPlugin()
    ],
    externals: ['pg-hstore']
};
