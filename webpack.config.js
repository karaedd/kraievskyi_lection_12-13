const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {

    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },

    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx$/],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
};
