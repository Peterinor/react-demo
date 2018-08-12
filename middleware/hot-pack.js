var webpack = require('webpack');

function serve(config) {

    const compiler = webpack(config);

    // var hk = null;
    // require('fs').watch(__dirname + '/../assets/scripts', {
    //     recursive: true
    // }, () => {
    //     if (hk) clearTimeout(hk);
    //     hk = setTimeout(() => {
    //         compiler.run((err, stats) => {
    //             if (err) console.log(err);
    //             else console.log('webpack updated...');
    //         });
    //     }, 100);
    // });
    // compiler.run((err, stats) => {
    //     if (err) console.log(err);
    //     else console.log('webpack updated...');
    // });

    compiler.watch({
        aggregateTimeout: 100,
        poll: undefined
    }, (err, stats) => {
        if (err) console.log(err);
        else console.log('webpack updated...');
    });
}


module.exports = serve;