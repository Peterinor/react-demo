const path = require('path');

module.exports = {
    entry: {
        shopping: './assets/scripts/index.jsx',
        flight: './assets/scripts/flight.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'assets/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ }
        ]
    }``
};