var webpack = require('webpack');

function serve(config) {

    const compiler = webpack(config);

    compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        if (err) console.log(err);
        else console.log('webpack updated...');
    });
}


module.exports = serve;