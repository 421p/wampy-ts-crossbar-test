const path = require('path');
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getRoot(args) {
    const _root = path.resolve(__dirname, '..');
    args = Array.prototype.slice.call(arguments, 0);

    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    entry: {
        'js/test': './src/index.ts'
    },
    output: {
        path: getRoot('build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [getRoot('src'), 'node_modules']
    },
    resolveLoader: {
        modules: [
            getRoot('node_modules')
        ]
    },
    module: {
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,
        exprContextRegExp: /$^/,
        exprContextCritical: false,
        wrappedContextCritical: true,
        rules: [
            {
                test: /\.js\.ts$/,
                loader: 'source-map-loader',
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!wampy)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.md$/,
                loader: 'html!markdown'
            }
        ]
    },
    plugins: [
        new ForkCheckerPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/templates/base.template.html',
            filename: 'index.html',
            chunks: ['js/test']
        })
    ],
    watchOptions: {
        poll: true,
        ignored: '/node_modules/'
    },
    node: {
        fs: "empty"
    }
};