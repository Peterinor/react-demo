const path = require('path');

module.exports = {
    entry: {
        shopping: './assets/scripts/shopping.jsx',
        flight: './assets/scripts/flight.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'assets/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.jsx$/, use: ['babel-loader'], exclude: /node_modules/ },
            // { test: /\.less$/, loader: 'style!css!less' }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    // addition - add source-map support
    devtool: "source-map"
};