/*
 * always define variable as const for requiring file
 * variable definition should be camelcase
 * use one space for declaration
 * always use comment which can help other developers
 */
const Path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano');

// the path(s) that should be cleaned
let PathsToClean = [
  './assets/css',
  './assets/js',
  './assets/images',
];

// the clean options to use
let CleanOptions = {
  exclude:  [
    './cache/*',
    './node_modules/*',
    './src/*',
    './vendor/*',
  ],
  verbose:  true,
};

// definition of project file compilation
module.exports = {
  // defining entry point for the files
  entry: {
    vendor: Path.join(__dirname, "./", "src/", "js/", "vendor.js"),
    index: Path.join(__dirname, "./", "src/", "js/", "index.js"),
  },

  // defining output for the files
  output: {
    path: Path.join(__dirname, "./", "assets/", "js/"),
    filename: "[name].js"
  },

  // defining rules for the compilation of different sets of file
  module:{
    // rules
    rules: [
      // testing js file
      {
        // defining rules for the js scripts
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // defining rules for the scss styling
        test: /\.scss$/,
        exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              // minimize the output css file
              // https://github.com/webpack-contrib/extract-text-webpack-plugin
              loader: 'css-loader',
          }, {
              // using sass loader for compiling the files
              // https://github.com/webpack-contrib/sass-loader
              loader: 'sass-loader',
          }]
        })
      },
      {
          // defining rules for the fonts styling
          test: /\.woff|woff2|eot|ttf|svg$/,
          use: {
            loader: 'url-loader',
          }
      },
    ],
    // rules end
  },

  // defining plugins used to generate the file output
  plugins: [
    // deleting files and folder before generating new ones
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(
      PathsToClean,
      { CleanOptions }
    ),

    // compressing js files
    // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new UglifyJsPlugin({
        uglifyOptions: {
        compress: true,
      }
    }),

    // compressed css file genrating
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: "./../css/[name].css"
    }),

    // copying images files
    // this only work when any files are present in this folder if using in scss
    // it will give an error if you dont have images folder in private directory
    // https://github.com/webpack-contrib/copy-webpack-plugin
    new CopyWebpackPlugin([
      {
        from: Path.join(__dirname, "./", "src/", "images/"),
        to: Path.join(__dirname, "./", "assets/", "images/"),
      }
    ]),

    new OptimizeCssAssetsPlugin(
    {
      cssProcessor: CssNano,
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
  ]
};
