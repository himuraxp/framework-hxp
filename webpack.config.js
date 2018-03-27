const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dev = process.env.NODE_ENV === 'dev'

let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1, minimize: !dev } }
]
if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'safari >= 7', 'ie >= 7']
                })
            ]
        }
    })
}


let config = {
    entry: {
        app: ['./assets/sass/global.scss', './assets/js/app.js']
    },
    watch: dev,
    output: {
        path: path.resolve('./dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
        libraryTarget: 'var',
        library: 'App',
    },
    resolve: {
        alias: {
            '@assets': path.resolve('./assets/'),
            '@sass': path.resolve('./assets/sass/'),
            '@js': path.resolve('./assets/js/'),
        }
    },
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: cssLoaders
            })
        },{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [...cssLoaders, 'sass-loader']
            })
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'file-loader'
        },{
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name].[hash:7].[ext]',
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: dev ? '[name].css' : '[name].[contenthash:8].css'
        })
    ]
}

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: false
    }))
    config.plugins.push(new ManifestPlugin())
    config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: path.resolve('./'),
        verbose: true,
        dry: false
    }))
}

module.exports = config