const Path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano');

let PathsToClean = [
    './assets/css',
    './assets/js',
    './assets/images',
];

let CleanOptions = {
    exclude:  [
        './cache/*',
        './node_modules/*',
        './src/*',
        './vendor/*',
    ],
    verbose:  true,
};

module.exports = {
    resolve: {
        alias: {
            Controller: Path.resolve(__dirname, 'src/assets/js/Controller/'),
            Sass: Path.resolve(__dirname, 'src/assets/sass')
        }
    },

    entry: {
        vendor: Path.join(__dirname, "./", "src/", "assets/", "js/", "Controller/", "VendorController.js"),
        index: Path.join(__dirname, "./", "src/", "assets/", "js/", "Controller/", "IndexController.js"),
    },

    output: {
        path: Path.join(__dirname, "./", "assets/", "js/"),
        filename: "[name].js"
    },

    module:{
        rules: [{

            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{


                loader: 'css-loader',
                }, {


                loader: 'sass-loader',
                }]
            })
        }, {

            test: /\.woff|woff2|eot|ttf|svg$/,
            use: {
                loader: 'url-loader',
            }
        }],
    },

    plugins: [
        new CleanWebpackPlugin(
            PathsToClean,
            { CleanOptions }
        ),

        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
            }
        }),

        new ExtractTextPlugin({
            filename: "./../css/[name].css"
        }),

        new CopyWebpackPlugin([
            {
                from: Path.join(__dirname, "./", "src/", "assets/", "images/"),
                to: Path.join(__dirname, "./", "assets/", "images/"),
            }
        ]),

        new OptimizeCssAssetsPlugin({
            cssProcessor: CssNano,
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ]
};
