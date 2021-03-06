var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SpritesmithPlugin = require('webpack-spritesmith')
var assetsSubDirectory = 'test'

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: path.posix.join(assetsSubDirectory, 'js/[name].[chunkhash].js'),
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'css':  ExtractTextPlugin.extract({
                        use: ['css-loader'],
                        fallback: 'vue-style-loader'
                         }),
                        'scss': ExtractTextPlugin.extract({
                            use: ['css-loader','sass-loader'],
                            fallback: 'vue-style-loader'
                        })
                    },
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: path.posix.join(assetsSubDirectory, 'img/[name].[hash:7].[ext]')
                }
            }/*,
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: ['css-loader','sass-loader'],
                    use: "vue-style-loader"
                })
            }*/
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        modules: ["node_modules", "spritesmith-generated"]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: path.posix.join(assetsSubDirectory, 'css/[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        /*new webpack.optimize.CommonsChunkPlugin({
         name: 'manifest',
         chunks: ['vendor']
         }),*/
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: assetsSubDirectory,
                ignore: ['.*']
            }
        ]),

        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/assets/imgs'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
                css: path.resolve(__dirname, 'src/spritesmith-generated/_sprite.scss')
            },
            apiOptions: {
                cssImageRef: "../spritesmith-generated/sprite.png"
            },
            retina:  '@2x'
        })
    ])
}
