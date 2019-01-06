const Path = require("path");
const CssNano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let PathsToClean = [
    './assets/*'
];

let CleanOptions = {
    verbose:  true,
    allowExternal: true,
    exclude:  [
        './cache/*',
        './node_modules/*',
        './src/*',
        './vendor/*',
    ],
};

module.exports = {
    resolve: {
        alias: {
            Sass: Path.resolve(__dirname, 'src/assets/sass'),
            Controller: Path.resolve(__dirname, 'src/assets/js/Controller/')
        }
    },

    entry: {
        vendor: Path.join(__dirname, "./", "src/", "assets/", "js/", "Controller/", "VendorController.js"),
        index: Path.join(__dirname, "./", "src/", "assets/", "js/", "Controller/", "IndexController.js"),
    },

    output: {
        filename: "[name].js",
        path: Path.join(__dirname, "./", "assets/", "js/")
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
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader"
                }
            ]
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
            CleanOptions
        ),

        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
            }
        }),

        new MiniCssExtractPlugin({
            filename: "./../css/[name].css"
        }),

        new CopyWebpackPlugin([
            {
                to: Path.join(__dirname, "./", "assets/", "images/"),
                from: Path.join(__dirname, "./", "src/", "assets/", "images/"),
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
