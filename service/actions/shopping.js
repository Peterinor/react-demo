//

var fs = require('fs');

module.exports = {
  get: {
    '': async ctx => {

      ctx.state.title = 'flight';
      ctx.render('shopping')
    },

    'flight': async ctx => {
      console.log(ctx.query);
      ctx.type = 'application/json';
      var f = __dirname + "/../../assets/data/offer-demo/" + ctx.query.q + ".json";
      ctx.body = fs.createReadStream(f);
    }
  }
}