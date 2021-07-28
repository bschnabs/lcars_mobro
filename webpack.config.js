var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
   devtool: "source-map",
   watch: true,

   devServer: {
      contentBase: './dist',
      port: 9000
   },

   entry: {
      sdk: path.resolve("src", "sdk.js"),
      app: path.resolve("app", "app.js")
   },

   output: {
      path: path.resolve(__dirname, "dist")
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: "./app/app.html",
         filename: "index.html"
      }),
   ],

   resolve: {
      modules: [
         path.resolve(__dirname, "src"),
         path.resolve(__dirname, "node_modules")
      ]
   },

   module: {
      rules: [{
         test: /\.js$/,
         exclude: /(node_modules)/,
         use: {
            loader: "babel-loader",
            options: {
               plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
               presets: ["@babel/preset-env"]
            }
         }
      }, {
         test: /\.css$/,
         use: [
            'style-loader',
            'css-loader'
         ]
      },{
         test: /\.(woff|woff2|otf|eot)$/,
         use: 'file?name=fonts/[name].[ext]!static'
     }],
   }
};